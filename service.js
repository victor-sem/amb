"use strict";

var fs = require("fs");

var paths = [
    "/usr/lib/libefl-util.so",
    "/usr/lib/libtbm.so",
    "/usr/lib/libcapi-system-info.so",
    "/usr/lib/libdlog.so",
    "/usr/lib/libnode.so"
];

var report = {
    message: "AMBILIGHT SCREEN CAPTURE CAPABILITY CHECK",
    node: process.version,
    architecture: process.arch,
    executable: process.execPath,
    libraries: {},
    loadedCaptureLibraries: []
};

paths.forEach(function(path) {
    report.libraries[path] = fs.existsSync(path);
});

try {
    report.loadedCaptureLibraries = fs.readFileSync(
        "/proc/self/maps", "utf8"
    ).split("\n").filter(function(line) {
        return /efl-util|libtbm|screenshot|screen.?capture|libnode\.so|libuv\.so/i.test(line);
    }).slice(0, 30);
} catch (e) {
    report.mapsError = e.message;
}

throw report;
