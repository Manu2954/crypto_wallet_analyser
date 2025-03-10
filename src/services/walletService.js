// const { BigNumber } = require("moralis/common-core");

const Moralis = require("moralis").default;

// Fetch Wallet Balance
async function getWalletBalance(address, chain = "0x1") {
//   await initMoralis();

  try {
    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });

    return {
      address,
      balance: response.raw.balance / 1e18, // Convert Wei to ETH
      currency: "ETH",
    };

    // return response.toJSON();
  } catch (error) {
    console.error("Error fetching wallet balance:", error.message);
    return { error: "Failed to fetch wallet balance." };
  }
}

async function getTokenHoldings(address, chain = "0x1") {
//   await initMoralis();

  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });

    return response.raw.map((token) => ({
      name: token.name,
      symbol: token.symbol,
      balance: token.balance / Math.pow(10, token.decimals),
      decimals: token.decimals,
      contractAddress: token.token_address,
    }));

    // return response.raw;
  } catch (error) {
    console.error("Error fetching token holdings:", error.message);
    return { error: "Failed to fetch token holdings." };
  }
}

async function getRecentTransactions(address, chain = "0x1") {
//   await initMoralis();

  try {
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });
    // console.log(response.result[0]);

    return response.result.map((tx) => ({
      hash: tx.hash,
      from: tx._data.from._value || "Unknown",
      to: tx._data.to._value || "Unknown",
      value: tx._data.value.rawValue ? (Number(tx._data.value.rawValue) / 1e18).toFixed(6) + " ETH" : "0 ETH",
      gasUsed: tx._data.gasUsed,
      gasPrice: tx._data.value ? (Number(tx._data.value) / 1e9).toFixed(2) + " Gwei" : "N/A",
      timestamp: tx._data.blockTimestamp ? new Date(tx._data.blockTimestamp).toLocaleString() : "N/A",
      status: tx.receiptStatus === 1 ? "Success" : "Failed",

    }));

    //   return response;
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return { error: "Failed to fetch transactions." };
  }
}

module.exports = { getWalletBalance, getTokenHoldings, getRecentTransactions };
