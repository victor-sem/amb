"use strict";

var modules = [
  "ffi-napi",
  "ffi",
  "ref-napi",
  "bindings",
  "node-gyp",
  "process"
];

var results = modules.map(function(name) {
  try {
    var resolved = require.resolve(name);
    return {module: name, available: true, path: resolved};
  } catch (e) {
    return {module: name, available: false, error: e.code || e.message};
  }
});

throw {
  message: "AMBILIGHT NATIVE BRIDGE CHECK",
  nodeVersion: process.version,
  architecture: process.arch,
  results: results
};
