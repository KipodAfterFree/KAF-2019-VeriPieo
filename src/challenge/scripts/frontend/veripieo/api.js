const UDB_ENDPOINT = "scripts/backend/udb/udb.php";
const UDB_API = "udb";
const CDN_ENDPOINT = "scripts/backend/cdn/cdn.php";
const CDN_API = "cdn";

function device_spinup() {
    view("holder");
    device_spinner();
    device_background_color();
    device_app("homescreen");
}

function device_spinner() {
    view("splash");
    device_background_color();
    let device = get("splash");
    let cube = make("div");
    cube.style.width = "8vh";
    cube.style.height = "8vh";
    cube.style.backgroundColor = "#000000";
    clear(device);
    device.appendChild(cube);
    let a = (d = 0) => animate(cube, "transform", ["rotate(" + d + "deg)", "rotate(" + (d + 360) + "deg)"], 1, (cube.parentNode !== null) ? () => a(d + 360) : null);
    a();
}

function device_background_color(colors = ["#0086b5", "#bd7cde"]) {
    let styled = "";
    for (let i = 0; i < colors.length; i++) {
        if (styled.length !== 0) styled += ", ";
        styled += colors[i];
    }
    get("device").style.background = "linear-gradient(" + styled + ")";
}

function device_load_app(appId, callback) {
    api(CDN_ENDPOINT, CDN_API, "load", {
        id: appId
    }, (success, result, error) => {
        if (success)
            callback(result);
    }, accounts_fill());
}

function device_app(appId, callback = null) {
    device_spinner();
    device_load_app(appId, (files) => {
        get("content").innerHTML = files.html;
        device_background_color();
        let children = get("content").children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].tagName.toLowerCase() === "back") {
                let colors = [];
                for (let j = 0; j < children[i].children.length; j++) {
                    if (children[i].children[j].tagName.toLowerCase() === "color")
                        colors.push(children[i].children[j].innerHTML);
                }
                device_background_color(colors);
            }
        }

        function app_write(key, value, callback) {
            api(UDB_ENDPOINT, UDB_API, "write", {
                id: appId,
                key: key,
                value: value
            }, (success, result, error) => {
                if (callback !== null)
                    callback();
            }, accounts_fill());
        }

        function app_read(key, callback) {
            api(UDB_ENDPOINT, UDB_API, "read", {
                id: appId,
                key: key
            }, (success, result, error) => {
                if (callback !== null)
                    callback(result);
            }, accounts_fill());
        }

        // Run app
        eval(files.javascript);
        if (callback !== null) {
            (eval(callback.toString()))();
        }
    });
}

function app_loaded() {
    view("content");
}