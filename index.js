const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

let menu = [];
let orders = [];

const categories = ['Starter', 'Main Course', 'Dessert', 'Drink'];

app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).send({ error: 'Name is required and must be a string' });
    }
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).send({ error: 'Price must be a positive number' });
    }
    if (!categories.includes(category)) {
        return res.status(400).send({ error: `Category must be one of: ${categories.join(', ')}` });
    }

    const item = { id: uuidv4(), name, price, category };
    menu.push(item);
    res.status(201).send(item);
});

app.get('/menu', (req, res) => {
    res.send(menu);
});

app.post('/orders', (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).send({ error: 'Items must be a non-empty array' });
    }

    for (const itemId of items) {
        if (!menu.some(menuItem => menuItem.id === itemId)) {
            return res.status(400).send({ error: `Item ID ${itemId} does not exist in the menu` });
        }
    }

    const order = { id: uuidv4(), items, status: 'Preparing', createdAt: new Date() };
    orders.push(order);
    res.status(201).send(order);
});

app.get('/orders/:id', (req, res) => {
    const { id } = req.params;

    const order = orders.find(o => o.id === id);
    if (!order) {
        return res.status(404).send({ error: 'Order not found' });
    }

    res.send(order);
});

cron.schedule('*/1 * * * *', () => {
    orders.forEach(order => {
        if (order.status === 'Preparing') {
            order.status = 'Out for Delivery';
        } else if (order.status === 'Out for Delivery') {
            order.status = 'Delivered';
        }
    });
    console.log('Order statuses updated');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
