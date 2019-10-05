get("new").onclick = () => {
    app_read("notes", (result) => {
        if (result === null) result = [];
        result.push("New note");
        app_write("notes", result, () => {
            device_app("apps/notes");
        });
    });
};

app_read("notes", (result) => {
    if (result === null) result = [];
    for (let i = 0; i < result.length; i++) {
        let current = make("div");
        let textArea = make("textarea");
        let save = make("button", "Save");
        column(current);
        textArea.placeholder = "Text";
        textArea.value = result[i];
        save.onclick = () => {
            result[i] = textArea.value;
            app_write("notes", result);
        };
        current.appendChild(textArea);
        current.appendChild(save);
        get("note-list").appendChild(current);
    }
    app_loaded();
});
