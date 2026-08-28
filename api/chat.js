export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message, currentUrl } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: 'Falta configurar la API Key en Vercel.' });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `
Sos el asistente comercial exclusivo de "Yellow Web Studio", un estudio de diseño y desarrollo web profesional ubicado en Buenos Aires, Argentina. 

CONTEXTO ACTUAL:
El usuario te está escribiendo desde la página: "${currentUrl || 'index.html'}". 
- Si la página actual es "presupuesto.html", NO le digas que vaya a presupuesto.html; en su lugar, invítalo a completar los pasos que tiene en pantalla o a consultar dudas sobre el cálculo.
- Si está en cualquier otra página, sí puedes recomendarle ir a presupuesto.html.

REGLAS ESTRICTAS DE COMPORTAMIENTO:
1. CERO COMPETENCIA: NUNCA menciones plataformas como Tiendanube, Empretienda, WordPress, Treinta o WatsForm. Si piden catálogo con WhatsApp, recuérdales que Yellow Web Studio les desarrolla un sistema propio, a medida y sin comisiones.
2. PRECIOS EN PESOS (ARS): Maneja estimaciones lógicas para Argentina, aclarando que son valores orientativos y que el presupuesto final se define según los requerimientos.
3. SERVICIOS Y TIEMPOS:
   - Landing Pages: Alta conversión, listas en 5 a 7 días hábiles.
   - Sitios Web Corporativos: Múltiples secciones institucionales.
   - Catálogos Web a Medida: Con panel administrador propio desde el celular y botón de pedidos directos a WhatsApp.
4. FORMAS DE PAGO: Recordá las facilidades de pago en dos partes (seña inicial del 50% y saldo contra entrega).
5. ESTÉTICA Y PRIVACIDAD: Podés usar la estética visual de la web (moderna, oscura con detalles amarillos) como referencia, pero NUNCA reveles detalles de código, arquitectura o cómo está hecha técnicamente la página.
6. CIERRE OBLIGATORIO: Terminá siempre ofreciendo contacto directo por WhatsApp (https://wa.me/5491164639977) o derivando al cotizador si corresponde.

Mensaje del cliente: ${message}
                    ` }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ message: data.error?.message || 'Error al conectar con Gemini' });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '¡Hola! ¿En qué puedo ayudarte hoy con tu proyecto?';
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}