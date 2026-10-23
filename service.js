"use strict";

var fs = require("fs");
var https = require("https");

var url = "https:" + "//raw.githubusercontent.com/" +
          "victor-sem/amb/adeb7a5/native/hello.node";

var target = "/tmp/amb-hello.node";

var resultPath = "/tmp/amb-native-result.json";

if (fs.existsSync(resultPath)) {
    var saved = JSON.parse(fs.readFileSync(resultPath, "utf8"));
    throw {
        message: "AMBILIGHT NATIVE LOAD RESULT",
        status: saved.status,
        result: saved.result || null,
        error: saved.error || null
    };
}


https.get(url, function(response) {
    var chunks = [];

    response.on("data", function(chunk) {
        chunks.push(chunk);
    });

    response.on("end", function() {
        try {
            fs.writeFileSync(target, Buffer.concat(chunks));
            var addon = require(target);
            fs.writeFileSync("/tmp/amb-native-result.json", JSON.stringify({status:"success", result:addon.getAnswer()}));
        } catch (e) {
            fs.writeFileSync("/tmp/amb-native-result.json", JSON.stringify({status:"error", error:e.message}));
        }
    });
}).on("error", function(e) {
    fs.writeFileSync("/tmp/amb-native-result.json", JSON.stringify({status:"download-error", error:e.message}));
});

throw {
    message: "AMBILIGHT NATIVE TEST",
    note: "Download started; async result requires separate reporting"
};
