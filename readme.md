# Typing Speed Test

This is a simple typing speed test application built using HTML, CSS, and JavaScript. The application provides a random paragraph for the user to type, and tracks the time, mistakes, characters per minute (CPM), and words per minute (WPM). 

## Table of Contents

- [Usage](#usage)
- [Code Explanation](#code-explanation)
  - [HTML](#html)
  - [CSS](#css)
  - [JavaScript](#javascript)
- [Future Improvements](#future-improvements)

## Usage

1. Clone or download the repository.
2. Open `index.html` in your browser to start the typing speed test.
3. Click on the paragraph to focus on the hidden input field or press `Enter`.
4. Start typing the displayed paragraph.
5. The timer starts automatically when you begin typing.
6. The application will calculate and display your typing statistics, including mistakes, CPM, and WPM.




const summary = document.querySelector(".summary-screen");

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
