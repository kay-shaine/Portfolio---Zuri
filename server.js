// Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // handle the request and send back a static file
  let parsedURL = url.parse(req.url, true);
  // remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");

  if (path == "" || path == "index") {
    path = "index.html";
  }
  else if(path == "about"){
    path = "about.html";
  }
  else if(path == "contact"){
    path = "contact.html";
  }
  let file = __dirname + "\\" + path;

  // async read file function uses callback
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`, err);
      res.writeHead(404);
      res.end();
    } else {
      res.end(content);
    }
  });
});

server.listen(4000, "localhost", () => {
  console.log("Listening on port 4000...");
});