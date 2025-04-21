
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev Smart contract for registering and verifying certificate hashes on the Ethereum blockchain
 */
contract CertificateRegistry {
    address public owner;
    
    // Mapping from certificate hash to boolean indicating if it exists
    mapping(bytes32 => bool) private certificates;
    
    // Mapping from certificate hash to issuer address
    mapping(bytes32 => address) private issuers;
    
    // Mapping from certificate hash to timestamp
    mapping(bytes32 => uint256) private timestamps;
    
    // Events
    event CertificateRegistered(bytes32 indexed certificateHash, address indexed issuer, uint256 timestamp);
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Modifier to restrict function access to contract owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
    
    /**
     * @dev Register a new certificate hash on the blockchain
     * @param certificateHash The SHA-256 hash of the certificate data
     * @return success True if registration was successful
     */
    function registerCertificate(bytes32 certificateHash) external returns (bool success) {
        require(certificateHash != bytes32(0), "Certificate hash cannot be empty");
        require(!certificates[certificateHash], "Certificate already registered");
        
        certificates[certificateHash] = true;
        issuers[certificateHash] = msg.sender;
        timestamps[certificateHash] = block.timestamp;
        
        emit CertificateRegistered(certificateHash, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @dev Verify if a certificate hash exists on the blockchain
     * @param certificateHash The SHA-256 hash of the certificate data
     * @return exists True if the certificate exists
     */
    function verifyCertificate(bytes32 certificateHash) external view returns (bool exists) {
        return certificates[certificateHash];
    }
    
    /**
     * @dev Get details of a registered certificate
     * @param certificateHash The SHA-256 hash of the certificate data
     * @return exists True if the certificate exists
     * @return issuer Address of the certificate issuer
     * @return timestamp Unix timestamp when the certificate was registered
     */
    function getCertificateDetails(bytes32 certificateHash) 
        external 
        view 
        returns (bool exists, address issuer, uint256 timestamp) 
    {
        return (
            certificates[certificateHash],
            issuers[certificateHash],
            timestamps[certificateHash]
        );
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
