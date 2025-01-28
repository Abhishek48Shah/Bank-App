<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$allowed_origin = 'http://localhost:5173';

error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header("Access-Control-Allow-Origin: " . $allowed_origin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'my_database';

// Retrieve secret key from environment variable
// $secretKey = getenv('JWT_SECRET_KEY'); // Store securely in your environment
$secretKey =bin2hex(random_bytes(32));
try {
    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    // error_log("Received login request: " . $json);
    $json = file_get_contents('php://input');
    if (!$json) {q
        throw new Exception("No data received");
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON data: " . json_last_error_msg());
    }

    // Sanitize and validate inputs
    if (!isset($data['email']) || trim($data['email']) === '') {
        throw new Exception("Email is required");
    }
    if (!isset($data['password']) || trim($data['password']) === '') {
        throw new Exception("Password is required");
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    // Fetch user from database
    $stmt = $conn->prepare("
        SELECT id, first_name, last_name, email, phone_number, address, username, password_hash, role 
        FROM users 
        WHERE email = ?
        UNION
        SELECT id, NULL as first_name, NULL as last_name, email, NULL as phone_number, NULL as address, NULL as username, password_hash, role
        FROM admin WHERE email = ?
    ");
    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("User not found");
    }

    $user = $result->fetch_assoc();

    // Verify password securely
    if (!password_verify($password, $user['password_hash'])) {
        throw new Exception("Invalid password");
    }

    // Prepare response
    $response = [
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'firstName' => htmlspecialchars($user['first_name'] ?? ''),
            'lastName' => htmlspecialchars($user['last_name'] ?? ''),
            'email' => htmlspecialchars($user['email']),
            'phoneNumber' => htmlspecialchars($user['phone_number'] ?? ''),
            'address' => htmlspecialchars($user['address'] ?? ''),
            'userName' => htmlspecialchars($user['username'] ?? ''),
            'role' => htmlspecialchars($user['role'])
        ]
    ];

    // If the user is not an admin, send a JWT token
    if ($user['role'] !== 'admin') {
        $jwt = JWT::encode([
            'user_id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'exp' => time() + 3600 // 1 hour expiration
        ], $secretKey, 'HS256');

        $response['token'] = $jwt;
    }

    echo json_encode($response);

} catch (Exception $e) {
    error_log('Login error: ' . $e->getMessage());

    http_response_code(401); // Unauthorized
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
} 