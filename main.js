const express = require('express');
const bodyParser = require('body-parser');
const expenseRouters = require('./routes/expense_routes.js')

let port = 5000;
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Got request ${req.method} ${req.path}`);

    next();
})

app.use('/', expenseRouters);

app.listen(port, () => {
    console.log(`Sever has started successfully: http://localhost:${port}, dirname = ${__dirname}`);
});