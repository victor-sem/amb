"use strict";

var cp = require("child_process");

var commands = [
    "command -v readelf",
    "command -v nm",
    "command -v objdump",
    "command -v python3"
];

var results = commands.map(function(cmd) {
    try {
        return {
            command: cmd,
            result: cp.execSync(cmd, { timeout: 3000 }).toString().trim()
        };
    } catch (e) {
        return {
            command: cmd,
            error: e.message
        };
    }
});

throw {
    message: "AMBILIGHT TOOLS CHECK",
    results: results
};
