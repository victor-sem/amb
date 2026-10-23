"use strict";

var fs = require("fs");
var path = "/usr/lib/libvideoenhance.so";

var symbols = [
    "cs_ve_get_rgb_measure_condition",
    "cs_ve_set_rgb_measure_position",
    "cs_ve_get_rgb_measure_pixel"
];

try {
    var stat = fs.statSync(path);
    var data = fs.readFileSync(path);

    throw {
        message: "AMBILIGHT RGB SYMBOL CHECK",
        librarySize: stat.size,
        results: symbols.map(function(name) {
            return {
                symbol: name,
                found: data.indexOf(Buffer.from(name)) !== -1
            };
        })
    };
} catch (e) {
    if (e.message === "AMBILIGHT RGB SYMBOL CHECK") {
        throw e;
    }

    throw {
        message: "LIBRARY READ ERROR",
        code: e.code || null,
        error: String(e.message || e)
    };
}
