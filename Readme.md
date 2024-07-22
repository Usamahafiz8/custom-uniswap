# Uniswap Project

This project demonstrates the usage of Uniswap V2 to swap tokens using a smart contract. The project uses Truffle for development and testing, and Ganache CLI for forking the Ethereum mainnet.

## Prerequisites

- Node.js (v12.x or later)
- npm or yarn
- Truffle
- Ganache CLI
- An Infura project ID
- A mnemonic phrase for HDWalletProvider
- Whale account addresses with sufficient token balances for testing

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Usamahafiz8/custom-uniswap.git
   cd custom-uniswap
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Install Ganache CLI globally**:
   ```sh
   npm install -g ganache-cli
   ```

## Configuration

1. **Create a `.env` file** in the project root and add the following environment variables:
   ```sh
   WEB3_INFURA_PROJECT_ID=your_infura_project_id
   ARCHIVE_NODE_API_KEY=your_archive_node_api_key
   ```



## Running the Project

1. **Start Ganache CLI with mainnet forking**:
   ```sh
   set WEB3_INFURA_PROJECT_ID=your_infura_project_id
   set ARCHIVE_NODE_API_KEY=your_archive_node_api_key
   ganache-cli --fork https://mainnet.infura.io/v3/%WEB3_INFURA_PROJECT_ID% --unlock %LOCAL_ACCOUNT% --networkId 999
   ```

2. **Compile the contracts**:
   ```sh
   npx truffle compile
   ```

3. **Run the tests**:
   ```sh
   npx truffle test --network mainnet_fork test/test-uniswap.js
   ```

## Project Structure

- `contracts/`: Contains the smart contracts
  - `TestUniswap.sol`: Smart contract to perform token swaps on Uniswap V2
  - `interfaces/Uniswap.sol`: Interface for Uniswap contracts
- `migrations/`: Truffle migration scripts
- `test/`: Test scripts
  - `test-uniswap.js`: Test script for the `TestUniswap` contract
- `config.js`: Configuration file for token addresses and local account
- `.env`: Environment variables file

## Additional Information

- Ensure you have sufficient balances of the input tokens in your local account.
- Adjust the `AMOUNT_IN` variable in the test script to fit within the balance limits.

## Troubleshooting

- If you encounter errors related to insufficient balances, ensure your local account has enough token balances.
- Ensure the Infura project ID and mnemonic phrase are correctly set in the `.env` file.

## License

This project is licensed under the MIT License.
