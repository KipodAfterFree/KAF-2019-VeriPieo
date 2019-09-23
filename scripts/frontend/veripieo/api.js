const VERIPIEO_ENDPOINT = "scripts/backend/veripieo/veripieo.php";
const VERIPIEO_API = "veripieo";

function veripieo_initialize() {

}

function veripieo_load_device() {
    api(VERIPIEO_ENDPOINT, VERIPIEO_API, "device", {}, (success, result, error)=>{

    }, accounts_fill());
}