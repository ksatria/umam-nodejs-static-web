var Server = /** @class */ (function () {
    function Server() {
        this.http = require("http");
        this.url = require("url");
        this.fs = require("fs");
        this.port = 8000;
    }
    Server.prototype.run = function () {
        var _this = this;
        this.server = this.http.createServer(function (request, response) {
            var q = _this.url.parse(request.url, true);
            var filename = "." + q.pathname;
            _this.fs.readFile(filename, function (error, data) {
                if (error) {
                    response.writeHead(404, { "Content-Type": "text/html" });
                    return response.end("Error 404: Halaman tidak ditemukan");
                }
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                return response.end();
            });
        }).listen(this.port);
        console.log("Server is running on http://localhost:" + this.port);
    };
    return Server;
}());
var server = new Server;
server.run();
