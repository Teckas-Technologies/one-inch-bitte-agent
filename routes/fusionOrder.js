const express = require('express');
const router = express.Router();
const axios = require('axios');

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_FUSION_PLUS_API_URL = "https://api.1inch.dev/fusion-plus/orders/v1.0/order/maker";

router.get('/maker-orders', async (req, res) => {
    try {
        const { makerAddress } = req.query;

        // Validate required parameters
        if (!makerAddress) {
            return res.status(400).json({ error: "Missing required parameter: 'makerAddress'" });
        }

        // Construct the API URL
        const url = `${ONE_INCH_FUSION_PLUS_API_URL}/${makerAddress}?chainId=1`;

        // Make the GET request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({ orders: response.data});
    } catch (error) {
        console.error('Error fetching maker orders:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

module.exports = router;
