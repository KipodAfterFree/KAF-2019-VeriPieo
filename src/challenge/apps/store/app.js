api("scripts/backend/cdn/cdn.php", "cdn", "list", {}, (success, result, error) => {
    if (success) {
        for (let i = 0; i < result.length; i++) {
            let appId = result[i];
            let current = make("div");
            row(current);
            current.style.justifyContent = "right";
            current.style.backgroundColor = "#ddddee";
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
                icon.src = appId + "/app.png";
                install.style.fontSize = "2vh";
                install.style.minWidth = "10vh";
                install.style.maxWidth = "10vh";
                buttons.appendChild(icon);
                buttons.appendChild(install);
                current.appendChild(buttons);
                let title = make("p", appInfo.name);
                let description = make("p", appInfo.description);
                column(text);
                text.style.width = "100%";
                title.style.fontSize = "5vh";
                description.style.fontSize = "2vh";
                text.appendChild(title);
                text.appendChild(description);
                let developed = make("div");
                row(developed);
                let developer = make("img");
                developer.style.minWidth = "5vh";
                developer.style.maxWidth = "5vh";
                developer.style.maxHeight = "5vh";
                developer.style.alignSelf = "center";
                developer.src = "pictures/" + appInfo.developer + ".png";
                let developedBy = make("p", "Developed by ");
                developedBy.style.fontSize = "2vh";
                developed.appendChild(developedBy);
                developed.appendChild(developer);
                text.appendChild(developed);
                current.appendChild(text);
                install.onclick = () => {
                    device_app("apps/homescreen", "add(\"" + appId + "\")");
                };
                developer.onclick = () => {
                    api(VERIPIEO_ENDPOINT, VERIPIEO_API, "information", {developer: appInfo.developer}, (success, result, error) => {
                        if (success)
                            device_popup(result.name + " - " + result.description, 5000, "#009900DD", () => window.location = result.link);
                    }, accounts_fill());
                };
                get("store-list").appendChild(current);
                if (i === result.length - 1)
                    app_loaded();
            });
        }
    }
}, accounts_fill());

// device_app_prepare("homescreen");