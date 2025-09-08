const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

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
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female"/>');
    res.write('<br><input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");

    return res.end();
  } else if (req.url === "/submit" && req.method === "POST") {
    // buffering
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // converting buffer data into meaningful output
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      console.log(parsedBody);

      const params = new URLSearchParams(parsedBody);

      //   const bodyObject = {};
      //   for (const [key, value] of params.entries()) {
      //     bodyObject[key] = value;
      //   }

      const bodyObject = Object.fromEntries(params);

      console.log(bodyObject);

      const jsonString = JSON.stringify(bodyObject);
      fs.writeFileSync("user.txt", jsonString);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};
module.exports = requestHandler;
