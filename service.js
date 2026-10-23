"use strict";

var os = require("os");

throw {
    message: "AMBILIGHT SYSTEM INFO",
    architecture: process.arch,
    platform: process.platform,
    nodeVersion: process.version,
    osArchitecture: os.arch(),
    libraryFound: require("fs").existsSync("/usr/lib/libvideoenhance.so")
};
