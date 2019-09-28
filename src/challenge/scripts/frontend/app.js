function load(loggedIn, userInfo) {
    view("app");
    if (loggedIn) {
        console.log("--------------Developer Console Access---------------");
        console.log("Go to /developer to access the developer-console,");
        console.log("Or just type devcon() and press enter.");
        console.log("---------------Developer Account Link----------------");
        console.log("To link your device account with a developer account,");
        console.log("type devlink(DEV_ID) - e.g devlink(\"32nrnds...\")");
        console.log("-----------------------------------------------------");
        device_spinup();
    } else {
        view("nologin");
    }
}