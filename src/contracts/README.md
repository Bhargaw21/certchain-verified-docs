
# E-Certify Smart Contracts

This directory contains the Solidity smart contracts used by the E-Certify platform for blockchain verification of certificates.

## CertificateRegistry.sol

The main smart contract that handles registration and verification of certificate hashes on the Ethereum blockchain.

### Key Functions

- `registerCertificate(bytes32 certificateHash)`: Registers a new certificate hash on the blockchain
- `verifyCertificate(bytes32 certificateHash)`: Verifies if a certificate hash exists on the blockchain
- `getCertificateDetails(bytes32 certificateHash)`: Returns details about a registered certificate

### Deployment

For a production environment, this contract would be deployed to:

1. An Ethereum testnet like Goerli or Mumbai for testing
2. The Ethereum mainnet for production use

### Interacting with the Contract

The contract is designed to be interacted with using the ethers.js library from the application. See the blockchain utilities in `src/utils/blockchain.ts` for implementation details.

## Future Enhancements

- Certificate revocation functionality
- Batch registration for multiple certificates
- Role-based permissions for different types of issuers
- Upgradable contract pattern for future improvements
