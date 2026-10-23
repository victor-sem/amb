"use strict";

var fs = require("fs");

var paths = [
    "/dev/fb0",
    "/dev/graphics/fb0",
    "/dev/dri/card0",
    "/dev/dri/renderD128",
    "/dev/video0",
    "/dev/disp",
    "/dev/mem"
];

var report = {
    message: "AMBILIGHT FRAMEBUFFER ACCESS CHECK",
    node: process.version,
    architecture: process.arch,
    devices: {}
};

paths.forEach(function(path) {
    var item = {
        exists: fs.existsSync(path),
        readable: false,
        writable: false,
        error: null
    };

    if (item.exists) {
        try {
            fs.accessSync(path, fs.constants.R_OK);
            item.readable = true;
        } catch (e) {
            item.error = e.message;
        }

        try {
            fs.accessSync(path, fs.constants.W_OK);
            item.writable = true;
        } catch (e) {}
    }

    report.devices[path] = item;
});

throw report;
