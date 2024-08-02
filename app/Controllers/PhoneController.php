<?php

namespace App\Controllers;

use App\Models\PhoneModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

/**
 * PhoneController
 * 
 * Este controlador lida com operações CRUD para telefones.
 */
class PhoneController extends ResourceController
{
    use ResponseTrait;

    /**
     * Adiciona um novo telefone.
     *
     * @return \CodeIgniter\HTTP\Response
     */
    public function add()
    {
        $phoneModel = new PhoneModel();
        $data = $this->request->getJSON(true);

        if ($phoneModel->insert($data)) {
            return $this->respond(['status' => 'success', 'message' => 'Phone added successfully']);
        } else {
            return $this->fail('Failed to add phone');
        }
    }

    /**
     * Deleta um telefone existente.
     *
     * @param int|null $id ID do telefone a ser deletado.
     * @return \CodeIgniter\HTTP\Response
     */
    public function delete($id = null)
    {
        $phoneModel = new PhoneModel();

        if ($phoneModel->delete($id)) {
            return $this->respond(['status' => 'success', 'message' => 'Phone deleted successfully']);
        } else {
            return $this->fail('Failed to delete phone');
        }
    }

    /**
     * Atualiza os dados de um telefone existente.
     *
     * @param int|null $id ID do telefone a ser atualizado.
     * @return \CodeIgniter\HTTP\Response
     */
    public function update($id = null)
    {
        $phoneModel = new PhoneModel();
        $data = $this->request->getJSON(true);

        if ($phoneModel->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Phone data updated successfully']);
        } else {
            return $this->fail('Failed to update phone data');
        }
    }
}
