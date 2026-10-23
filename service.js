"use strict";

var fs = require("fs");
var dirs = ["/usr/lib", "/usr/lib64", "/lib"];
var pattern = /video|display|screen|capture|pixel|color|picture|frame|render|graphics|mali|drm/i;

var results = dirs.map(function(dir) {
    try {
        return {
            directory: dir,
            libraries: fs.readdirSync(dir)
                .filter(function(name) { return pattern.test(name); })
                .slice(0, 100)
        };
    } catch (e) {
        return { directory: dir, error: e.code || e.message };
    }
});

throw {
    message: "AMBILIGHT VIDEO LIBRARY DISCOVERY",
    results: results
};
