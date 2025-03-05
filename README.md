This project implements a decentralized profile management system built on the Ethereum blockchain. It allows users to create, read, and update their profiles with data stored both on-chain and off-chain for optimal performance and cost efficiency.

### Key Features:
- **Blockchain Integration**: Profile data is stored on the Ethereum blockchain, ensuring transparency and immutability
- **Wallet Authentication**: Users authenticate using their Ethereum wallet addresses
- **Gas Optimization**: Smart contract designed for minimal gas consumption
- **Real-time Updates**: Profile changes are reflected immediately both on-chain and in the UI

### Technical Stack:
- Frontend: Next.js
- Blockchain: Ethereum (EVM compatible)
- Smart Contracts: Solidity
- Web3 Integration: ethers.js/web3.js
- Authentication: Wallet Connect / MetaMask

### Blockchain Interaction:
- **Create Profile**: Creates a new profile entry in the smart contract, associating it with the user's wallet address
- **Get Profile**: Retrieves profile data from the blockchain using the profile ID
- **Update Profile**: Modifies existing profile data through a smart contract transaction

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## API Documentation

### Profile Endpoints

Each endpoint interacts with the Ethereum blockchain through smart contracts. All write operations (create and update) require gas fees and wallet signatures.

#### Create Profile
```http
POST /api/create-profile
```

Creates a new profile and stores it on the Ethereum blockchain. Requires a connected wallet for transaction signing.

Request body:
```json
{
  "name": "Andy",
  "email": "bungandy@gmail.com",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Andy",
  "email": "bungandy@gmail.com",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "createdAt": "2025-03-19T08:30:00Z"
}
```

#### Get Profile
```http
GET /api/get-profile?walletAddress={address}
```

Retrieves profile data from the blockchain. This is a read-only operation that doesn't require gas fees.

Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Andy",
  "email": "bungandy@gmail.com",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "createdAt": "2025-03-19T08:30:00Z"
}
```

#### Update Profile
```http
PUT /api/update-profile
```

Updates an existing profile on the blockchain. Requires wallet signature and gas fees for the transaction.

Request body:
```json
{
    "name": "Andy",
    "email": "bungandy@gmail.com",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Andy",
  "email": "bungandy@gmail.com",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "updatedAt": "2025-03-19T08:30:00Z"
}
```

### Security Considerations
- All write operations require valid wallet signatures
- Profile updates can only be performed by the wallet owner
- Smart contract includes access control mechanisms
- Gas fees are required for create and update operations
