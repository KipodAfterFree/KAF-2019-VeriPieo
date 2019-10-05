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
            global $veripieo_database;
            $developerID = veripieo_developer_exists($user->id);
            $info = new stdClass();
            $info->id = $developerID;
            if ($developerID !== null) {
                $info->name = $veripieo_database->developers->$developerID->name;
                $info->description = $veripieo_database->developers->$developerID->description;
                $info->link = $veripieo_database->developers->$developerID->link;
            }
            return [true, $info];
        } else if ($action === "register") {
            if (isset($parameters->name) && isset($parameters->description) && isset($parameters->url)) {
                veripieo_developer_register($user->id, $parameters->name, $parameters->description, $parameters->url);
                return [true, null];
            }
            return [false, "Missing information"];
        } else if ($action === "publish") {
            if (isset($parameters->name) && isset($parameters->description) && isset($parameters->version) && isset($parameters->html) && isset($parameters->js) && isset($parameters->png)) {
                $developerID = veripieo_developer_exists($user->id);
                if ($developerID !== null) {
                    $id = veripieo_create_app($parameters->name, $parameters->description, $parameters->version, $developerID);
                    veripieo_upload_app_html($developerID, $id, $parameters->html);
                    veripieo_upload_app_javascript($developerID, $id, $parameters->js);
                    veripieo_upload_app_icon($developerID, $id, $parameters->png);
                    return [true, null];
                }
                return [false, "Unregistered developer"];
            }
            return [false, "Missing information"];
        } else if ($action === "preview") {
            if (isset($parameters->base64)) {
                $developerID = veripieo_developer_exists($user->id);
                if ($developerID !== null) {
                    veripieo_upload_developer_photo_temporary($developerID, $parameters->base64);
                    return [true, $developerID . ".png"];
                }
                return [false, "Unregistered developer"];
            }
            return [false, "Missing information"];
        } else if ($action === "update") {
            if (isset($parameters->picture) && isset($parameters->name) && isset($parameters->description) && isset($parameters->url)) {
                $developerID = veripieo_developer_exists($user->id);
                if ($developerID !== null) {
                    veripieo_developer_update($developerID, $parameters->name, $parameters->description, $parameters->url, $parameters->picture);
                    return [true, null];
                }
                return [false, "Unregistered developer"];
            }
            return [false, "Missing information"];
        }
    }
    return [false, "Authentication error"];
}, false);

echo json_encode($result);