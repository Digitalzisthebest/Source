<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit(json_encode(["error" => "Method Not Allowed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"])) {
    echo json_encode(["error" => "Missing username"]);
    exit;
}

$username = htmlspecialchars($data["username"], ENT_QUOTES, 'UTF-8');

$lua_file = 'Example.lua';
if (!file_exists($lua_file)) {
    echo json_encode(["error" => "File 'example.lua' not found"]);
    exit;
}

$lua_code = file_get_contents($lua_file);
if ($lua_code === false) {
    echo json_encode(["error" => "Failed to read example.lua"]);
    exit;
}

$lua_code = preg_replace('/username\s*=\s*"USERNAME"/', 'username = "' . $username . '"', $lua_code);

$cache_dir = __DIR__ . '/cache';
if (is_dir($cache_dir)) {
    $files = glob($cache_dir . '/*.lua');
    $now = time();
    foreach ($files as $file) {
        if (is_file($file)) {
            $file_mtime = filemtime($file);
            if ($file_mtime !== false && ($now - $file_mtime) > 3 * 60) {
                unlink($file);
            }
        }
    }
}

$random_filename = time() . '_' . bin2hex(random_bytes(5)) . '.lua';
if (!is_dir($cache_dir)) {
    mkdir($cache_dir, 0777, true);
}
$new_file_path = $cache_dir . '/' . $random_filename;

if (file_put_contents($new_file_path, $lua_code) === false) {
    echo json_encode(["error" => "Failed to write new Lua file"]);
    exit;
}

header("Location: /cache/" . $random_filename);
exit;
?>