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
Contexto: El usuario está en "${currentUrl || 'index.html'}".
- Correo oficial: yellowwebstudio3@gmail.com.
- WhatsApp oficial: https://wa.me/5491164639977.
- Si quieren cotizar, indicarles: "Podés hacer clic en el botón 'Armá tu presupuesto' en la página de inicio o ingresar a 'Cotizador Online' desde el menú de navegación superior."
- Sé muy conciso (máximo 2 oraciones).
`;

        // Usamos el endpoint oficial estable v1 con gemini-1.5-flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\nCliente: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("Error de la API de Gemini:", JSON.stringify(data));
            return res.status(200).json({ reply: '¡Hola! Podés contactarnos por WhatsApp al 5491164639977 o a yellowwebstudio3@gmail.com.' });
        }

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(200).json({ reply: '¡Hola! ¿En qué podemos ayudarte con tu proyecto? Escribinos a yellowwebstudio3@gmail.com.' });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Error crítico en el servidor:", error.message);
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}