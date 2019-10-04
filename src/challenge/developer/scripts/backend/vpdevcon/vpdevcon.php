<?php

include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "scripts" . DIRECTORY_SEPARATOR . "backend" . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "scripts" . DIRECTORY_SEPARATOR . "backend" . DIRECTORY_SEPARATOR . "veripieo" . DIRECTORY_SEPARATOR . "api.php";

accounts_database(__DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "files" . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "database.json");

$vpdevcon_database = null;

api("vpdevcon", function ($action, $parameters) {
    $user = accounts();
    if ($user !== null) {
        veripieo_load();
        if ($action === "information") {
            $developerID = veripieo_developer_exists($user->id);
            $info = new stdClass();
            $info->id = $developerID;
            return [true, $info];
        } else if ($action === "register") {
            if (isset($parameters->name) && isset($parameters->description) && isset($parameters->url)) {
                veripieo_developer_register($user->id, $parameters->name, $parameters->description, $parameters->url);
                return [true, null];
            }
            return [false, "Missing information"];
        }
    }
    return [false, "Authentication error"];
}, false);

echo json_encode($result);

function vpdevcon_load()
{

}

function vpdevcon_save()
{

}