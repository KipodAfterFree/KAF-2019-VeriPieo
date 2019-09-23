const VERIPIEO_ENDPOINT = "scripts/backend/veripieo/veripieo.php";
const VERIPIEO_API = "veripieo";

function veripieo_initialize() {

}

function veripieo_load_device() {
    view("device");
    veripieo_device_animate();
    // api(VERIPIEO_ENDPOINT, VERIPIEO_API, "device", {}, (success, result, error) => {
    //
    // }, accounts_fill());
}

function veripieo_device_animate() {
    let device = get("frame");
    let cube = make("div");
    cube.style.width = "5vh";
    cube.style.height = "5vh";
    cube.style.backgroundColor = "#000000";
    cube.style.position = "relative";
    cube.style.borderRadius = "5vh";
    clear(device);
    device.appendChild(cube);
    let a = () => animate(cube, "left", ["0", "-5vh", "5vh"], 0.5, (cube.parentNode !== null) ? a : null);
    let b = () => animate(cube, "top", ["0", "-5vh", "5vh"], 0.5, (cube.parentNode !== null) ? b : null);
    setTimeout(a, 0);
    setTimeout(b, 250);
}