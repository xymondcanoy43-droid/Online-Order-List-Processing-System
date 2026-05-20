let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Display Orders Automatically
window.onload = function () {
    displayOrders();
};

// Add Order
function addOrder() {
    try {
        const customerName = document.getElementById("customerName").value.trim();
        const productName = document.getElementById("productName").value.trim();
        const quantity = parseInt(document.getElementById("quantity").value);
        const price = parseFloat(document.getElementById("price").value);

        // Validation
        if (
            customerName === "" ||
            productName === "" ||
            isNaN(quantity) ||
            isNaN(price)
        ) {
            alert("Please fill in all fields correctly.");
            return;
        }

        if (quantity <= 0 || price <= 0) {
            alert("Quantity and price must be greater than 0.");
            return;
        }

        // Duplicate Prevention
        const duplicate = orders.find(order =>
            order.customerName.toLowerCase() === customerName.toLowerCase() &&
            order.productName.toLowerCase() === productName.toLowerCase()
        );

        if (duplicate) {
            alert("Duplicate order detected.");
            return;
        }

        const total = quantity * price;

         const order = {
            id: Date.now(),
            customerName,
            productName,
            quantity,
            price,
            total
        };

        orders.push(order);

        saveToLocalStorage();
        displayOrders();
        clearInputs();

        alert("Order added successfully!");

    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Display Orders
function displayOrders(orderList = orders) {
    const tableBody = document.getElementById("orderTableBody");
    tableBody.innerHTML = "";

    let grandTotal = 0;

    if (orderList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No orders found.</td>
            </tr>
        `;

        document.getElementById("totalSales").innerText =
            "Total Sales: ₱0.00";

        return;
    }

    orderList.forEach(order => {
        grandTotal += order.total;

        tableBody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.productName}</td>
                <td>${order.quantity}</td>
                <td>₱${order.price.toFixed(2)}</td>
                <td>₱${order.total.toFixed(2)}</td>
                <td>
                    <button class="delete-btn" onclick="deleteOrder(${order.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalSales").innerText =
        `Total Sales: ₱${grandTotal.toFixed(2)}`;
}
// Delete Order
function deleteOrder(id) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");

    if (!confirmDelete) {
        return;
    }

    orders = orders.filter(order => order.id !== id);

    saveToLocalStorage();
    displayOrders();
}

// Linear Search Algorithm
function searchOrder() {
    const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();

    if (searchValue === "") {
        alert("Please enter a customer name.");
        return;
    }

    let foundOrders = [];

    // Linear Search
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].customerName.toLowerCase().includes(searchValue)) {
            foundOrders.push(orders[i]);
        }
    }

    if (foundOrders.length === 0) {
        alert("No matching orders found.");
    }

    displayOrders(foundOrders);
}

// Bubble Sort by Customer Name
function sortByName() {
    for (let i = 0; i < orders.length - 1; i++) {
        for (let j = 0; j < orders.length - i - 1; j++) {
            if (
                orders[j].customerName.toLowerCase() >
                orders[j + 1].customerName.toLowerCase()
            ) {
                let temp = orders[j];
                orders[j] = orders[j + 1];
                orders[j + 1] = temp;
            }
        }
    }

    saveToLocalStorage();
    displayOrders();
}

// Bubble Sort by Total Amount
function sortByTotal() {
    for (let i = 0; i < orders.length - 1; i++) {
        for (let j = 0; j < orders.length - i - 1; j++) {
            if (orders[j].total > orders[j + 1].total) {
                let temp = orders[j];
                orders[j] = orders[j + 1];
                orders[j + 1] = temp;
            }
        }
    }

    saveToLocalStorage();
    displayOrders();
}

// Save Data
function saveToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Clear Inputs
function clearInputs() {
    document.getElementById("customerName").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}