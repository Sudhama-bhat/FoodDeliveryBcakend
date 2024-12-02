
# **Restaurant Order Management System**

This is a simple Node.js-based application that helps manage a restaurant's menu and customer orders. It includes features for adding menu items, placing orders, and automatically updating order statuses over time.

---

## **Features**
1. **Manage Menu:**
   - Add new items to the menu with a name, price, and category.
   - View all available menu items.

2. **Place Orders:**
   - Customers can select multiple menu items to create an order.
   - Each order is assigned a unique ID.

3. **Track Orders:**
   - Check the status of an order using its unique ID.
   - Order status automatically updates:
     - `Preparing` → `Out for Delivery` → `Delivered`.

4. **Automated Status Updates:**
   - Every minute, the system updates order statuses automatically using a scheduled task.

---

## **How to Use**

### 1. **Setup**
- Install Node.js on your computer.
- Clone the repository or copy the project files.
- Run the following command to install dependencies:
  ```bash
  npm install
  ```

### 2. **Start the Server**
- Run the application using:
  ```bash
  node app.js
  ```
- The server will start at `http://localhost:3000`.

---

## **API Endpoints**

### **Menu Management**
- **Add Menu Item:**
  - **POST** `/menu`
  - **Body Example:**
    ```json
    {
        "name": "Pizza",
        "price": 12.5,
        "category": "Main Course"
    }
    ```
  - **Response Example:**
    ```json
    {
        "id": "menu-uuid",
        "name": "Pizza",
        "price": 12.5,
        "category": "Main Course"
    }
    ```

- **Get Menu:**
  - **GET** `/menu`
  - **Response Example:**
    ```json
    [
        { "id": "menu-uuid", "name": "Pizza", "price": 12.5, "category": "Main Course" },
        { "id": "menu-uuid-2", "name": "Burger", "price": 10, "category": "Starter" }
    ]
    ```

---

### **Order Management**
- **Place Order:**
  - **POST** `/orders`
  - **Body Example:**
    ```json
    {
        "items": ["menu-uuid", "menu-uuid-2"]
    }
    ```
  - **Response Example:**
    ```json
    {
        "id": "order-uuid",
        "items": ["menu-uuid", "menu-uuid-2"],
        "status": "Preparing",
        "createdAt": "2024-12-02T00:00:00Z"
    }
    ```

- **Get Order by ID:**
  - **GET** `/orders/:id`
  - Replace `:id` with the order's unique ID.
  - **Response Example:**
    ```json
    {
        "id": "order-uuid",
        "items": [
            { "id": "menu-uuid", "name": "Pizza", "price": 12.5 },
            { "id": "menu-uuid-2", "name": "Burger", "price": 10 }
        ],
        "status": "Out for Delivery",
        "createdAt": "2024-12-02T00:00:00Z"
    }
    ```

---

## **Automated Status Updates**
- Every minute, the system updates the order status as follows:
  1. `Preparing` → `Out for Delivery`
  2. `Out for Delivery` → `Delivered`

---

## **Technologies Used**
- **Node.js**: Backend framework.
- **Express.js**: For creating the API endpoints.
- **node-cron**: For scheduling automated tasks.
- **uuid**: For generating unique IDs.

---

## **License**
This project is open source. Feel free to use and modify it as needed.
