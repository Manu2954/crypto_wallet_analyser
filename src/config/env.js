require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY
};
