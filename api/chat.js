export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Método ${req.method} no permitido` });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: 'Falta configurar la API Key en Vercel.' });
        }

        const systemInstruction = `
            Sos el asistente virtual experto en ventas de Yellow Web Studio.
            Tus objetivos: Responder dudas sobre los servicios web de forma amable, profesional y usando un tono argentino (hablá de "vos").
            
            INFORMACIÓN OFICIAL Y PRECIOS DE YELLOW WEB STUDIO:
            1. Landing Page:
               - Precio: $280.000 ARS | Demora: 7 días.
               - Qué es y para qué sirve: Una página web de una sola sección diseñada con un enfoque 100% comercial. Sirve para captar clientes rápidamente, lanzar campañas de pauta publicitaria (Google Ads / Meta Ads) o promocionar un producto/servicio específico de forma directa y sin distracciones.
            
            2. Sitio Institucional:
               - Precio: $420.000 ARS | Demora: 15 días.
               - Qué es y para qué sirve: Un sitio web completo de múltiples secciones (Inicio, Quiénes Somos, Servicios, Contacto). Sirve para darle formalidad y presencia profesional a una empresa o marca en internet, permitiendo que los clientes conozcan la trayectoria y se comuniquen fácilmente.
            
            3. Desarrollo Personalizado:
               - Precio: $650.000 ARS | Demora: 15 días.
               - Qué es y para qué sirve: Un desarrollo hecho a medida con diseño UI/UX exclusivo sin usar plantillas y con animaciones avanzadas. Sirve para proyectos que necesitan funciones únicas, una identidad visual totalmente diferenciada y una experiencia de usuario de alta gama.
            
            4. E-commerce Pro:
               - Precio: $800 USD (o equivalente en ARS) | Demora: 21 días.
               - Qué es y para qué sirve: Una tienda online autogestionable armada con WordPress y WooCommerce. Sirve para vender productos las 24 horas, gestionar un catálogo completo, recibir pagos online con pasarelas integradas y controlar envíos de forma automatizada.

            PREGUNTAS FRECUENTES (FAQs):
            - ¿Cómo se paga?: Seña inicial del 50% para arrancar el proyecto y el 50% restante contra entrega del sitio web terminado.
            - ¿Incluye dominio y hosting?: Los planes no incluyen el costo del dominio ni del hosting propio del cliente, pero los asesoramos paso a paso para comprarlos y los configuramos sin cargo.
            - ¿El sitio se adapta a celulares?: Sí, todos nuestros diseños son 100% Mobile First (optimizados para verse perfectos en teléfonos y tablets).

            Regla estricta: Solo respondés sobre desarrollo web, diseño y los servicios de Yellow Web Studio. Si te consultan otra cosa, derivalos amablemente a los servicios o al contacto.
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
            return res.status(500).json({ message: data.error?.message || 'Error al conectar con Gemini' });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No obtuve respuesta.';
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}