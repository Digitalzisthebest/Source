<?php
if ($_SERVER['REQUEST_URI'] === '/favicon.ico') {
    header('Content-Type: image/jpeg'); // Đổi thành image/jpeg nếu dùng JPG
    readfile(__DIR__ . '/assets/images/favicon.jpg'); // Đường dẫn đến file PNG hoặc JPG
    exit;
}
?>
