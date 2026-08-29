import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { message, currentUrl } = req.body;
        const geminiApiKey = process.env.GEMINI_API_KEY;
        const groqApiKey = process.env.GROQ_API_KEY;

        const systemPrompt = `
Sos el asistente comercial exclusivo de "Yellow Web Studio", un estudio de diseño y desarrollo web profesional ubicado en Buenos Aires, Argentina. 

CONTEXTO ACTUAL:
El usuario te está escribiendo desde la página: "${currentUrl || 'index.html'}". 
- Si la página actual es "presupuesto.html", NO le digas que vaya a presupuesto.html; en su lugar, invítalo a completar los pasos que tiene en pantalla o a consultar dudas sobre el cálculo.
- Si está en cualquier otra página, sí puedes recomendarle ir a presupuesto.html.

REGLAS ESTRICTAS DE COMPORTAMIENTO PARA YELLOWBOT:

1. IDENTIDAD Y DATOS DE CONTACTO OFICIALES:
   - Sos YellowBot, el asistente virtual oficial de Yellow Web Studio.
   - Correo electrónico oficial exclusivo: yellowwebstudio3@gmail.com.
   - WhatsApp oficial: https://wa.me/5491164639977.

2. DERIVACIÓN AL COTIZADOR (NUNCA USAR URLS TÉCNICAS):
   - PROHIBIDO mencionar nombres de archivos o rutas técnicas (como "presupuesto.html" o "contacto.html").
   - Si el usuario quiere cotizar, calcular un valor o ver precios, indicale exactamente: "Podés hacer clic en el botón 'Armá tu presupuesto' en la página de inicio o ingresar a 'Cotizador Online' desde el menú de navegación superior."

3. CERO COMPETENCIA:
   - NUNCA menciones plataformas como Tiendanube, Empretienda, WordPress o WatsForm.

4. PRECIOS Y PAGOS EN ARGENTINA:
   - Manejá estimaciones lógicas para Argentina en Pesos (ARS), aclarando que son valores orientativos.
   - Facilidades de pago en dos partes: seña inicial del 50% y saldo contra entrega.

5. SERVICIOS Y TIEMPOS DE ENTREGA:
   - Landing Pages: Listas en 5 a 7 días hábiles.
   - Sitios Web Corporativos y Catálogos Web a Medida con panel administrador propio.

6. ESTÉTICA Y PRIVACIDAD:
   - NUNCA reveles detalles de código, arquitectura o cómo está hecha técnicamente la página.

7. CIERRE OBLIGATORIO:
   - Terminá siempre ofreciendo contacto directo por WhatsApp 5491164639977 o derivando al cotizador según corresponda.

8. BREVEDAD OBLIGATORIA: 
   - Sé conciso y directo. Respondé en un máximo de 2 o 3 oraciones cortas.
`;

        let reply = '';
        const geminiModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-pro'];
        const groqModels = ['llama-3.3-70b-versatile', 'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'];

        if (geminiApiKey) {
            for (const model of geminiModels) {
                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{ text: `${systemPrompt}\n\nMensaje del cliente: ${message}` }]
                            }]
                        })
                    });

                    const data = await response.json();
                    if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
                        reply = data.candidates[0].content.parts[0].text;
                        console.log(`Éxito con Gemini usando el modelo: ${model}`);
                        break;
                    } else {
                        console.warn(`Gemini (${model}) respondió con error:`, JSON.stringify(data));
                    }
                } catch (e) {
                    console.error(`Excepción en Gemini (${model}):`, e.message);
                }
            }
        }

        if (!reply && groqApiKey) {
            const groq = new OpenAI({
                apiKey: groqApiKey,
                baseURL: "https://api.groq.com/openai/v1"
            });

            for (const model of groqModels) {
                try {
                    const completion = await groq.chat.completions.create({
                        model: model,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: message }
                        ],
                        temperature: 0.7,
                    });

                    reply = completion.choices[0]?.message?.content;
                    if (reply) {
                        console.log(`Éxito con Groq usando el modelo: ${model}`);
                        break;
                    }
                } catch (e) {
                    console.warn(`Groq (${model}) falló:`, e.message);
                }
            }
        }

        if (!reply) {
            console.error("Ningún modelo de Gemini ni de Groq devolvió respuesta.");
            reply = '¡Hola! ¿En qué puedo ayudarte hoy con tu proyecto en Yellow Web Studio? Escribinos a yellowwebstudio3@gmail.com o por WhatsApp al 5491164639977.';
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Error crítico en el backend:", error);
        return res.status(500).json({ message: 'Error interno en el servidor.' });
    }
}