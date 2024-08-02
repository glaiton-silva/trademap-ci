<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/addPhone', 'PhoneController::add');
$routes->post('/updatePhone/(:num)', 'PhoneController::update/$1');
$routes->delete('/deletePhone/(:num)', 'PhoneController::delete/$1');

$routes->resource('phone');
