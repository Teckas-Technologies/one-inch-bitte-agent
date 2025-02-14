const express = require('express');
const router = express.Router();
const axios = require("axios");

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_PORTFOLIO_API_URL = "https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/details";
const ONE_INCH_CURRENT_VALUE_API_URL = "https://api.1inch.dev/portfolio/portfolio/v4/general/current_value";
const ONE_INCH_SUPPORTED_CHAINS_API_URL = "https://api.1inch.dev/portfolio/portfolio/v4/general/supported_chains";

router.get("/holdings", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        // Validate required query parameters
        if (!walletAddress) {
            return res.status(400).json({ error: "Missing required query parameters: 'walletAddress'" });
        }

        // Construct the API URL with query parameters
        const url = `${ONE_INCH_PORTFOLIO_API_URL}?addresses=${walletAddress}&chain_id=1&closed=true&closed_threshold=1`;

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
        console.error('Error fetching portfolio details:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/current-value", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        // Validate query parameters
        if (!walletAddress) {
            return res.status(400).json({ error: "Missing required query parameters: 'walletAddress'" });
        }

        // Construct the API URL with query parameters
        const url = `${ONE_INCH_CURRENT_VALUE_API_URL}?addresses=${walletAddress}&chain_id=1&use_cache=true`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({"current-value": response.data});
    } catch (error) {
        console.error('Error fetching current portfolio value:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const ONE_INCH_PROFIT_AND_LOSS_API_URL = "https://api.1inch.dev/portfolio/portfolio/v4/general/profit_and_loss";

router.get("/profit-and-loss", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        // Validate query parameters
        if (!walletAddress) {
            return res.status(400).json({ error: "Missing required query parameters: 'walletAddress'" });
        }

        // Construct the API URL with query parameters
        const url = `${ONE_INCH_PROFIT_AND_LOSS_API_URL}?addresses=${walletAddress}&chain_id=1`;

        // Make the request to the 1inch API
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({"statement": response.data});
    } catch (error) {
        console.error('Error fetching profit and loss details:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/supported-chains", async (req, res) => {
    try {
        // Make the request to the 1inch API
        const response = await axios.get(ONE_INCH_SUPPORTED_CHAINS_API_URL, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received from the API
        return res.status(200).json({ "supported-chains": response.data});
    } catch (error) {
        console.error('Error fetching supported chains:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
