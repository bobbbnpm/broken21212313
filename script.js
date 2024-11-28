document.addEventListener("DOMContentLoaded", function() {
  const bucketListContainer = document.getElementById("bucketlist-container");

  // localStorage
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  // update
  function updateSaveButton(button) {
    button.innerText = "Saved";
    button.disabled = true;
  }

  // rendrování uloženého
  function renderSavedItems() {
    savedItems.forEach(item => {
      const newItem = document.createElement("div");
      newItem.classList.add("bucketlist-item");
      newItem.setAttribute("data-category", item.category);
      newItem.setAttribute("data-status", "incomplete");

      newItem.innerHTML = `
        <span>${item.text}</span>
        <button class="complete-btn">Mark as Completed</button>
        <button class="priority-btn">Set as Priority</button>
        <button class="remove-btn">Remove</button>
      `;

      bucketListContainer.appendChild(newItem);
    });
  }

  // dynamický handling
  bucketListContainer.addEventListener("click", function(event) {
    const target = event.target;
    
    if (target && target.classList.contains("save-btn")) {
      const bucketItem = target.parentElement;
      const itemText = bucketItem.querySelector("span").innerText;
      const itemCategory = bucketItem.getAttribute("data-category");

      const itemExists = savedItems.some(item => item.text === itemText && item.category === itemCategory);

      if (!itemExists) {
        const newItem = { text: itemText, category: itemCategory };
        savedItems.push(newItem);
        localStorage.setItem("savedItems", JSON.stringify(savedItems));
      }

      updateSaveButton(target);
    }

    if (target && target.classList.contains("remove-btn")) {
      const bucketItem = target.parentElement;
      const itemText = bucketItem.querySelector("span").innerText;
      const itemCategory = bucketItem.getAttribute("data-category");

      const updatedItems = savedItems.filter(item => !(item.text === itemText && item.category === itemCategory));
      localStorage.setItem("savedItems", JSON.stringify(updatedItems));

      bucketItem.remove();
    }
  });

  // resetuje uložené {span}
  document.getElementById("reset-button").addEventListener("click", function() {
    localStorage.removeItem("savedItems");
    alert("Saved items have been reset!");
    bucketListContainer.innerHTML = ""; 
  });

  renderSavedItems();
});





// FILTROVÁNÍ 
document.addEventListener('DOMContentLoaded', function () {
  const categoryFilter = document.getElementById('category-filter');
  const bucketlistContainer = document.getElementById('bucketlist-container');
  const resetButton = document.getElementById('reset-button');
  
  // Filtr-kategorie
  categoryFilter.addEventListener('change', function () {
    const selectedCategory = categoryFilter.value;
    const items = bucketlistContainer.getElementsByClassName('bucketlist-item');
    
    // hide/show podle kategorie
    for (let item of items) {
      const itemCategory = item.getAttribute('data-category');
      if (selectedCategory === 'all' || itemCategory === selectedCategory) {
        item.style.display = '';  // Show item
      } else {
        item.style.display = 'none';  // Hide item
      }
    }
  });

  // Reset všech filtrů
  resetButton.addEventListener('click', function () {
    categoryFilter.value = 'all';  // Reset category filter to "All"
    const items = bucketlistContainer.getElementsByClassName('bucketlist-item');
    for (let item of items) {
      item.style.display = '';  // Show all items
    }
  });

  // completed
  document.getElementById('completed-button').addEventListener('click', function () {
    const items = bucketlistContainer.getElementsByClassName('bucketlist-item');
    for (let item of items) {
      const status = item.getAttribute('data-status');
      if (status === 'incomplete') {
        item.style.display = 'none';  // Hide incomplete items
      } else {
        item.style.display = '';  // Show completed items
      }
    }
  });

  // priority
  document.getElementById('priority-button').addEventListener('click', function () {
    const items = bucketlistContainer.getElementsByClassName('bucketlist-item');
    for (let item of items) {
      const isPriority = item.classList.contains('priority');
      if (!isPriority) {
        item.style.display = 'none';  // Hide non-priority items
      } else {
        item.style.display = '';  // Show priority items
      }
    }
  });

  // Mark item as completed
  bucketlistContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('complete-btn')) {
      const item = e.target.closest('.bucketlist-item');
      item.setAttribute('data-status', 'completed');
      item.style.textDecoration = 'line-through';  // Visual indication of completion
    }

    if (e.target.classList.contains('priority-btn')) {
      const item = e.target.closest('.bucketlist-item');
      item.classList.toggle('priority');
      item.style.fontWeight = item.classList.contains('priority') ? 'bold' : 'normal';  // Visual indication of priority
    }

    if (e.target.classList.contains('remove-btn')) {
      const item = e.target.closest('.bucketlist-item');
      item.remove();  // Remove the item from the list
    }
  });
});




// Seznam aktivit
const activities = [
  "The Day of the Triffids",
  "Harry Potter",
  "The Witcher",
  "The Three-Body Problem",
  "Mafia",
  "Detroit: Become Human",
  "Elden Ring",
  "Minecraft",
  "Explore street food in Bangkok, Thailand",
  "Try authentic sushi in Japan"
];

// Počáteční index pro aktivity
let currentActivityIndex = 0;

// Získání elementů
const challengeText = document.getElementById("challenge-text");
const saveButton = document.querySelector(".save-btn");
const nextButton = document.querySelector(".next-btn");

// Funkce pro změnu aktivity
function changeActivity() {
  currentActivityIndex = (currentActivityIndex + 1) % activities.length;
  challengeText.textContent = activities[currentActivityIndex];
  saveButton.textContent = "Save";  // Po změně aktivit resetuj tlačítko na "Save"
}

// Funkce pro zobrazení "Saved" po kliknutí na Save
saveButton.addEventListener("click", () => {
  if (saveButton.textContent !== "Saved") {
    saveButton.textContent = "Saved";  // Změní text tlačítka na "Saved"
  }
});

// Funkce pro přechod na další aktivitu po kliknutí na Skip
nextButton.addEventListener("click", () => {
  changeActivity(); // Změní aktivitu
  saveButton.textContent = "Save"; // Resetuje tlačítko na "Save" po změně aktivity
});






