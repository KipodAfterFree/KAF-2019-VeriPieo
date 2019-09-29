<?php

include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "base" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "scripts" . DIRECTORY_SEPARATOR . "backend" . DIRECTORY_SEPARATOR . "veripieo" . DIRECTORY_SEPARATOR . "api.php";

$vpdevcon_database = null;

api("vpdevcon", function ($action, $parameters) {
    $user = accounts();
    if ($user !== null) {
        if($action === "information"){

        }
    }
    return [false, "Authentication error"];
}, false);

echo json_encode($result);

function vpdevcon_load(){

}

function vpdevcon_save(){

}