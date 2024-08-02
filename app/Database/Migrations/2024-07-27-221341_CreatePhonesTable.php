<?php
// app/Database/Migrations/2024-07-27-000000_CreatePhonesTable.php
namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePhonesTable extends Migration {
    public function up() {

        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'sales' => [
                'type' => 'INT',
                'constraint' => '11',
            ],
            'growth' => [
                'type' => 'FLOAT',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('phones');

        // Inserindo dados reais ou próximos dos reais
        $data = [
            ['name' => 'iPhone 15 Pro Max', 'sales' => 500000, 'growth' => 5.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Samsung Galaxy S24 Ultra', 'sales' => 450000, 'growth' => 4.8, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'iPhone 14', 'sales' => 300000, 'growth' => -2.1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Samsung Galaxy A15 5G', 'sales' => 200000, 'growth' => 3.2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Samsung Galaxy A54', 'sales' => 180000, 'growth' => 1.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'iPhone 15', 'sales' => 250000, 'growth' => 6.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'OnePlus 11', 'sales' => 150000, 'growth' => 4.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Google Pixel 7 Pro', 'sales' => 130000, 'growth' => 3.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Xiaomi Mi 13', 'sales' => 170000, 'growth' => 2.9, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Oppo Find X6 Pro', 'sales' => 110000, 'growth' => 2.4, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'iPhone 13', 'sales' => 140000, 'growth' => -1.8, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Samsung Galaxy Z Flip 5', 'sales' => 90000, 'growth' => -3.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Huawei P50 Pro', 'sales' => 80000, 'growth' => -4.2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Realme GT 2 Pro', 'sales' => 70000, 'growth' => 2.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Sony Xperia 1 IV', 'sales' => 60000, 'growth' => 1.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Nokia X30', 'sales' => 50000, 'growth' => 0.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Asus ROG Phone 6', 'sales' => 45000, 'growth' => -0.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Vivo X80 Pro', 'sales' => 40000, 'growth' => -1.0, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'Motorola Edge 30 Ultra', 'sales' => 35000, 'growth' => -1.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['name' => 'LG Velvet', 'sales' => 30000, 'growth' => -2.5, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ];

        $this->db->table('phones')->insertBatch($data);
    }

    public function down() {
        $this->forge->dropTable('phones');
    }
}
