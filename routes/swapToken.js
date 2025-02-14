const express = require('express');
const router = express.Router();
const axios = require('axios');

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_TOKEN_SEARCH_API_URL = "https://api.1inch.dev/token/v1.2/1/search";

const searchTokenDetails = async (tokenName, retries = 3, delay = 1000) => {
    try {
        if (!tokenName) {
            return { error: "Missing required query parameter: 'tokenName'" };
        }

        const params = {
            query: tokenName,
            ignore_listed: false,
            only_positive_rating: true,
            limit: 1
        };

        const response = await axios.get(ONE_INCH_TOKEN_SEARCH_API_URL, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params
        });

        const tokens = response.data;
        if (tokens.length > 0) {
            const { name, symbol, address, decimals, chainId } = tokens[0];
            return { name, symbol, address, decimals, chainId };
        } else {
            return { error: "No tokens found" };
        }
    } catch (error) {
        const status = error.response?.status;

        if (status === 429 && retries > 0) {
            // Handle rate limit error with retry
            console.warn(`Rate limit exceeded. Retrying in ${delay}ms... (${retries} retries left)`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return searchTokenDetails(tokenName, retries - 1, delay * 2); // Exponential backoff
        }

        console.error('Error searching tokens:', error.response?.data || error.message);
        return { error: error.response?.data?.message || "Error in search tokens" };
    }
};


router.get('/', async (req, res) => {
    try {
        const { fromToken, toToken } = req.query;

        // Validate required query parameter
        if (!fromToken || !toToken) {
            return res.status(400).json({ error: "Missing required query parameter: 'fromToken', 'toToken" });
        }

        // Fetch both tokens in parallel
        const [fromTokenInfo, toTokenInfo] = await Promise.all([
            searchTokenDetails(fromToken),
            searchTokenDetails(toToken)
        ]);

        return res.status(200).json({ fromToken: fromTokenInfo, toToken: toTokenInfo });
    } catch (error) {
        console.error('Error searching tokens:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

module.exports = router;
