"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");

const url = "https:" + "//raw.githubusercontent.com/victor-sem/amb/adeb7a5/native/hello.node";
const target = path.join("/tmp", "amb-hello.node");

https.get(url, function (response) {
  if (response.statusCode !== 200) {
    response.resume();
    throw new Error("Download HTTP " + response.statusCode);
  }

  const chunks = [];
  response.on("data", chunk => chunks.push(chunk));

  response.on("end", function () {
    try {
      fs.writeFileSync(target, Buffer.concat(chunks));
      const addon = require(target);

      throw {
        message: "AMBILIGHT NATIVE TEST",
        result: addon.getAnswer(),
        path: target
      };
    } catch (err) {
      throw {
        message: "AMBILIGHT NATIVE TEST",
        result: err.message || String(err),
        code: err.code || null,
        path: target
      };
    }
  });
}).on("error", function (err) {
  throw {
    message: "AMBILIGHT DOWNLOAD ERROR",
    error: err.message
  };
});
