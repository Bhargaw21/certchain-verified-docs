# E-Certify: Blockchain-Verified Certificate Platform

E-Certify is a full-stack web application for creating, issuing, and verifying digital certificates using blockchain technology. The platform ensures certificate authenticity through Ethereum blockchain verification.

## 🔑 Key Features

- **Secure Authentication**: Role-based access for admins and regular users
- **Certificate Generation**: Create and customize digital certificates
- **Blockchain Verification**: Store certificate hashes on Ethereum for immutable verification
- **QR Code Integration**: Each certificate includes a unique QR code for easy verification
- **Responsive Design**: Modern UI that works on all devices

## 👥 User Roles

- **Admin**: Generate and issue new certificates
- **User**: Verify certificates using QR codes or certificate IDs

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Ethereum wallet (for blockchain interaction)

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd e-certify

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Usage

### Demo Accounts

For testing purposes, you can use the following demo accounts:

- **Admin**: admin@ecertify.com / admin123
- **User**: user@ecertify.com / user123

### Verifying Certificates

1. Navigate to the "Verify Certificate" page
2. Scan the QR code on a certificate or enter the certificate ID
3. View the verification status and certificate details

### Issuing Certificates (Admin Only)

1. Log in as an admin
2. Go to the Admin Dashboard
3. Click "Issue New Certificate"
4. Fill out the certificate details and submit

## 🔗 Blockchain Integration

The platform uses Ethereum smart contracts to store and verify certificate hashes:

- Certificate data is hashed using SHA-256
- Hashes are stored on the Ethereum blockchain
- Verification checks the hash against the blockchain record

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Smart Contracts**: Solidity (Ethereum)
- **Blockchain Integration**: ethers.js
- **Authentication**: JWT-based
- **PDF Generation**: react-pdf
- **QR Code**: qrcode.react

## 📱 Pages

- **Home**: Landing page with platform overview
- **Login/Register**: Authentication pages
- **Admin Dashboard**: Certificate issuance and management
- **Certificate Viewer**: Detailed certificate view with verification status
- **Verification**: QR code scanning and certificate verification

## 🧪 Future Enhancements

- Actual blockchain integration with Ethereum testnet (Goerli/Mumbai)
- Email notifications for certificate issuance
- Certificate revocation functionality
- Batch certificate issuance
- Integration with educational institution APIs
