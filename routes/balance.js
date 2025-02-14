const express = require('express');
const router = express.Router();
const axios = require("axios");

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;
const ONE_INCH_BALANCE_API_URL = "https://api.1inch.dev/balance/v1.2/1/balances";
const ONE_INCH_TOKEN_API_URL = "https://api.1inch.dev/token/v1.2/1/custom";

router.get("/", async (req, res) => {
    try {
        const { walletAddress } = req.query;

        console.log("Wallet address:", walletAddress)

        // Step 1: Get token balances
        const response = await axios.get(`${ONE_INCH_BALANCE_API_URL}/${walletAddress}`, {
            headers: {
                'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                'Accept': 'application/json'
            }
        });

        const allTokens = response.data;
        const holdingTokens = {};

        for (const [tokenAddress, balance] of Object.entries(allTokens)) {
            if (parseFloat(balance) > 0) {
                holdingTokens[tokenAddress] = balance;
            }
        }

        console.log('Tokens with a positive balance:', holdingTokens);

        // Step 2: Fetch token details for each holding token
        const tokenDetailsPromises = Object.keys(holdingTokens).map(async (tokenAddress) => {
            try {
                if (tokenAddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                    // Handle native token manually
                    const decimals = 18; // Ethereum has 18 decimals
                    const rawBalance = holdingTokens[tokenAddress];
                    const formattedBalance = (parseFloat(rawBalance) / Math.pow(10, decimals)).toString();

                    return {
                        [tokenAddress]: {
                            balance: {
                                raw: rawBalance,
                                formatted: formattedBalance
                            },
                            details: {
                                symbol: "ETH",
                                name: "Ethereum",
                                address: tokenAddress,
                                chainId: 1,
                                decimals: decimals,
                                logoURI: "https://tokens-data.1inch.io/images/1/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.webp"
                            }
                        }
                    };
                } else {
                    const tokenResponse = await axios.get(`${ONE_INCH_TOKEN_API_URL}/${tokenAddress}`, {
                        headers: {
                            'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                    const tokenDetails = tokenResponse.data;
                    const decimals = tokenDetails.decimals || 18; // Default to 18 decimals if not provided
                    const rawBalance = holdingTokens[tokenAddress];
                    const formattedBalance = (parseFloat(rawBalance) / Math.pow(10, decimals)).toString();

                    return {
                        [tokenAddress]: {
                            balance: {
                                raw: rawBalance,
                                formatted: formattedBalance
                            },
                            details: tokenDetails
                        }
                    };
                }
            } catch (err) {
                console.error(`Error fetching details for token ${tokenAddress}:`, err.response?.data || err.message);
                return { [tokenAddress]: null }; // Return null for tokens with errors
            }
        });

        // Wait for all token details to resolve
        const tokenDetails = await Promise.all(tokenDetailsPromises);

        // Combine balances and details
        const detailedTokens = tokenDetails.reduce((acc, detail) => {
            const tokenAddress = Object.keys(detail)[0];
            if (detail[tokenAddress]) {
                acc[tokenAddress] = detail[tokenAddress];
            } else {
                acc[tokenAddress] = {
                    balance: { raw: holdingTokens[tokenAddress], formatted: null },
                    details: null
                };
            }
            return acc;
        }, {});

        console.log("TOK:", detailedTokens)

        return res.status(200).json({ balances: detailedTokens });
    } catch (error) {
        console.error('Error fetching token balances or details:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
