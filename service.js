"use strict";

var fs = require("fs");
var b = fs.readFileSync("/usr/lib/libdisplay-capture-api.so.0");

try {
    if (b.toString("ascii", 1, 4) !== "ELF")
        throw new Error("Not an ELF file");

    if (b[4] !== 1 || b[5] !== 1)
        throw new Error("Expected 32-bit little-endian ELF");

    var shoff = b.readUInt32LE(32);
    var shentsize = b.readUInt16LE(46);
    var shnum = b.readUInt16LE(48);
    var sections = [];

    for (var i = 0; i < shnum; i++) {
        var p = shoff + i * shentsize;
        sections.push({
            type: b.readUInt32LE(p + 4),
            offset: b.readUInt32LE(p + 16),
            size: b.readUInt32LE(p + 20),
            link: b.readUInt32LE(p + 24),
            entsize: b.readUInt32LE(p + 36)
        });
    }

    var symbols = [];

    sections.forEach(function(s) {
        if (s.type !== 11 || !s.entsize) return;
        var strings = sections[s.link];

        for (var pos = s.offset; pos < s.offset + s.size; pos += s.entsize) {
            var nameOffset = b.readUInt32LE(pos);
            var info = b[pos + 12];
            var sectionIndex = b.readUInt16LE(pos + 14);

            if (!nameOffset || !sectionIndex || (info & 15) !== 2) continue;

            var start = strings.offset + nameOffset;
            var end = b.indexOf(0, start);
            var name = b.toString("utf8", start, end);

            if (/capture|display|screen|buffer|rgb|frame/i.test(name))
                symbols.push(name);
        }
    });

    throw {
        message: "AMBILIGHT EXPORTED FUNCTIONS",
        totalMatches: symbols.length,
        symbols: symbols.slice(0, 80)
    };

} catch (e) {
    if (e.message === "AMBILIGHT EXPORTED FUNCTIONS") throw e;
    throw {
        message: "AMBILIGHT ELF INSPECTION ERROR",
        error: e.message
    };
}
