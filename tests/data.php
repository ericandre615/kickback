<?php

$data = file_get_contents('data.json');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo $data;
?>
