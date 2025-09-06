const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<head><title>Taking user Input</title></head>");
    res.write("<body>");
    res.write("<h1>Enter your Details</h1>");
    res.write('<form action="/submit" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter your name"><br>'
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"/>');
    res.write('<label for="fenale">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female"/>');
    res.write('<br><input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");

    return res.end();
  } else if (req.url.toLocaleLowerCase === "/submit" && req.method === "POST") {
    fs.writeFileSync("user.txt", "Gautam Mishra");
    res.statusCode = 302;
    res.setHeader("Location", "/");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
