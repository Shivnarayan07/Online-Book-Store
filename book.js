document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/get-all-prod")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(books => {
            displayBooks(books);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Initialize cart
var cart = [];

// Retrieve cart from localStorage if it exists
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Function to display cart items and calculate total price
function displayCartItems() {
    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    var totalPrice = 0;

    // Iterate over each item in the cart
    cart.forEach(function(item) {
        var itemHTML = `
            <div style="margin-bottom: 20px;">
                <h3>${item.title}</h3>
                <p>Price: ₹${item.price}</p>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;

        // Calculate total price
        totalPrice += item.price;
    });

    // Display total price
    var totalPriceHTML = `<p>Total Price: ₹${totalPrice.toFixed(2)}</p>`;
    cartItemsContainer.innerHTML += totalPriceHTML;
}

// Event listener for adding items to the cart
document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("add-to-cart-btn")) {
        var productName = event.target.dataset.name;
        var productPrice = parseFloat(event.target.dataset.price);
        addToCart(productName, productPrice);
    }
});

// Function to add items to the cart
function addToCart(productName, price) {
    alert('Added ' + productName + ' to cart. Price: ₹' + price);
    var selectedBook = {
        title: productName,
        price: price
    };

    // Add the selected book to the cart array
    cart.push(selectedBook);

    // Update localStorage with the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart UI
    displayCartItems();
}// Function to display books
function displayBooks(books) {
    var productContainer = document.getElementById("Product");

    if (!productContainer) {
        console.error("Product container not found.");
        return;
    }

    // Clear existing content
    productContainer.innerHTML = "";

    // Retrieve book titles from the cart
    var cartBookTitles = cart.map(item => item.title);

    // Iterate over each book and create HTML elements
    books.forEach(function(book) {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        var sectionDiv = document.createElement("section");
        sectionDiv.id = "section" + book.id; // Assuming each book has an ID
        sectionDiv.innerHTML = `
            <img style="height: 190px; width: 200px;" src="data:image/jpeg;base64,${book.image}" alt="${book.title}">
            <h1 style="color: black;">${book.title}</h1>
            <h1>Price: <a style="color: red;">₹ ${book.price}</a></h1>
        `;

        // Check if the book is already in the cart
        var isInCart = cartBookTitles.includes(book.title);
        if (!isInCart) {
            var button = document.createElement("button");
            button.textContent = "Add to Cart";
            button.classList.add("add-to-cart-btn"); // Add a class to identify add to cart buttons
            button.dataset.name = book.title; // Set dataset for product name
            button.dataset.price = book.price; // Set dataset for product price
            sectionDiv.appendChild(button);
        }

        cardDiv.appendChild(sectionDiv);
        productContainer.appendChild(cardDiv);
    });
}
