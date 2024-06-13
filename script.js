const socket = io();

function drawCards() {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = ''; // Clear previous cards
  const cards = ['Card1', 'Card2', 'Card3']; // Example card names
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card;
    cardsContainer.appendChild(cardElement);
  });
  askQuestion(); // Trigger the tarot reading based on the drawn cards
}

function askQuestion() {
  const question = document.getElementById('question').value;
  const cards = Array.from(document.querySelectorAll('.card')).map(card => card.textContent);
  socket.emit('tarotReading', { question, cards });
}

socket.on('tarotReading', (response) => {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p>${response}</p>`;
});
