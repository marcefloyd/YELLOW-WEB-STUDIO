export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: 'Error: Falta la API Key en Vercel.' });
        }

        // Probamos con el modelo estándar actual de la API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
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
            return res.status(200).json({ reply: `Google API Error: ${data.error?.message || 'Desconocido'}` });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta del modelo.';
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(200).json({ reply: `Error interno: ${error.message}` });
    }
}