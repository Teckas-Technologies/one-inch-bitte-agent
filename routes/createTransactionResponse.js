const express = require('express');
const router = express.Router();
const { signRequestFor } = require('@bitte-ai/agent-sdk');
const { parseEther } = require('viem');

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;

router.get("/", async (req, res) => {
    try {
        const { to, amount } = req.query;

        if (!to || !amount) {
            console.log(`to: ${to}\namount: ${amount}`);
            return res.status(400).json({ error: '"to" and "amount" are required parameters' });
        }

        // Create EVM transaction object
        const transaction = {
            to: to,
            value: parseEther(amount.toString()).toString(), // remove decimals
            data: '0x',
        };

        const signRequestTransaction = signRequestFor({
            chainId: 1,
            metaTransactions: [transaction],
        });

        res.status(200).json({ evmSignRequest: signRequestTransaction });
    } catch (error) {
        console.error('Error generating EVM transaction:', error);
        res.status(500).json({ error: 'Failed to generate EVM transaction' });
    }
});

module.exports = router;
