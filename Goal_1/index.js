const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET" && parsedUrl.pathname.startsWith("/hello/")) {
    const name = parsedUrl.pathname.split("/")[2];
    res.statusCode = 200;
    name
      ? res.end(JSON.stringify({ message: `Hello, ${name}!`, url: req.url }))
      : res.end(JSON.stringify({ message: `Hello, World!`, url: req.url }));
  } else if (
    req.method === "GET" &&
    (parsedUrl.pathname === "/" || parsedUrl.pathname === "/hello")
  ) {
    // Handle a GET request to the root path
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Hello, World!", url: req.url }));
  } else if (req.method === "GET" && parsedUrl.pathname === "/secret") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Is Node.js easy? I don't know.",
        url: req.url,
      })
    );
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not found", url: req.url }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
