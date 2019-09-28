api("scripts/backend/cdn/cdn.php", "cdn", "list", {}, (success, result, error) => {
    if (success) {
        for (let i = 0; i < result.length; i++) {
            let appId = result[i];
            let current = make("div");
            row(current);
            current.style.justifyContent = "right";
            current.style.backgroundColor = "#DDDDDD";
            current.style.borderRadius = "2vh";
            current.style.margin = "1vh 0";
            current.style.padding = "1vh";
            device_load_app(appId, (files) => {
                let appInfo = JSON.parse(files.info);
                let buttons = make("div");
                let text = make("div");
                let icon = make("img");
                let install = make("button", "Install v" + appInfo.version);
                column(buttons);
                icon.style.minWidth = "10vh";
                icon.style.maxWidth = "10vh";
                icon.style.maxHeight = "10vh";
                icon.style.alignSelf = "center";
                icon.src = "/apps/" + appId + "/app.png";
                install.style.fontSize = "2vh";
                install.style.minWidth = "10vh";
                install.style.maxWidth = "10vh";
                buttons.appendChild(icon);
                buttons.appendChild(install);
                current.appendChild(buttons);
                let title = make("p", appInfo.name);
                let description = make("p", appInfo.description);
                column(text);
                title.style.fontSize = "5vh";
                description.style.fontSize = "2vh";
                text.appendChild(title);
                text.appendChild(description);
                current.appendChild(text);
                install.onclick = () => {
                    device_app("homescreen", "add(\"" + appId + "\")");
                };
                get("store-list").appendChild(current);
                if (i === result.length - 1)
                    app_loaded();
            });
        }
    }
});

// device_app_prepare("homescreen");