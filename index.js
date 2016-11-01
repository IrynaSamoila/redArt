const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const url = require('url');

app.use(express.static('static'));

const apiProxy = proxy('localhost:3001/api', {
	forwardPath: req => {
		return url.parse(req.baseUrl).path;
	}
});

app.use("/api/*", apiProxy);

app.listen(3000, () => {
	console.log('redArt app listening on port 3000!');
});
