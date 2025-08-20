/*
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
    );

    console.log(filePath);

    const extName = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "text/png",
    };

    const contentType = mimeTypes[extName] || "application/octet-stream";
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("404: File not found Broooo");
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
*/

//simpler way

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

http.createServer((req, res) => {
    let file = req.url === "/" ? "index.html" : req.url;
    let filePath = path.join(__dirname, file);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 Not Found");
        }
        res.writeHead(200);
        res.end(data, "utf-8");
    });
}).listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
