<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM seats ORDER BY id ASC");
    $seats = $stmt->fetchAll();
    echo json_encode(["status" => "success", "data" => $seats]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['seat_id']) || !isset($input['status'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit();
    }
    
    $stmt = $pdo->prepare("UPDATE seats SET status = ? WHERE id = ?");
    $stmt->execute([$input['status'], $input['seat_id']]);
    
    echo json_encode(["status" => "success", "message" => "Seat status updated"]);
}
