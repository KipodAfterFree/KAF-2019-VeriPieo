const VPDEVCON_ENDPOINT = "scripts/backend/vpdevcon/vpdevcon.php";
const VPDEVCON_API = "vpdevcon";

let html, js, png, picture = false;

function load(loggedIn, userInfo) {
    view("app");
    if (loggedIn) {
        view("home");
        api(VPDEVCON_ENDPOINT, VPDEVCON_API, "information", {}, (success, result, error) => {
            if (success) {
                if (result.id !== null) {
                    get("developer-id").innerText = result.id;
                    get("me-name").value = result.name;
                    get("me-description").value = result.description;
                    get("me-social").value = result.link;
                    get("me-pic").src = "../pictures/" + result.id + ".png";
                    get("me-pic").onerror = () => {
                        get("me-pic").onerror = null;
                        get("me-pic").src = "files/default.png";
                    };
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

function vpdevcon_preview_picture(pic) {
    api(VPDEVCON_ENDPOINT, VPDEVCON_API, "preview", {
        base64: pic
    }, (success, result, error) => {
        if (success) {
            vpdevcon_popup("holder/temporary/" + result);
        } else {
            popup(error, 3000, "$AA0000DD");
        }
    }, accounts_fill());
}

function vpdevcon_popup(resource) {
    let div = make("div");
    column(div);
    input(div);
    let img = make("img");
    img.src = resource;
    img.style.alignSelf = "center";
    let ok = make("button", "Ok");
    let dismiss = () => {
        if (div.parentElement !== null) {
            div.onclick = null;
            animate(div, "opacity", ["1", "0"], 0.5, () => {
                div.parentElement.removeChild(div);
            });
        }
    };
    ok.onclick = () => {
        dismiss();
        picture = true;
    };
    div.style.position = "fixed";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.style.margin = "1vh";
    div.style.padding = "1vh";
    div.appendChild(img);
    div.appendChild(ok);
    animate(div, "opacity", ["0", "1"], 0.5);
    document.body.appendChild(div);
}

function vpdevcon_update() {
    api(VPDEVCON_ENDPOINT, VPDEVCON_API, "update", {
        name: get("me-name").value,
        description: get("me-description").value,
        url: get("me-social").value,
        picture: picture
    }, (success, result, error) => {
        if (success)
            window.location.reload();
        else
            popup(error, 3000, "#AA0000DD");
    }, accounts_fill());
}

function vpdevcon_base64(file, callback) {
    let reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result.replace("data:image/png;base64,", ""));
    };
    reader.readAsDataURL(file);
}