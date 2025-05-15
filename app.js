const menu = [
  { id: 1, name: 'Pizza', price: 12.99 },
  { id: 2, name: 'Burger', price: 8.99 },
  { id: 3, name: 'Pasta', price: 10.49 },
  { id: 4, name: 'Salad', price: 11.49 },
];

// Populate the menu dropdown
const foodItemSelect = document.getElementById('food-item');
menu.forEach(item => {
  const option = document.createElement('option');
  option.value = item.id;
  option.textContent = `${item.name} - $${item.price}`;
  foodItemSelect.appendChild(option);
});

// Handle order form submission
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const selectedFoodId = foodItemSelect.value;
  const selectedFood = menu.find(item => item.id == selectedFoodId);
  
  fetch("http://localhost:8080/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    foodId: selectedFood.id,
    quantity: 1,
  }),
})
.then(response => response.text())
.then(data => {
  alert(data); // Show order response
})
.catch(error => {
  console.error("Error:", error);
  alert("Failed to place order");
});
});
