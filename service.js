"use strict";

var fs = require("fs");

var report = {
    message: "AMBILIGHT FRAMEBUFFER READ TEST",
    path: "/dev/fb0",
    opened: false,
    bytesRead: 0,
    hex: null,
    error: null
};

var fd = null;

try {
    fd = fs.openSync(
        "/dev/fb0",
        fs.constants.O_RDONLY | fs.constants.O_NONBLOCK
    );

    report.opened = true;

    var buffer = Buffer.alloc(64);

    report.bytesRead = fs.readSync(
        fd, buffer, 0, buffer.length, 0
    );

    report.hex = buffer
        .subarray(0, report.bytesRead)
        .toString("hex");

} catch (e) {
    report.error = {
        code: e.code,
        message: e.message
    };
} finally {
    if (fd !== null) {
        fs.closeSync(fd);
    }
}

throw report;
