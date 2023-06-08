const express = require('express');
const db = require('../database.js');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../templates/index.html'))
    //res.status(200).json()
})

// POST: create new expense
router.post('/expenses/create', (req, res) => {
    const { name, amount, date, category } = req.body;
    console.log(req.body);

    if (!name) {
        return res.status(400).json({ error: 'Missing required fields' }); 
    }

    const formattedDate = new Date(date).toISOString();

    const expense = {
        name,
        amount,
        date: formattedDate,
        category
    };

    db.push(expense);
    res.status(200).json(expense);
});

// GET: get all expenses
router.get('/expenses/get-all', (req, res) => {
    res.json(db.get());
});

// POST: search expenses by date
router.post('/expenses/search', (req, res) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ error: 'Missing date field' });
    }

    expenses = db.get()
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date).toISOString().slice(0, 10);
        return expenseDate === date;
    });

    res.json(filteredExpenses);
});

// POST: set daily limit
router.post('/expenses/set-daily-limit', (req, res) => {
    const { limit } = req.body;

    if (!limit) {
        return res.status(400).json({ error: 'Missing limit field' });
    }
    if (typeof limit !== 'number') {
        return res.status(400).json({ error: 'Limit should be a number' });
    }

    db.setLimit(limit);
    res.sendStatus(200);
});

// GET: get daily limit
router.get('/expenses/show-daily-limit', (req, res) => {
    limit = db.getLimit()
    res.json({ limit: limit });
});

module.exports = router;