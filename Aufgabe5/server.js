"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L05_Hexenkessel_Client = void 0;
const Http = require("http");
const Url = require("url");
var L05_Hexenkessel_Client;
(function (L05_Hexenkessel_Client) {
    let server = Http.createServer();
    console.log(server);
    let port = process.env.PORT;
    if (port == undefined)
        port = 50001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset-utf-8");
        _response.setHeader("Acces-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(L05_Hexenkessel_Client = exports.L05_Hexenkessel_Client || (exports.L05_Hexenkessel_Client = {}));
//# sourceMappingURL=server.js.map