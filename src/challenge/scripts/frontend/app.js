function load(loggedIn, userInfo) {
    view("app");
    if(loggedIn){
        view("home");
    }else{
        view("nologin");
    }
}

// App Code