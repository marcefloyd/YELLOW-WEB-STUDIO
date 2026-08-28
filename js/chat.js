document.addEventListener('DOMContentLoaded', () => {
    // 1. Abrir y cerrar ventana
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');

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

    // 2. Enviar y recibir mensajes sin recargar la página
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const chatMessages = document.getElementById('chatbot-messages');

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Esto es vital: evita que la página se recargue y se cierre el chat
            
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

            // Mostrar "Escribiendo..."
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
    // Usar ruta relativa limpia para Vercel
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
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
        <div class="mb-3 text-danger small">Error: No se pudo conectar con YellowBot.</div>
    `;
}