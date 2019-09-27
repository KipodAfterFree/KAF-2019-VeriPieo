const UDB_ENDPOINT = "scripts/backend/udb/udb.php";
const UDB_API = "udb";
const CDN_ENDPOINT = "scripts/backend/cdn/cdn.php";
const CDN_API = "cdn";

function veripieo_initialize() {

}

function veripieo_load_device() {
    view("device");
    veripieo_device_animate();
    device_app("home");
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

function device_home_screen() {

}

function device_load_screen(appId, screenId) {

}

function device_load_text(contents) {
    get("frame").innerHTML = contents;
}

function device_load_app(appId, callback) {
    api(UDB_ENDPOINT, UDB_API, "read", {id: appId}, (success, result, error) => {
        if (success)
            callback(result);
    }, accounts_fill());
}

function device_app(appId) {
    device_load_app(appId, (files) => {
        let javascript = false;
        let html = make("div");
        html.innerHTML = files.html;
        for (let i = 0; i < html.children && javascript === false; i++)
            if (html.children[i].tagName === "loadscript")
                javascript = true;
        if (javascript) {
            let code = files.javascript;
            (function () {
                eval("document.body = " + get("frame") + "; " + code);
            })();
        }
        get("frame").innerHTML = files.html;
    });
}