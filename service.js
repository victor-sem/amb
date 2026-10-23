"use strict";

const fs = require("fs");
const https = require("https");

const url = "https://raw.githubusercontent.com/victor-sem/amb/adeb7a5/native/hello.node";
const target = "/tmp/amb-hello.node";

const report = {
  message: "AMBILIGHT NATIVE LOAD TEST",
  stage: "starting",
  result: null
};

https.get(url, response => {
  if (response.statusCode !== 200) {
    report.stage = "download";
    report.result = "HTTP " + response.statusCode;
    response.resume();
    return;
  }

  const chunks = [];
  response.on("data", chunk => chunks.push(chunk));

  response.on("end", () => {
    try {
      fs.writeFileSync(target, Buffer.concat(chunks));
      report.stage = "loading";
      const addon = require(target);
      report.stage = "success";
      report.result = addon.getAnswer();
    } catch (e) {
      report.stage = "error";
      report.result = e.message;
    }
  });
}).on("error", e => {
  report.stage = "download error";
  report.result = e.message;
});

setTimeout(() => {
  throw report;
}, 5000);
