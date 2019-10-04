<?php

include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "base" . DIRECTORY_SEPARATOR . "api.php";

const REPOSITORIES_DIRECTORY = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "repositories";

const VERIPIEO_DATABASE = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "files" . DIRECTORY_SEPARATOR . "veripieo" . DIRECTORY_SEPARATOR . "database.json";

$veripieo_database = null;

function veripieo_device_link($deviceID, $developerID)
{
    global $veripieo_database;
    if ($veripieo_database !== null) {
        if (isset($veripieo_database->developers->$developerID)) {
            $veripieo_database->devices->$deviceID = $developerID;
            veripieo_save();
            return true;
        }
    }
    return false;
}

function veripieo_developer_exists($userID)
{
    global $veripieo_database;
    if ($veripieo_database !== null) {
        foreach ($veripieo_database->developers as $id => $developer) {
            if ($developer->user === $userID)
                return $id;
        }
    }
    return null;
}

function veripieo_developer_register($userID, $name, $description, $link)
{
    global $veripieo_database;
    if ($veripieo_database !== null) {
        $id = random(16);
        $developer = new stdClass();
        $developer->name = $name;
        $developer->description = $description;
        $developer->user = $userID;
        $developer->image = null;
        $developer->link = $link;
        $veripieo_database->developers->$id = $developer;
        veripieo_save();
    }
}

function veripieo_create_app($appName, $appDescription, $appVersion, $developerID)
{
    global $veripieo_database;
    if ($veripieo_database !== null) {
        if (isset($veripieo_database->developers->$developerID)) {
            $developerRepository = REPOSITORIES_DIRECTORY . DIRECTORY_SEPARATOR . $developerID;
            if (!file_exists($developerRepository))
                mkdir($developerRepository);
            $appFound = false;
            $apps = glob($developerRepository . DIRECTORY_SEPARATOR . "*", GLOB_ONLYDIR);
            foreach ($apps as $app) {
                if (json_decode(file_get_contents($app . DIRECTORY_SEPARATOR . "app.json"))->name === $appName)
                    $appFound = true;
            }
            if (!$appFound) {
                $id = random(10);
                $appDirectory = $developerRepository . DIRECTORY_SEPARATOR . $id;
                $app = new stdClass();
                $app->id = $id;
                $app->name = $appName;
                $app->description = $appDescription;
                $app->developer = $veripieo_database->developers->$developerID->name;
                $app->version = $appVersion;
                mkdir($appDirectory);
                file_put_contents($appDirectory . DIRECTORY_SEPARATOR . "app.json", json_encode($app));
                return $id;
            }
        }
    }
    return null;
}

function veripieo_upload_developer_photo_temporary($developerID, $fileName, $base64)
{

}

function veripieo_upload_developer_photo($developerID, $fileName, $base64)
{

}

function veripieo_upload_app_directory($developerID, $appID)
{
    global $veripieo_database;
    if ($veripieo_database !== null) {
        if (isset($veripieo_database->developers->$developerID)) {
            $appDirectory = REPOSITORIES_DIRECTORY . DIRECTORY_SEPARATOR . $developerID . DIRECTORY_SEPARATOR . $appID;
            if (file_exists($appDirectory)) {
                return $appDirectory;
            }
        }
    }
    return null;
}

function veripieo_upload_app_html($developerID, $appID, $html)
{
    $appDirectory = veripieo_upload_app_directory($developerID, $appID);
    if ($appDirectory !== null)
        file_put_contents($appDirectory . DIRECTORY_SEPARATOR . "app.html", $html);
    return $appDirectory !== null;
}

function veripieo_upload_app_javascript($developerID, $appID, $javascript)
{
    $appDirectory = veripieo_upload_app_directory($developerID, $appID);
    if ($appDirectory !== null)
        file_put_contents($appDirectory . DIRECTORY_SEPARATOR . "app.js", $javascript);
    return $appDirectory !== null;
}

function veripieo_upload_app_icon($developerID, $appID, $base64)
{
    $appDirectory = veripieo_upload_app_directory($developerID, $appID);
    if ($appDirectory !== null)
        file_put_contents($appDirectory . DIRECTORY_SEPARATOR . "app.png", base64_decode($base64));
    return $appDirectory !== null;
}

function veripieo_load()
{
    global $veripieo_database;
    $veripieo_database = json_decode(file_get_contents(VERIPIEO_DATABASE));
}

function veripieo_save()
{
    global $veripieo_database;
    file_put_contents(VERIPIEO_DATABASE, json_encode($veripieo_database));
}