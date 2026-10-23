"use strict";

throw {
  message: "AMBILIGHT NATIVE LOADER CHECK",
  nodeVersion: process.version,
  architecture: process.arch,
  dlopenAvailable: typeof process.dlopen === "function",
  moduleLoadAvailable: typeof require("module")._extensions[".node"] === "function",
  moduleAbi: process.versions.modules,
  napiVersion: process.versions.napi || null
};
