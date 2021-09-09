<?php

namespace App;

use PDO;

class DataBase
{
    private static $dbConnect;
    
    public static function getConnect()
    {
        if (!self::$dbConnect) {
            //$config = require_once(ROOT_FOLDER . 'config.php');

            self::$dbConnect = new PDO(
                "mysql:host=vh2.eurobyte.ru;dbname=vh47575_test;charset=utf8",
                'vh47575_test',
                'test',
                [PDO::ATTR_PERSISTENT => true]
            );
        }

        return self::$dbConnect;
    }
}