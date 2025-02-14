const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('public', express.static(path.join(__dirname, 'public')));

const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: '*' }));

const balanceRouter = require('./routes/balance');
const orderBookRouter = require('./routes/orderBook');
const historyRouter = require('./routes/history');
const portfolioRouter = require('./routes/portfolio');
const fusionOrderRouter = require('./routes/fusionOrder');
const swapTokenRouter = require('./routes/swapToken');
const createTransactionRouter = require('./routes/createTransactionResponse');

app.use('/api/balance', balanceRouter);
app.use('/api/orderbook', orderBookRouter);
app.use('/api/history', historyRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/fusion-order', fusionOrderRouter);
app.use('/api/swap-token', swapTokenRouter);
app.use('/api/create-transaction', createTransactionRouter);

app.get("/", (req, res) => res.send("Express on Azure"));
app.get('/.well-known/ai-plugin.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'public/.well-known/ai-plugin.json'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`1Inch AI Agent Running on port : ${port}`)
})