const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Practice Set</title></head>
            <body>
                <h1>Welcome to Calculator</h1>
                <a href="/calculator">Go to Calculator</a>
            </body>
        </html>
    `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Practice Set</title></head>
            <body>
                <h1>Here is the Calculator!</h1>
                <form action="/calculate-result" method="POST">
                    <input type="text" placeholder="First Num" name="first" />
                    <input type="text" placeholder="Second Num" name="second" />
                    <input type="submit" value="Sum" />   
                </from>
            </body>
        </html>
    `);
    return res.end();
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    sumRequestHandler(req, res);
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
        <html>
            <head><title>Practice Set</title></head>
            <body>
                <h1>404 page doesn't exists</h1>
                <a href="/">Go to Home</a>
            </body>
        </html>
    `);
  return res.end();
};
exports.requestHandler = requestHandler;
