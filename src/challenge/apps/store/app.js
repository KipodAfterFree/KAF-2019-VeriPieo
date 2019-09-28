api("scripts/backend/cdn/cdn.php", "cdn", "list", {}, (success, result, error) => {
    if (success) {
        for (let i = 0; i < result.length; i++) {
            let current = make("div");
            row(current);
        }
    }
});

device_app_prepare("homescreen");