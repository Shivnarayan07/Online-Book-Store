// adding books
async function addBook() {
      const formData = new FormData(addBookForm);
      const url = "http://localhost:8080/addProduct";

      try {
          const response = await fetch(url, {
              method: "POST",
              body: formData
          });

          if (response.ok) {
              const responseData = await response.text();
              alert("Book added successfully")
              console.log("Product added successfully:", responseData);
          } else {
              const errorMessage = await response.text();
              console.error("Failed to add product:", errorMessage);
          }
      } catch (error) {
          console.error("Error:", error);
      }
  }

//   delete book by titile
async function deleteBook() {
    const deleteTitleInput = document.getElementById("deleteTitle");
    const deleteTitle = deleteTitleInput.value;
    
    const formData = new FormData(deleteBookForm);
    const url = "http://localhost:8080/delete?title="+deleteTitle;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            body: formData
        });

        if (response.ok) {
            const responseData = await response.text();
            alert("Book Deleted successfully")
            console.log("Product Deleted successfully:", responseData);
        } else {
            const errorMessage = await response.text();
            console.error("Failed to Delete:", errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function searchBooks() {
    var searchTerm = document.getElementById("searchInput").value;

    fetch("http://localhost:8080/search?title=" + searchTerm)
        .then(response => response.json()) 
        .then(data => {
            console.log(data); 
            displayResults(data);
        })
        .catch(error => console.error('Error searching books:', error));
}

function displayResults(products) {
    var resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    products.forEach(product => {
        console.log(product);
        var card = document.createElement("div");
        card.classList.add("card");

        var html = `<section>
                        <img style="height: 190px; width: 200px;" src="data:image/jpeg;base64,${product.image}" >
                        <h1>${product.title}</h1>
                        <h1><a style="color: red;" href="#">₹ ${product.price}</a></h1>
                    </section>
                    <br>
                    <p><button onclick="addToCart('${product.title}', '${product.price}')">Add to Cart</button></p>`;

        card.innerHTML = html;
        resultsContainer.appendChild(card);
    });
}
function editBook() {
    const editTitle = document.getElementById("editTitle").value;
    const editPrice = document.getElementById("editPrice").value;

    // Data to be sent in the request body
    const requestBody = {
        title: editTitle,
        price: editPrice
    };

    // URL for the edit book endpoint
    const url = 'http://localhost:8080/editBook';

    // Configure the fetch options
    const fetchOptions = {
        method: 'PUT', // Use PUT method for editing
        headers: {
            'Content-Type': 'application/json' // Specify JSON content type
        },
        body: JSON.stringify(requestBody) // Convert data to JSON string
    };

    // Send the fetch request
    fetch(url, fetchOptions)
        .then(response => {
            if (response.ok) {
                // Book edited successfully
                alert('Book edited successfully');
                document.getElementById("editBookForm").style.display = "none"; // Hide the edit form
            } else {
                // Handle error response
                alert('Failed to edit book');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while editing the book');
        });
}

function getAllUser() {
    fetch('http://localhost:8080/get-all-user')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.id}: ${user.username} - ${user.email}-${user.mobileno}`;
                userList.appendChild(listItem);
            });
            document.getElementById('userListContainer').style.display = 'block';
           
        })
        .catch(error => console.error('Error fetching users:', error));
}
// Call the getAllUser function when the "Get All Users" button is clicked
document.getElementById('getAllUsersButton').addEventListener('click', getAllUser);


function getAllProducts() {
    fetch('http://localhost:8080/get-all-prod')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear previous product list
            products.forEach(product => {
                const listItem = document.createElement('li');
                const imageElement = document.createElement('img');
                
                // Decode the image data (assuming it's base64 encoded)
                const imageData = atob(product.image);
                
                // Set the image source to the decoded data
                imageElement.src = `data:image/jpeg;base64,${imageData}`;
                
                // Append the image to the list item
                listItem.appendChild(imageElement);
                
                // Append other product details to the list item
                listItem.innerHTML += `<span>${product.id}: ${product.title} - ${product.price}</span>`;
                
                // Append the list item to the product list
                productList.appendChild(listItem);
            });
            document.getElementById('productListContainer').style.display = 'block';
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Call the getAllProducts function when the "Get All Products" button is clicked
document.getElementById('getAllProductsButton').addEventListener('click', getAllProducts);
