export default async function handler(req, res) {
    // Solo permitimos enviar mensajes (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // Vercel inyecta la clave acá de forma oculta

    if (!apiKey) {
        return res.status(500).json({ message: 'Falta la API Key en la configuración del servidor.' });
    }

    // ACÁ ESTÁ EL CEREBRO: Instrucciones estrictas para tu bot
    const systemInstruction = `
        Sos el asistente virtual experto en ventas de Yellow Web Studio.
        Tus objetivos: Responder dudas sobre los servicios web de forma amable, profesional y usando un tono argentino (hablá de "vos").
        Tus precios base son:
        - Landing Page: $280.000 ARS
        - Sitio Institucional: $420.000 ARS
        - Desarrollo Personalizado: $650.000 ARS
        - E-commerce Pro (WordPress + WooCommerce): $800 USD (o su equivalente en ARS).
        Regla estricta: Solo respondés sobre desarrollo web, diseño, programación y Yellow Web Studio. Si te preguntan algo fuera de tema, decí amablemente que solo podés ayudar con temas del estudio y guialos al cotizador o a WhatsApp.
    `;

    try {
        // Nos conectamos a la API de Gemini 1.5 Flash (súper rápida y gratuita)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: { text: systemInstruction }
                },
                contents: [{
                    role: "user",
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Error en la API de Gemini');
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al procesar tu mensaje. Por favor, contactanos por WhatsApp.' });
    }
}