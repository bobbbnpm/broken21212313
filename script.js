document.addEventListener("DOMContentLoaded", function () {
  const bucketListContainer = document.getElementById("bucketlist-container");
  const resetButton = document.getElementById("reset-button");
  const categoryFilter = document.getElementById('category-filter');

  // Load saved items from localStorage
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  // Function to update the button text and disable it
  function updateSaveButton(button) {
    button.innerText = "Saved";
    button.disabled = true;
  }

  // Function to render saved items
  function renderSavedItems() {
    bucketListContainer.innerHTML = ''; // Clear the container before rendering
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

  // Event delegation for handling button clicks
  bucketListContainer.addEventListener("click", function (event) {
    const target = event.target;
    const bucketItem = target.closest('.bucketlist-item'); // Get the parent item

    if (bucketItem) {
      const itemText = bucketItem.querySelector("span").innerText;
      const itemCategory = bucketItem.getAttribute("data-category");

      if (target.classList.contains("save-btn")) {
        // Handle save button
        const itemExists = savedItems.some(item => item.text === itemText && item.category === itemCategory);
        if (!itemExists) {
          const newItem = { text: itemText, category: itemCategory };
          savedItems.push(newItem);
          localStorage.setItem("savedItems", JSON.stringify(savedItems));
        }
        updateSaveButton(target);
      }

      if (target.classList.contains("remove-btn")) {
        // Handle remove button
        const updatedItems = savedItems.filter(item => !(item.text === itemText && item.category === itemCategory));
        localStorage.setItem("savedItems", JSON.stringify(updatedItems));
        bucketItem.remove();
      }

      // Other button actions like complete or priority can be handled similarly if needed
    }
  });

  // Reset saved items
  resetButton.addEventListener("click", function () {
    localStorage.removeItem("savedItems");
    alert("Saved items have been reset!");
    renderSavedItems(); // Re-render the list after reset
  });

  // Filter items by category
  categoryFilter.addEventListener('change', function () {
    const selectedCategory = this.value;
    const items = document.querySelectorAll('.bucketlist-item');

    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (selectedCategory === 'all' || itemCategory === selectedCategory) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Add bucket list items dynamically
  function addBucketListItem(title, category) {
    const item = { text: title, category: category };
    const itemExists = savedItems.some(savedItem => savedItem.text === title && savedItem.category === category);

    if (!itemExists) {
      savedItems.push(item);
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
    }
    renderSavedItems(); // Re-render after adding
  }

  // Example: Add bucket list items dynamically
  addBucketListItem("Watch Inception", "movie");
  addBucketListItem("Read Harry Potter", "books");
  addBucketListItem("Visit Paris", "travel");
  addBucketListItem("Play FIFA 23", "sport");

  // Initial render of saved items
  renderSavedItems();
});
