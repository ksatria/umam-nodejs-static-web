class Server {
    private http;
    private url;
    private fs;
    private port;

    public server;

    public constructor() {
        this.http = require("http");
        this.url = require("url");
        this.fs = require("fs");
        this.port = 8000;
    }

    public run() {
        this.server = this.http.createServer((request, response) => {
            let q = this.url.parse(request.url, true);
            let filename = `.${q.pathname}`;

            this.fs.readFile(filename, (error, data) => {
                if (error) {
                    response.writeHead(404, { "Content-Type": "text/html" });
                    return response.end("Error 404: Halaman tidak ditemukan");
                }

                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                return response.end();
            });
        }).listen(this.port);

        console.log(`Server is running on http://localhost:${this.port}`);
    }
}

let server = new Server;
server.run();