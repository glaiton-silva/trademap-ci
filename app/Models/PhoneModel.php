<?php

namespace App\Models;

use CodeIgniter\Model;

class PhoneModel extends Model
{
    protected $table = 'phones';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'sales', 'growth'];
}
