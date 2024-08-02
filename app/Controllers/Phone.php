<?php 

// app/Controllers/Phone.php
namespace App\Controllers;

use App\Models\PhoneModel;
use CodeIgniter\RESTful\ResourceController;

class Phone extends ResourceController {
    protected $modelName = 'App\Models\PhoneModel';
    protected $format = 'json';

    public function index() {
        return $this->respond($this->model->findAll());
    }
}