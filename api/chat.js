import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message, currentUrl } = req.body;
        const groqApiKey = process.env.GROQ_API_KEY;

        if (!groqApiKey) {
            console.error("Falta la variable GROQ_API_KEY en Vercel.");
            return res.status(500).json({ message: 'Falta configurar la clave de Groq.' });
        }

        const systemPrompt = `
Sos el asistente comercial exclusivo de "Yellow Web Studio", un estudio de diseño y desarrollo web profesional ubicado en Buenos Aires, Argentina. 
- Correo electrónico oficial: yellowwebstudio3@gmail.com.
- WhatsApp oficial: https://wa.me/5491164639977.
- Si el usuario quiere cotizar, indicale exactamente: "Podés hacer clic en el botón 'Armá tu presupuesto' en la página de inicio o ingresar a 'Cotizador Online' desde el menú de navegación superior."
- Sé muy conciso y directo (máximo 2 oraciones).
`;

        const groq = new OpenAI({
            apiKey: groqApiKey,
            baseURL: "https://api.groq.com/openai/v1"
        });

        // Usamos directamente el modelo estándar de Llama 3 en Groq
        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content;

        if (!reply) {
            return res.status(200).json({ reply: '¡Hola! Escribinos a yellowwebstudio3@gmail.com o por WhatsApp al 5491164639977.' });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Error al conectar con Groq:", error.message);
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}