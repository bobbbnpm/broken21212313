document.addEventListener("DOMContentLoaded", function() {
  const bucketListContainer = document.getElementById("bucketlist-container");

  // Load saved items from localStorage
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  // Function to update the button text and disable it
  function updateSaveButton(button) {
    button.innerText = "Saved";
    button.disabled = true;
  }

  // Function to render saved items
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

  // Attach event listener to the container for dynamic handling
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

  // Reset saved items
  document.getElementById("reset-button").addEventListener("click", function() {
    localStorage.removeItem("savedItems");
    alert("Saved items have been reset!");
    bucketListContainer.innerHTML = ""; // Clear the displayed list
  });

  renderSavedItems();
});
