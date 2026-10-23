"use strict";

var fs = require("fs");
var path = "/usr/lib/libdisplay-capture-api.so.0";

try {
    var data = fs.readFileSync(path);
    var strings = data.toString("latin1")
        .match(/[\x20-\x7e]{5,}/g) || [];

    var matches = strings.filter(function(s) {
        return /capture|screen|display|frame|pixel|buffer|image|snapshot/i.test(s);
    }).slice(0, 60);

    throw {
        message: "AMBILIGHT DISPLAY CAPTURE INSPECTION",
        librarySize: data.length,
        matches: matches
    };
} catch (e) {
    if (e.message === "AMBILIGHT DISPLAY CAPTURE INSPECTION") {
        throw e;
    }
    throw {
        message: "AMBILIGHT CAPTURE READ ERROR",
        error: e.code || e.message
    };
}
