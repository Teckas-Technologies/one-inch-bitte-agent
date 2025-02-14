const express = require('express');
const router = express.Router();
const axios = require("axios");

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_HISTORY_API_URL = "https://api.1inch.dev/history/v2.0/history";

router.get("/", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        // Construct the API URL with the wallet address and chainId
        const url = `${ONE_INCH_HISTORY_API_URL}/${walletAddress}/events?chainId=1`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching wallet history events:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
