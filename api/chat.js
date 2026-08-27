export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ message: 'Falta la API Key en la configuración del servidor.' });
    }

    const systemInstruction = `
        Sos el asistente virtual experto en ventas de Yellow Web Studio.
        Tus objetivos: Responder dudas sobre los servicios web de forma amable, profesional y usando un tono argentino (hablá de "vos").
        Tus precios y tiempos base son:
        - Landing Page: $280.000 ARS (Demora: 7 días)
        - Sitio Institucional: $420.000 ARS (Demora: 15 días)
        - Desarrollo Personalizado: $650.000 ARS (Demora: 15 días)
        - E-commerce Pro (WordPress + WooCommerce): $800 USD o equivalente (Demora: 21 días).
        Regla estricta: Solo respondés sobre desarrollo web y Yellow Web Studio.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // Estructura corregida para que Google la acepte sin error 500
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: [{
                    role: "user",
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Error de Google:', data);
            throw new Error(data.error?.message || 'Error en la API de Gemini');
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });

    } catch (error) {
        console.error('Error en serverless:', error);
        res.status(500).json({ message: 'Hubo un error al procesar tu mensaje.' });
    }
}