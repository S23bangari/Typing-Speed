const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btnTry = document.querySelector(".try");
const summary = document.querySelector(".summary-screen");

// Set values
let timer;
const maxTime = 30;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraphs = [
    "she asked. He looked down at the ground knowing that she wouldn't like his answer. He hesitated, knowing that the truth would only hurt.",
    "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind.",
    "There were a variety of ways to win the game. James had played it long enough to know most of them and he could see what his opponent was trying to do. There was a simple counterattack that James could use and the game should be his.",
    "The trail to the left had a Danger! Do Not Pass sign telling people to take the trail to the right. This wasn't the way Zeke approached his hiking. Rather than a warning, Zeke read the sign as an invitation to explore an area that would be adventurous and exciting.",
    "Another option you have is choosing the number of syllables in the words you speak. You probably have never considered this option before, but you have it every time you open your mouth and speak. You make so many choices like this that you never even think about, but you have the choice with each one.",
    "She asked the question even though she didn't really want to hear the answer. It was a no-win situation since she already knew. If he told the truth, she'd get confirmation of her worst fears. If he lied, she'd know that he wasn't who she thought he was which would be almost as bad.",
    "The sun set over the horizon, painting the sky in hues of orange and pink. Birds chirped their final songs of the day as the city lights began to twinkle. It was a perfect moment of tranquility, a brief respite from the hustle and bustle of daily life.",
    "Jenny stood at the edge of the cliff, the wind whipping through her hair. Below, the waves crashed against the rocks with a thunderous roar. She took a deep breath, feeling the salty air fill her lungs, and closed her eyes, savoring the moment.",
    "In the heart of the bustling city, there was a small café that served the best coffee in town. It was a hidden gem, known only to the locals. The aroma of freshly brewed coffee filled the air, drawing in customers from far and wide.",
    "The library was a haven of peace and quiet. Rows upon rows of books lined the walls, each one a portal to another world. Sarah wandered through the aisles, her fingers trailing along the spines of the books, searching for her next adventure.",
    "The storm raged on through the night, lightning illuminating the sky in brilliant flashes. Thunder followed each flash, rumbling through the heavens with a power that shook the earth. Inside, by the warmth of the fire, they listened in awe to the symphony of nature."
  ];

  const randomNum = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = ""; // Clear previous text

  for (const char of paragraphs[randomNum]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      input.focus();
    }
  });
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

// Handle user input
function initTyping(event) {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);

  if (event.inputType === 'deleteContentBackward') {
    if (charIndex > 0) {
      charIndex--;
      if (char[charIndex].classList.contains("incorrect")) {
        mistake--;
      }
      char[charIndex].classList.remove("correct", "incorrect");
    }
  } else if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(iniTimer, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      char[charIndex].classList.add("incorrect");
      mistake++;
    }

    charIndex++;
  }

  char.forEach(span => span.classList.remove("active"));
  if (charIndex < char.length) {
    char[charIndex].classList.add("active");
  }

  mistakes.innerText = mistake;
  cpm.innerText = charIndex - mistake;

  if (charIndex === char.length || timeLeft === 0) {
    clearInterval(timer);
    input.value = "";
    displayContent();
  }
}

function iniTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    const wpmVal = Math.round((charIndex - mistake) / 5 / ((maxTime - timeLeft) / 60));
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
    displayContent();
  }
}

function reset() {
  clearInterval(timer);
  loadParagraph();
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
  typingText.style.display = 'block';
  summary.style.display = 'none';
}

function displayContent() {
  const wpmVal = Math.round((charIndex - mistake) / 5 / ((maxTime - timeLeft) / 60));
  wpm.innerText = wpmVal;

  summary.style.display = 'block';
  typingText.style.display = 'none';
}

btnTry.addEventListener("click", reset);
input.addEventListener("input", initTyping);
loadParagraph();
