const VERIPIEO_ENDPOINT = "scripts/backend/veripieo/veripieo.php";
const VERIPIEO_API = "veripieo";

function devcon() {
    window.location = "developer";
}

function devlink(developer) {
    api(VERIPIEO_ENDPOINT, VERIPIEO_API, "link", {developer: developer}, (success, result, error) => {
        if (success)
            console.log("devlink: ok");
        else
            console.log("devlink: " + error);
    }, accounts_fill());
}