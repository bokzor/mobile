function getOrientation() {
    return Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
};

function getMobileWidth() {
    return getOrientation() == "landscape" ? screen.availHeight : screen.availWidth;
};

function getMobileHeight() {
    return getOrientation() == "landscape" ? screen.availWidth : screen.availHeight;
};