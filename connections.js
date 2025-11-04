let categories = {
  animals: ["fox", "deer", "bear", "squirrel"],
  trees: ["oak", "pine", "cherry", "maple"],
  colors: ["purple", "red", "blue", "green"],
  beatles: ["John", "Paul", "George", "Ringo"],
};

const checkboxList = document.querySelector("#checkbox-list");
const gameForm = document.querySelector("#game-form");
const counter = document.querySelector("#counter");
const messageBox = document.querySelector("#message");
const foundCategories = document.querySelector("#found-categories");
const submitButton = document.querySelector("#submit-btn");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getAllWords() {
  let words = [];
  for (let cat in categories) {
    for (let w of categories[cat]) {
      words.push({ word: w, category: cat });
    }
  }
  return shuffle(words);
}

function createCheckboxes() {
  checkboxList.style.display = "grid";
  checkboxList.style.gridTemplateColumns = "repeat(4, 1fr)";
  checkboxList.style.gap = "10px";
  checkboxList.style.maxWidth = "600px";
  checkboxList.style.margin = "20px auto";

  const allWords = getAllWords();

  allWords.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "word-" + index;
    checkbox.dataset.category = item.category;
    checkbox.value = item.word;
    checkbox.style.position = "absolute";
    checkbox.style.opacity = "0";

    const label = document.createElement("label");
    label.htmlFor = "word-" + index;
    label.textContent = item.word;
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.justifyContent = "center";
    label.style.height = "70px";
    label.style.border = "1px solid #ccc";
    label.style.borderRadius = "10px";
    label.style.cursor = "pointer";
    label.style.fontWeight = "600";
    label.style.transition = "background 0.2s";

    checkbox.addEventListener("change", () => {
      label.style.background = checkbox.checked ? "#dbeafe" : "#fff";
      updateSelection();
    });

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    checkboxList.appendChild(wrapper);
  });
}

function updateSelection() {
  const allBoxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedBoxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const count = checkedBoxes.length;

  counter.textContent = `Selected: ${count}/4`;

  if (count === 4) {
    allBoxes.forEach((box) => {
      if (!box.checked) box.disabled = true;
    });
    submitButton.disabled = false;
  } else {
    allBoxes.forEach((box) => (box.disabled = false));
    submitButton.disabled = true;
  }
}

function checkAnswer() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checked.length !== 4) return false;
  const firstCat = checked[0].dataset.category;
  return Array.from(checked).every((box) => box.dataset.category === firstCat);
}

function showMessage(text, color) {
  messageBox.textContent = text;
  messageBox.style.padding = "10px";
  messageBox.style.marginTop = "10px";
  messageBox.style.textAlign = "center";
  messageBox.style.fontWeight = "600";
  messageBox.style.borderRadius = "8px";
  messageBox.style.background = color;
}

function handleSubmit(e) {
  e.preventDefault();
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');

  if (checkAnswer()) {
    showMessage("You found a category.", "#e7f9e7");

    const category = checked[0].dataset.category;
    checked.forEach((box) => box.parentElement.remove());

    const badge = document.createElement("div");
    badge.textContent = category.toUpperCase();
    badge.style.background = "#d9f99d";
    badge.style.padding = "10px";
    badge.style.borderRadius = "8px";
    badge.style.marginTop = "10px";
    badge.style.fontWeight = "700";
    foundCategories.appendChild(badge);

    submitButton.disabled = true;
    counter.textContent = "Selected: 0/4";

    const remaining = document.querySelectorAll('input[type="checkbox"]');
    remaining.forEach((box) => (box.disabled = false));

    if (remaining.length === 0) {
      showMessage("You found all categories.", "#fff4d6");
    }
  } else {
    showMessage("Incorrect. Try again.", "#fde8e8");
  }
}

function init() {
  createCheckboxes();
  submitButton.disabled = true;
  gameForm.addEventListener("submit", handleSubmit);
}

document.addEventListener("DOMContentLoaded", init);
