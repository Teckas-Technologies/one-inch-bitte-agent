const express = require('express');
const router = express.Router();
const axios = require("axios");

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_ORDERBOOK_API_URL = "https://api.1inch.dev/orderbook/v4.0/1/address";
const ONE_INCH_ORDER_API_URL = "https://api.1inch.dev/orderbook/v4.0/1/order";
const ONE_INCH_EVENTS_API_URL = "https://api.1inch.dev/orderbook/v4.0/1/events";

router.get("/", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        // Construct the API URL with the address and query params
        const url = `${ONE_INCH_ORDERBOOK_API_URL}/${walletAddress}?limit=100`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({ orders: response.data });
    } catch (error) {
        console.error('Error fetching order book:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/order", async (req, res) => {
    try {
        const { orderHash } = req.query;

        // Construct the API URL with the order ID
        const url = `${ONE_INCH_ORDER_API_URL}/${orderHash}`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({ order: response.data});
    } catch (error) {
        console.error('Error fetching order details:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/events", async (req, res) => {
    try {
        const { orderHash } = req.query;

        // Construct the API URL with the event ID
        const url = `${ONE_INCH_EVENTS_API_URL}/${orderHash}`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({ events: response.data});
    } catch (error) {
        console.error('Error fetching event details:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const ONE_INCH_ORDERBOOK_CREATE_ORDER_API_URL = "https://api.1inch.dev/orderbook/v4.0/1";

router.post('/create-order', async (req, res) => {
    try {
        const {
            orderHash,
            signature,
            data
        } = req.body;

        // Validate required fields
        if (!orderHash || !signature || !data) {
            return res.status(400).json({ error: "Missing required fields: 'orderHash', 'signature', or 'data'" });
        }

        // Validate data object
        const {
            makerAsset,
            takerAsset,
            maker,
            receiver,
            makingAmount,
            takingAmount,
            salt,
            extension,
            makerTraits
        } = data;

        if (!makerAsset || !takerAsset || !maker || !makingAmount || !takingAmount || !salt) {
            return res.status(400).json({ error: "Missing required fields in 'data': 'makerAsset', 'takerAsset', 'maker', 'makingAmount', 'takingAmount', or 'salt'" });
        }

        // Construct the payload
        const payload = {
            orderHash,
            signature,
            data: {
                makerAsset,
                takerAsset,
                maker,
                receiver: receiver || "0x0000000000000000000000000000000000000000", // Default receiver
                makingAmount,
                takingAmount,
                salt,
                extension: extension || "0x", // Default extension
                makerTraits: makerTraits || "0" // Default maker traits
            }
        };

        // Make the POST request to the 1inch Order Book API
        const response = await axios.post(ONE_INCH_ORDERBOOK_CREATE_ORDER_API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating order:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});


module.exports = router;
