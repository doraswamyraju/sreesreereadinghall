<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$dataFile = $dataDir . '/pricing.json';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        echo $content;
    } else {
        echo json_encode(["status" => "empty", "data" => null]);
    }
    exit();
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    if (!$input) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Empty body"]);
        exit();
    }
    
    // Validate JSON
    $decoded = json_decode($input, true);
    if ($decoded === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
        exit();
    }
    
    file_put_contents($dataFile, $input);
    echo json_encode(["status" => "success", "message" => "Pricing plans successfully updated"]);
    exit();
}
