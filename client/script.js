import bot from './assets/bot.svg';
import send from './assets/send.svg';
import user from './assets/user.svg';

// 1. step getting elements from html
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

// 2. creating an interval variable
let loadInterval;

// 3. creating a loading function
function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

// 3. creating a typing function
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// 3. creating a generating id function
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// creating chatStipe for AI and user asking question icon and color and message
function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class='profile'>
            <img 
            src='${isAi ? bot : user}' 
            alt='${isAi ? 'bot' : 'user'}'
            />
          </div>
          <div class='message' id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
}

// creating submit function to trigger ai to generate message/response from users questions
const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) [handleSubmit(e)];
});
