const VPDEVCON_ENDPOINT = "scripts/backend/vpdevcon/vpdevcon.php";
const VPDEVCON_API = "vpdevcon";

let html, js, png;

function load(loggedIn, userInfo) {
    view("app");
    if (loggedIn) {
        view("home");
        api(VPDEVCON_ENDPOINT, VPDEVCON_API, "information", {}, (success, result, error) => {
            if (success) {
                if (result.id !== null) {
                    get("developer-id").innerText = result.id;
                } else {
                    page("register-developer");
                }
            } else {
                window.location = "../";
            }
        }, accounts_fill());
    } else {
        out("Please log-in to access the VeriPieo Developer Console.");
    }
}

function out(text) {
    view("output");
    get("output").innerText = text;
}

function vpdevcon_register() {
    api(VPDEVCON_ENDPOINT, VPDEVCON_API, "register", {
        name: get("register-developer-name").value,
        description: get("register-developer-description").value,
        url: get("register-developer-social").value
    }, (success, result, error) => {
        if (success)
            page("home");
        else
            out(error);
    }, accounts_fill());
}

function vpdevcon_publish() {
    api(VPDEVCON_ENDPOINT, VPDEVCON_API, "publish", {
        name: get("new-app-name").value,
        description: get("new-app-description").value,
        version: get("new-app-version").value,
        html: html,
        js: js,
        png: png
    }, (success, result, error) => {
        if (success)
            window.location.reload();
        else
            popup(error, 3000, "#AA0000DD");
    }, accounts_fill());
}

function vpdevcon_base64(file, callback) {
    let reader = new FileReader();
    reader.onloadend = function() {
        callback(reader.result.replace("data:image/png;base64,",""));
    };
    reader.readAsDataURL(file);
}