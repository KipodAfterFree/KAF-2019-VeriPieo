function load(loggedIn, userInfo) {
    view("app");
    if (loggedIn) {
        console.log("------------Developer Console Access-------------");
        console.log("Go to /developer to access the developer-console,");
        console.log("Or just type devcon() and press enter.");
        console.log("-------------------------------------------------");
        device_spinup();
    } else {
        view("nologin");
    }
}

function devcon() {
    let url = window.location.origin;
    let split = window.location.pathname.split("/");
    for (let i = 0; i < split.length - 1; i++) {
        url += split[i] + "/";
    }
    url += "developer";
    window.location = url;
}