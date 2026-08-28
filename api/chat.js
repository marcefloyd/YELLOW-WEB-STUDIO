export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: 'DEBUG: Falta la variable GEMINI_API_KEY en Vercel.' });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `Sos el asistente de Yellow Web Studio. Respondé corto: ${message}` }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(200).json({ reply: `DEBUG Google Error: ${data.error?.message || JSON.stringify(data)}` });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de Gemini';
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(200).json({ reply: `DEBUG Catch Error: ${error.message}` });
    }
}