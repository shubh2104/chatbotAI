document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');
  
    sendButton.addEventListener('click', () => {
      const userInput = chatInput.value;
      if (userInput.trim() !== '') {
        addMessageToChat('User', userInput);
        sendMessageToServer(userInput);
        chatInput.value = '';
      }
    });
  
    chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });
  
    function addMessageToChat(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatOutput.appendChild(messageElement);
      chatOutput.scrollTop = chatOutput.scrollHeight;
    }
  
    async function sendMessageToServer(message) {
      try {
        const response = await fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: message })
        });
  
        const data = await response.json();
        if (data.text) {
          addMessageToChat('Bot', data.text);
        }
      } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Bot', 'Sorry, something went wrong.');
      }
    }
  });
  