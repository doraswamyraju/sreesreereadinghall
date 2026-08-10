<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM pricing_plans ORDER BY id ASC");
    $plans = $stmt->fetchAll();
    echo json_encode(["status" => "success", "data" => $plans]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['plan_id']) || !isset($input['price_monthly'])) {
        echo json_encode(["status" => "error", "message" => "Invalid parameters"]);
        exit();
    }
    
    $priceDaily = isset($input['price_daily']) ? $input['price_daily'] : round($input['price_monthly'] / 15);
    
    $stmt = $pdo->prepare("UPDATE pricing_plans SET price_monthly = ?, price_daily = ? WHERE id = ?");
    $stmt->execute([$input['price_monthly'], $priceDaily, $input['plan_id']]);
    
    echo json_encode(["status" => "success", "message" => "Pricing plan updated successfully"]);
}
