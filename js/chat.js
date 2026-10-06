document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const chatMessages = document.getElementById('chatbot-messages');

    // 1. Abrir y cerrar ventana del chat
    if (chatToggle && chatWindow && chatClose) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.remove('d-none');
            chatToggle.classList.add('d-none');
        });
        
        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('d-none');
            chatToggle.classList.remove('d-none');
        });
    }

    // 2. Enviar y recibir mensajes del Chatbot
    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            // Mostrar mensaje del usuario
            chatMessages.innerHTML += `
                <div class="mb-3 text-end">
                    <div class="bg-warning text-dark p-2 rounded-3 border border-warning d-inline-block shadow-sm text-start" style="max-width: 85%;">
                        ${userMessage}
                    </div>
                </div>
            `;
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Mostrar indicador "Escribiendo..."
            const typingId = 'typing-' + Date.now();
            chatMessages.innerHTML += `
                <div id="${typingId}" class="mb-3">
                    <div class="bg-black text-secondary p-2 rounded-3 border border-secondary d-inline-block shadow-sm">
                        <em>Escribiendo...</em>
                    </div>
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;

            try {
                // Obtener nombre de la página de forma segura
                let pageName = window.location.pathname.split('/').pop();
                if (!pageName || pageName === '') {
                    pageName = 'index.html';
                }

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        message: userMessage, 
                        currentUrl: pageName 
                    })
                });

                // Controlar si la respuesta del servidor es JSON válido
                const contentType = response.headers.get("content-type");
                let data = {};
                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else {
                    throw new Error('La respuesta del servidor no es JSON válido.');
                }

                document.getElementById(typingId)?.remove();

                if (response.ok && data.reply) {
                    chatMessages.innerHTML += `
                        <div class="mb-3">
                            <div class="bg-black text-white p-2 rounded-3 border border-secondary d-inline-block shadow-sm" style="max-width: 90%;">
                                ${data.reply}
                            </div>
                        </div>
                    `;
                } else {
                    throw new Error(data.message || 'Error en la respuesta del servidor');
                }
            } catch (error) {
                document.getElementById(typingId)?.remove();
                chatMessages.innerHTML += `
                    <div class="mb-3 text-danger small">Error: No se pudo conectar con YellowBot (${error.message}).</div>
                `;
            }
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

    // 3. Funcionalidad del botón de Ciberseguridad (exclusivo del index)
    const btnCiber = document.getElementById('btn-ciber');
    if (btnCiber) {
        btnCiber.addEventListener('click', () => {
            btnCiber.classList.remove('btn-outline-warning', 'text-white');
            btnCiber.classList.add('btn-success', 'text-white');
            btnCiber.textContent = '🚀 ¡Próximamente!';

            setTimeout(() => {
                btnCiber.classList.remove('btn-success');
                btnCiber.classList.add('btn-outline-warning', 'text-white');
                btnCiber.textContent = '🛡️ Ciberseguridad';
            }, 3500);
        });
    }
});