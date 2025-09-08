const sumRequestHandler = (req, res) => {
  console.log("In sum request handler", req.url);
  const body = [];
  let result;
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  return req.on("end", () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObject = Object.fromEntries(params);
    result = Number(bodyObject.first) + Number(bodyObject.second);
    console.log(result);

    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Practice Set</title></head>
            <body>
                <h1>Sum is ${result}</h1>
            </body>
        </html>
    `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
