"use strict";

var fs = require("fs");

var mounts = "";
var mountError = null;

try {
    mounts = fs.readFileSync("/proc/mounts", "utf8")
        .split("\n")
        .filter(function(line) {
            return /\/tmp|\/$/.test(line);
        });
} catch (e) {
    mountError = e.message;
}

var report = {
    message: "AMBILIGHT LOADER ENV CHECK",
    node: process.version,
    architecture: process.arch,
    dlopenAvailable: typeof process.dlopen === "function",
    tmpExists: fs.existsSync("/tmp"),
    addonExists: fs.existsSync("/tmp/amb-hello.node"),
    relevantMounts: mounts,
    mountError: mountError
};

throw report;
