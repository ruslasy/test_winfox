<?php

namespace App;



class Controller
{
    public function default(): void
    {
        echo file_get_contents(__DIR__. '/template/index.html');
    }

    public function registration(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['email']) || !isset($data['firstname']) || !isset($data['lastname'])) {
            http_response_code(400);
            exit;
        }

        $con = DataBase::getConnect();

        $sql = 'INSERT INTO users (email, firstname, lastname) VALUES (:email, :firstname, :lastname);';
        $stmt = $con->prepare($sql);
        $res = $stmt->execute([
            'email' => $data['email'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
        ]);

        if ($res === false) {
            http_response_code(400);
            $data = [
                'message' => 'Пользователь с таким Email уже существует',
            ];
            echo json_encode($data);
            exit;
        }

        $response = [
            'message' => 'Пользователь с Email ' . $data['email'] . ' успешно зарегистрирован',
        ];

        echo json_encode($response);
    }
}