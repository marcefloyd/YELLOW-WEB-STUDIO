export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: 'ERROR: Falta configurar la API Key en Vercel.' });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(200).json({ reply: `ERROR DE GOOGLE: ${data.error?.message || 'Error desconocido'}` });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '¡Hola! ¿En qué te puedo ayudar con tu proyecto en Yellow Web Studio?';
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(200).json({ reply: `ERROR INTERNO: ${error.message}` });
    }
}