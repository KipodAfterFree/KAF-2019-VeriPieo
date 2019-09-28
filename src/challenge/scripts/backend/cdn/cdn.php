<?php
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "base" . DIRECTORY_SEPARATOR . "api.php";

const APPS_DIRECTORY = __DIR__ . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . "apps";

api("cdn", function ($action, $parameters) {
    if ($action === "list") {
        $directories = glob(APPS_DIRECTORY . DIRECTORY_SEPARATOR . "*", GLOB_ONLYDIR);
        return [true, $directories];
    } else if ($action === "load") {
        if (isset($parameters->id)) {
            $app_directory = APPS_DIRECTORY . DIRECTORY_SEPARATOR . $parameters->id;
            if (file_exists($app_directory)) {
                $files = new stdClass();
                $files->html = file_get_contents($app_directory . DIRECTORY_SEPARATOR . "app.html");
                $files->javascript = file_get_contents($app_directory . DIRECTORY_SEPARATOR . "app.js");
                return [true, $files];
            } else {
                return [false, "App does no exist"];
            }
        } else {
            return [false, "Missing id"];
        }
    }
    return [false, "Unknown action"];
});

echo json_encode($result);