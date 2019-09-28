const VPDEVCON_ENDPOINT = "scripts/backend/vpdevcon/vpdevcon.php";
const VPDEVCON_API = "vpdevcon";

function load(loggedIn, userInfo) {
    view("app");
    if (loggedIn) {
        view("home");
        api(VPDEVCON_ENDPOINT, VPDEVCON_API, "information", {}, (success, result, error) => {
            if (success) {
                if (result.id !== null) {
                    get("developer-id").innerText = result.id;
                } else {
                    page("home", "register");
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
        description: get("register-developer-developer").value,
        link: get("register-developer-social").value
    }, (success, result, error) => {
        if (success)
            page("register", "home");
        else
            out(error);
    }, accounts_fill());
}