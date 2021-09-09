<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

const ROOT_FOLDER = __DIR__ . '/../';

$loader = require ROOT_FOLDER . 'vendor/autoload.php';

$router = new \Bramus\Router\Router();

$router->get('/', 'App\Controller@default');
$router->post('/registration', 'App\Controller@registration');

$router->run();