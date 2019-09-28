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
    window.location = "developer";
}