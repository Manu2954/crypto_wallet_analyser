// const { getWalletTransactions } = require('../services/moralisService')
const { getEVMTransactions, filterBuySellTransactions, calculateROI } = require("../services/walletService");

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

const fetchAnalytics =  async (req, res) => {
    const { address, chain } = req.body;

    if (!address) {
        return res.status(400).json({ error: "Wallet address is required" });
    }

    try {
        const transactions = await getEVMTransactions(address, chain);
        // console.log(transactions.result)
        const { buys, sells } = filterBuySellTransactions(address, transactions.result);
        const { tradeResults } = calculateROI(buys, sells);
        // console.log(tradeRes)

        return res.json({ address, tradeResults, buys, sells });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// module.exports = router;

module.exports = { fetchTransactions, fetchAnalytics };
