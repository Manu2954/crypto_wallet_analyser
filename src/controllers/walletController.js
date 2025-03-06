// const { getWalletTransactions } = require('../services/moralisService')
const { getEVMTransactions, getLTCTransactions } = require("../services/walletService");

async function fetchTransactions(req, res) {
    try {
        const { address, chain } = req.body;

        if (!address) {
            return res.status(400).json({ error: "Wallet address is required." });
        }

        let transactions;
        if (chain === "ltc") {
            transactions = await getLTCTransactions(address);
        } else {
            transactions = await getEVMTransactions(address, chain);
        }

        res.json({ address, chain, transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { fetchTransactions };
