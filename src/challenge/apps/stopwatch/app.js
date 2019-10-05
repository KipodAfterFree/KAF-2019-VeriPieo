let time = 0, enabled = false;

get("onoff").onclick = () => {
    enabled = !enabled;
};

setInterval(() => {
    if (enabled)
        time += 0.1;
    let t = "";
    let splat = ("" + time).split(".");
    t += splat[0];
    if(splat.length>1) {
        t += ".";
        t += splat[1][0];
    }
    get("timer").innerText = t + "s";
}, 100);

app_loaded();
