"use strict";

var fs = require("fs");
var paths = [
    "/usr/lib/libvideoenhance.so",
    "/usr/lib64/libvideoenhance.so"
];

var results = paths.map(function(path) {
    try {
        fs.statSync(path);
        return path + " = FOUND";
    } catch (e) {
        return path + " = " + e.code;
    }
});

throw { message: "AMBILIGHT PROBE: " + results.join("; ") };
