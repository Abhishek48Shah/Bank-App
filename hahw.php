<?php
require_once 'vendor/autoload.php'; // This loads all installed packages

use Firebase\JWT\JWT;

// Your secret key for encoding and decoding JWTs
$secretKey = 'your-secret-key';

// Payload data
$payload = [
    'user_id' => 123,
    'username' => 'john_doe',
    'exp' => time() + 3600 // 1 hour expiration
];

// Generate JWT
$jwt = JWT::encode($payload, $secretKey, 'HS256');
echo "Generated JWT: " . $jwt;
