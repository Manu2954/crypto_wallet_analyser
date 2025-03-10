const express = require("express");
const { getWalletBalance, getRecentTransactions, getTokenHoldings } = require("../services/walletService");

const router = express.Router();

// Helper function for standardizing API responses
function sendResponse(res, success, data = null, error = null, statusCode = 200) {
    res.status(statusCode).json({ success, data, error });
}

// Validate Ethereum address function
function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Route to fetch wallet balance
router.get("/balance/:address", async (req, res) => {
    try {
        const { address } = req.params;
        if (!isValidAddress(address)) return sendResponse(res, false, null, 'Invalid wallet address', 400);

        const balance = await getWalletBalance(address);
        if (balance.error) throw new Error(balance.error); 
        // console.log(balance)
        sendResponse(res, true, { balance });
    } catch (error) {
        console.log(error)
        sendResponse(res, false, null, 'Internal server error', 500);
    }
});

router.get("/tokens/:address", async (req, res)=>{
    try {
        const { address } = req.params;
        if (!isValidAddress(address)) return sendResponse(res, false, null, 'Invalid wallet address', 400);

        const chain = req.query.chain || '0x1';
        const tokenData = await getTokenHoldings(address, chain);
        if (tokenData.error) return sendResponse(res, false, null, tokenData.error, 500);

        sendResponse(res, true, { tokens: tokenData });
    } catch (error) {
        sendResponse(res, false, null, 'Internal server error', 500);
    }
})

router.get("/transactions/:address", async (req, res)=>{
    try {
        const { address } = req.params;
        if (!isValidAddress(address)) return sendResponse(res, false, null, 'Invalid wallet address', 400);

        const transactions = await getRecentTransactions(address);
        sendResponse(res, true, { transactions });
    } catch (error) {
        sendResponse(res, false, null, 'Internal server error', 500);
    }

})  

module.exports = router;
