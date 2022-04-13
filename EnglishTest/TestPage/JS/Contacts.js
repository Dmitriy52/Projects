var express = require("express");
var path = require("path");
var weatherRequest = require("./HelpWWidget");

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, "public")))
  .get("/api/:Contacts/", async function (req, res) {
    const result = await weatherRequest(req.params.index);
    res.json(result);
  })
  .listen(8080);
