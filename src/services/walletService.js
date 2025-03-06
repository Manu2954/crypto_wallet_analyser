const axios = require("axios");

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
// const MORALIS_API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVhOTFlMDE3LTZiZWMtNDAwMS04MTRjLTVmNTk5Y2M0ZDVjMSIsIm9yZ0lkIjoiNDM1MTMyIiwidXNlcklkIjoiNDQ3NjI5IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI1YzdhYWUyNS1lYWI2LTQ5ZDItYWJkMi1lNDk2YTViN2RlZDUiLCJpYXQiOjE3NDEyOTk5MzMsImV4cCI6NDg5NzA1OTkzM30.XAvsZYhX2fRCuYqw4kPdjN46hAX-JyZMMBxCE_osBZI';
const BLOCKCYPHER_BASE_URL = "https://api.blockcypher.com/v1/ltc/main";

// Fetch transactions for EVM wallets (ETH, BSC, Polygon, etc.)
async function getEVMTransactions(walletAddress, chain = "eth") {
    try {
        const response = await axios.get(
            `https://deep-index.moralis.io/api/v2/${walletAddress}`,
            {
                headers: { "x-api-key": MORALIS_API_KEY },
                params: { chain, from_block: "0" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching EVM transactions:", error.response?.data || error.message);
        throw new Error("Failed to fetch EVM transactions.");
    }
}

// Fetch transactions for Litecoin wallets
async function getLTCTransactions(walletAddress) {
    try {
        const response = await axios.get(`${BLOCKCYPHER_BASE_URL}/addrs/${walletAddress}/full`);
        return response.data;
    } catch (error) {
        console.error("Error fetching LTC transactions:", error.response?.data || error.message);
        throw new Error("Failed to fetch LTC transactions.");
    }
}

module.exports = { getEVMTransactions, getLTCTransactions };
