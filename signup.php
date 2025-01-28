<?php
// Include the JWT library (make sure you have installed it or included it correctly)
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

try {
    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $json = file_get_contents('php://input');
    if (!$json) {
        throw new Exception("No data received");
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON data: " . json_last_error_msg());
    }

    error_log('Received data: ' . print_r($data, true));

    $requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'date',
        'address',
        'userName',
        'password'
    ];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            throw new Exception("Field '$field' is required");
        }
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $data['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        throw new Exception("Email already registered");
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $data['userName']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        throw new Exception("Username already taken");
    }

    $firstName = htmlspecialchars(strip_tags($data['firstName']));
    $lastName = htmlspecialchars(strip_tags($data['lastName']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phoneNumber = preg_replace("/[^0-9]/", "", $data['phoneNumber']);
    $date = date('Y-m-d', strtotime($data['date']));
    $address = htmlspecialchars(strip_tags($data['address']));
    $username = htmlspecialchars(strip_tags($data['userName']));
    $password = $data['password'];

    if (strlen($phoneNumber) !== 10) {
        throw new Exception("Phone number must be exactly 10 digits");
    }

    if (!strtotime($date) || strtotime($date) > time()) {
        throw new Exception("Invalid date of birth");
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    if ($passwordHash === false) {
        throw new Exception("Password hashing failed");
    }

    $conn->begin_transaction();

    $stmt = $conn->prepare("
        INSERT INTO users (
            first_name, last_name, email, phone_number,
            date_of_birth, address, username, password_hash, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'user')
    ");

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param(
        "ssssssss",
        $firstName,
        $lastName,
        $email,
        $phoneNumber,
        $date,
        $address,
        $username,
        $passwordHash
    );

    if (!$stmt->execute()) {
        throw new Exception("User creation failed: " . $stmt->error);
    }

    $userId = $conn->insert_id;

    // Create default savings account
    $accountNumber = mt_rand(1000000000, 9999999999);

    $stmt = $conn->prepare("
        INSERT INTO accounts (user_id, account_number, account_type)
        VALUES (?, ?, 'savings')
    ");

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("is", $userId, $accountNumber);

    if (!$stmt->execute()) {
        throw new Exception("Account creation failed: " . $stmt->error);
    }

    $conn->commit();

    // Generate JWT token
    $secretKey = bin2hex(random_bytes(32)); // This should be kept secret
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // jwt valid for 1 hour from the issued time
    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'userId' => $userId,
        'role' => 'user'
    ];

    $jwt = JWT::encode($payload, $secretKey,'HS256');

    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully',
        'token' => $jwt,  // Include the token in the response
        'user' => [
            'id' => $userId,
            'role' => 'user'
        ]
    ]);
} catch (Exception $e) {
    error_log('Error in signup: ' . $e->getMessage());

    if (isset($conn) && !$conn->connect_error) {
        $conn->rollback();
    }

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
