let categories = {
    animals: ['platypus', 'tiger', 'leopard', 'capybara'],
    workouts: ['curl', 'squat', 'bench', 'pulldown'],
    countries: ['Spain', 'Monaco', 'Mexico', 'Japan'],
    classes: ['Philosophy', 'Circuits', 'Chemistry', 'Drawing']
};

let checkboxList = document.querySelector("#checkbox-list");
let submitButton = document.querySelector("button");
let gameForm = document.querySelector("#game-form");
let counter = document.querySelector("#counter");

// Function to create array of ordered words
function getAllWords() {
    let allWords = [];
    for (let category in categories) {
        categories[category].forEach(word => {
            allWords.push({
                word: word,
                category: category
            });
        });
    }
    return allWords;
}

// Function to generate checkboxes in order
function generateCheckboxes() {
    let allWords = getAllWords();
    
    allWords.forEach((item, index) => {
        // Create wrapper div
        let wrapper = document.createElement('div');
        
        // Create checkbox input
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
    checkbox.id = 'word-' + index;
        checkbox.name = 'word';
        checkbox.value = item.word;
        checkbox.dataset.category = item.category;
        
        // Create label element
        let label = document.createElement('label');
    label.htmlFor = 'word-' + index;
        label.textContent = item.word;
        
        // Append each checkbox into a wrapper
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        
        // Append wrapper to list
        checkboxList.appendChild(wrapper);
        
        // Event listener for checkbox state change
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

// Function to handle checkbox changes, the counter, and disable/enable logic of checkboxes
function handleCheckboxChange() {
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let allBoxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedCount = checkedBoxes.length;
    
    // Update counter
    counter.textContent = 'Selected: ' + checkedCount + '/4';
    
    if (checkedCount === 4) {
        // When fourth checkbox is checked, disable all other checkboxes
        allBoxes.forEach(box => {
            if (!box.checked) {
                box.disabled = true;
            }
        });
        // Enable submit button when exactly 4 are checked
        submitButton.disabled = false;
    } else {
        // Enable all checkboxes otherwise
        allBoxes.forEach(box => {
            box.disabled = false;
        });
        // Disable submit button otherwise
        submitButton.disabled = true;
    }
}

// Function to check if attempted guess is correct
function checkAnswer() {
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkedBoxes.length !== 4) {
        return false;
    }
    
    // Get the categories of all checked boxes
    let selectedCategories = Array.from(checkedBoxes).map(box => box.dataset.category);
    
    // Check if all categories are the same
    return selectedCategories.every(cat => cat === selectedCategories[0]);
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    if (checkAnswer()) {
        // If correct, show alert
        window.alert('Correct! You found a matching category!');
        
        // Remove the checked elements from the DOM
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedBoxes.forEach(checkbox => {
            checkbox.parentElement.remove();
        });
        
        // Reset counter
        counter.textContent = 'Selected: 0/4';

        // Disable submit button again
        submitButton.disabled = true;

        // Re-enable any remaining checkboxes 
        let remainingBoxes = document.querySelectorAll('input[type="checkbox"]');
        remainingBoxes.forEach(box => {
            box.disabled = false;
        });

        // Check if game is complete
        if (remainingBoxes.length === 0) {
            window.alert('Congratulations! You found all categories!');
        }
    } else {
        // If incorrect, show alert
        window.alert('Incorrect! These words are not all from the same category. Try again!');
    }
}


function init() {
    generateCheckboxes();
    gameForm.addEventListener('submit', handleSubmit);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}