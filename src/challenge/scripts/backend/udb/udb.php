<?php
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "base" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "api.php";

const UDB_DATABASE = __DIR__ . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . "database.json";

$udb_database = null;

// Load app for the user
api("udb", function ($action, $parameters) {
    $user = accounts();
    if ($user !== null) {
        if ($action === "write") {
            if (isset($parameters->id)) {
                if (isset($parameters->key) && isset($parameters->value)) {
                    return [true, udb_write($user->id, $parameters->id, $parameters->key, $parameters->value)];
                } else {
                    return [false, "Missing parameters"];
                }
            } else {
                return [false, "Missing id"];
            }
        } else if ($action === "read") {
            if (isset($parameters->id)) {
                if (isset($parameters->key) && isset($parameters->value)) {
                    return [true, udb_read($user->id, $parameters->id, $parameters->key)];
                } else {
                    return [false, "Missing parameters"];
                }
            } else {
                return [false, "Missing id"];
            }
        }
        return [false, "Unknown action"];
    }
    return [false, "Authentication failure"];
});

echo json_encode($result);

function udb_write($userId, $appId, $key, $value)
{
    $database = udb_load();
    if (!isset($database->$userId))
        $database->$userId = new stdClass();
    if (!isset($database->$userId->$appId))
        $database->$userId->$appId = new stdClass();
    $database->$userId->$appId->$key = $value;
    udb_unload($database);
    return true;
}

function udb_read($userId, $appId, $key)
{
    $database = udb_load();
    if (!isset($database->$userId))
        if (!isset($database->$userId->$appId))
            if (!isset($database->$userId->$appId->$key))
                return $database->$userId->$appId->$key;
    return null;
}

function udb_unload($database)
{
    file_put_contents(UDB_DATABASE, json_encode($database));
}

function udb_load()
{
    return json_decode(file_get_contents(UDB_DATABASE));
}