<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM blogs ORDER BY published_at DESC");
    $blogs = $stmt->fetchAll();
    echo json_encode(["status" => "success", "data" => $blogs]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['title']) || empty($input['content'])) {
        echo json_encode(["status" => "error", "message" => "Title and content are required"]);
        exit();
    }
    
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title'])));
    $excerpt = !empty($input['excerpt']) ? $input['excerpt'] : substr(strip_tags($input['content']), 0, 150) . '...';
    $author = !empty($input['author']) ? $input['author'] : 'Sree Sree Admin';
    $category = !empty($input['category']) ? $input['category'] : 'Study Tips';
    $imageUrl = !empty($input['image_url']) ? $input['image_url'] : '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45.jpeg';
    $tags = !empty($input['tags']) ? implode(',', (array)$input['tags']) : 'Tirupati';
    
    $stmt = $pdo->prepare("INSERT INTO blogs (title, slug, category, excerpt, content, author, image_url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$input['title'], $slug, $category, $excerpt, $input['content'], $author, $imageUrl, $tags]);
    
    echo json_encode(["status" => "success", "message" => "Blog article published successfully"]);
}
