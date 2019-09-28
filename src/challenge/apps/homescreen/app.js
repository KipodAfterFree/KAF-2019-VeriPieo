app_read("apps", (apps) => {
    let list = ["store"];
    if (apps !== null) {
        list = apps;
    }
    for (let i = 0; i < list.length; i += 4) {
        let current = make("div");
        row(current);
        current.style.justifyContent = "space-evenly";
        current.style.width = "100%";
        for (let j = 0; j < 4; j++) {
            let icon = make("img");
            icon.style.maxHeight = "10vh";
            icon.style.maxWidth = "10vh";
            icon.style.minWidth = "10vh";
            if (list.length > i + j) {
                let appId = list[i + j];
                device_load_app(appId, (files) => {
                    icon.src = files.icon;
                });
                icon.onclick = () => device_app(appId);
            }
            current.appendChild(icon);
        }
        get("homescreen-pane").appendChild(current);
    }
});

function add(appId) {
    app_read("apps", (apps) => {
        let list = ["store"];
        if (apps !== null) {
            list = apps;
        }
        list.push(appId);
        app_write("apps", list);
    });
}

