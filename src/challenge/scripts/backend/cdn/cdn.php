<?php
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "base" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "api.php";
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "veripieo" . DIRECTORY_SEPARATOR . "api.php";

const APPS_DIRECTORY = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "apps";
const ROOT_DIRECTORY = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "..";

set_time_limit(20);

api("cdn", function ($action, $parameters) {
    if ($action === "list") {
        $apps = array();
        $directories = glob(APPS_DIRECTORY . DIRECTORY_SEPARATOR . "*", GLOB_ONLYDIR);
        foreach ($directories as $i => $directory) {
            array_push($apps, "apps/" . basename($directory));
        }
        $user = accounts();
        if ($user !== null) {
            global $veripieo_database;
            veripieo_load();
            if (isset($veripieo_database->devices->{$user->id})) {
                $devid = $veripieo_database->devices->{$user->id};
                $directories = glob(REPOSITORIES_DIRECTORY . DIRECTORY_SEPARATOR . $devid . DIRECTORY_SEPARATOR . "*", GLOB_ONLYDIR);
                foreach ($directories as $i => $directory) {
                    array_push($apps, "repositories/" . $devid . "/" . basename($directory));
                }
            }
        }
        return [true, $apps];
    } else if ($action === "load") {
        if (isset($parameters->id)) {
            $app_directory = ROOT_DIRECTORY . DIRECTORY_SEPARATOR . $parameters->id;
            if (file_exists($app_directory)) {
                $files = new stdClass();
                $files->html = file_get_contents($app_directory . DIRECTORY_SEPARATOR . "app.html");
                $files->javascript = file_get_contents($app_directory . DIRECTORY_SEPARATOR . "app.js");
                $files->info = file_get_contents($app_directory . DIRECTORY_SEPARATOR . "app.json");
                return [true, $files];
            } else {
                return [false, "App does not exist"];
            }
        } else {
            return [false, "Missing id"];
        }
    }
    return [false, "Unknown action"];
});

echo json_encode($result);