"use strict";

var fs = require("fs");

var report = {
    message: "AMBILIGHT NODE PROCESS CHECK",
    node: process.version,
    architecture: process.arch,
    executable: process.execPath,
    maps: null,
    error: null
};

try {
    report.maps = fs.readFileSync("/proc/self/maps", "utf8")
        .split("\n")
        .filter(function(line) {
            return /node|libc|libdl|libnode/i.test(line);
        })
        .slice(0, 40);
} catch (e) {
    report.error = e.message;
}

throw report;
