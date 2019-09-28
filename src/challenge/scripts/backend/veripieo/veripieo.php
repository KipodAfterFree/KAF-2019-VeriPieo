<?php
include_once __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "accounts" . DIRECTORY_SEPARATOR . "api.php";
include "api.php";
veripieo_load();
api("veripieo", function ($action, $parameters) {
    $user = accounts();
    if ($user !== null) {
        if ($action === "link") {
            if (isset($parameters->developer)) {
                $linked = veripieo_device_link($user->id, $parameters->developer);
                return [$linked, $linked ? null : "An error occurred"];
            } else {
                return [false, "Missing parameter"];
            }
        }
        return [false, "Unknown action"];
    } else {
        return [false, "Authentication failure"];
    }
}, true);
echo json_encode($result);