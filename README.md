# 1-Inch Node.js API for Bitte AI Plugin

## Introduction

The 1-Inch Node.js API for the Bitte AI Plugin enables seamless interaction between users and 1-Inch APIs through an AI-powered interface. This API supports a wide range of blockchain-related functionalities, including wallet balance fetching, portfolio management, transaction tracking, and real-time updates.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://tinyurl.com/one-inch-assistant)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Teckas-Technologies/one-inch-bitte-agent)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-MMake%201-Inch%20Operations%20Easier-orange)](#)
[![Tools](https://img.shields.io/badge/Tools-web3.js%2C%20big.js-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js-blue)](#)

**Author:**

[![Author](https://img.shields.io/badge/Follow-Teckas%20Technologies-blue?style=social&logo=linkedin)](https://www.linkedin.com/company/teckas/) [![Organization](https://img.shields.io/badge/Teckas%20Technologies-blue)](https://teckastechnologies.com/)

## Key Features

- **Wallet Balance Fetching**: Retrieve wallet balances, including detailed token information.
- **Portfolio Management**: Analyze token holdings, profit/loss, and portfolio performance in real-time.
- **Transaction Tracking**: Track orders and transactions by wallet address or specific order hash.
- **Real-Time Updates**: Get instant updates on portfolio values and transaction statuses

## User Flow

1. **Fetch Wallet Balances:**  
  Retrieve the user's wallet balances along with token details.

    - **Endpoint**: GET /api/balance
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns an object containing the balances and token details.

2. **Fetch Orders from the Order Book:**  
  Retrieve the list of orders for a user.

    - **Endpoint**: GET /api/orderbook
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns an array of orders linked to the wallet address.

3. **Fetch Specific Order Details:**  
  Retrieve details of a specific order using its hash.

    - **Endpoint**: GET /api/orderbook/order
    - **Parameters**:
      - orderHash (string): The hash of the specific order.
    - **Response**:
      - Returns the details of the requested order.

4. **Fetch Order Events**  
  Retrieve the status of an order (e.g., filled, canceled) using its hash.

    - **Endpoint**: GET /api/orderbook/events
    - **Parameters**:
      - orderHash (string): The hash of the specific order.
    - **Response**:
      - Returns an object containing event details for the order.

5. **Fetch Wallet History:**  
  Retrieve the transaction history for a specific wallet address.

    - **Endpoint**: GET /api/history
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns a list of transaction details for the given wallet address.

6. **Fetch Token Holdings:**  
  Retrieve the list of tokens held in the user's portfolio.

    - **Endpoint**: GET /api/portfolio/holdings
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns an array of tokens currently held by the wallet address.

7. **Fetch Portfolio Current Value:**  
  Retrieve the current value of the user's portfolio in USD.

    - **Endpoint**: GET /api/portfolio/current-value
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns the current total value of the portfolio in USD.

8. **Fetch Supported Chains:**  
  Retrieve the list of blockchain networks supported by the API.

    - **Endpoint**: GET /api/portfolio/supported-chains
    - **Response**:
      - Returns an object containing the list of supported blockchain networks.

9. **Analyze Portfolio Profit and Loss:**  
  Retrieve an analysis of the user's portfolio, including profit/loss and ROI details.

    - **Endpoint**: GET /api/portfolio/profit-and-loss
    - **Parameters**:
      - walletAddress (string): The EVM wallet address of the user.
    - **Response**:
      - Returns an object containing the profit/loss and ROI analysis for the user's portfolio.

10. **Fetch Maker Orders:**  
  Retrieve the list of orders created by a specific maker address.

    - **Endpoint**: GET /api/fusion-order/maker-orders
    - **Parameters**:
      - makerAddress (string): The EVM wallet address of the maker.
    - **Response**:
      - Returns an object containing the list of orders created by the maker.


## Conclusion

The **1-Inch Node.js API for Bitte AI Plugin** acts as a powerful backend solution, facilitating smooth blockchain operations for users. By leveraging the 1-Inch APIs and providing an AI-powered interface, this solution simplifies complex operations like wallet management, portfolio analysis, and transaction processing. Contributions and feedback from the community are welcome to enhance the functionality further.

## Step By Step

To get started with the 1-Inch AI Agent, follow these steps:

1. **Clone repository**
```bash
git clone https://github.com/Teckas-Technologies/one-inch-bitte-agent
cd one-inch-bitte-agent
```
2. **Install dependencies**
```bash
npm install
npm run start
```

## Usage

 In this template, we used the `1-inch API` for fetch the required information from the blockchain.

## Deployment
Follow these steps to deploy the 1-Inch AI Agent on Vercel:
- **Create an Account**: Sign up for an account on Vercel.
- **Connect GitHub**: Connect your GitHub account with Vercel.
- **Import Repository**: Import the GitHub repository of the project.
- **Add Environment Variables**: While configuring the project, add the necessary environment variables.
- **Deploy**: Click the deploy button.
- **Access Application**: Once the deployment is complete, you can access your application.
