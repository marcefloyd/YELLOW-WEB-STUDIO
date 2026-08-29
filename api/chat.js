export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message, currentUrl } = req.body;
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return res.status(500).json({ message: 'Falta configurar la clave de Gemini en Vercel.' });
        }

        const systemPrompt = `
Sos el asistente comercial exclusivo de "Yellow Web Studio", un estudio de diseño y desarrollo web profesional ubicado en Buenos Aires, Argentina. 
- Correo electrónico oficial: yellowwebstudio3@gmail.com.
- WhatsApp oficial: https://wa.me/5491164639977.
- Si el usuario quiere cotizar, indicale exactamente: "Podés hacer clic en el botón 'Armá tu presupuesto' en la página de inicio o ingresar a 'Cotizador Online' desde el menú de navegación superior."
- Sé muy conciso y directo (máximo 2 oraciones).
`;

        // Lista completa de modelos de Gemini para iterar y evitar errores por cambios de versión
        const geminiModels = [
            'gemini-2.5-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-pro'
        ];

        let reply = '';

        for (const model of geminiModels) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `${systemPrompt}\n\nCliente: ${message}` }]
                        }]
                    })
                });

                const data = await response.json();
                
                if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    reply = data.candidates[0].content.parts[0].text;
                    break; // Si uno responde con éxito, salimos del ciclo
                } else {
                    console.warn(`Gemini (${model}) no devolvió contenido válido:`, JSON.stringify(data));
                }
            } catch (e) {
                console.warn(`Error al intentar con el modelo Gemini (${model}):`, e.message);
            }
        }

        if (!reply) {
            reply = '¡Hola! Escribinos a yellowwebstudio3@gmail.com o por WhatsApp al 5491164639977.';
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Error crítico en el backend:", error.message);
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}