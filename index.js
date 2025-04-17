// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// 3. A request to /api/:date? with a valid date string should return a JSON object with a utc key that is the UTC representation of the input date
// 4. A request to /api/:date? with a valid Unix timestamp should return a JSON object with a unix key that is the Unix timestamp of the input date in milliseconds (as type Number)
// 5. Your project can handle dates that can be successfully parsed by new Date(date_string)
// 6. If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// 7. An empty date parameter should return the current time in a JSON object with a unix key
// 8. An empty date parameter should return the current time in a JSON object with a utc key

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  let date;

  if (!dateInput) {
    date = new Date();
  } else if (!isNaN(dateInput)) {
    // Numeric input, parse as Unix timestamp
    date = new Date(parseInt(dateInput));
  } else {
    // Otherwise, parse as date string
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Timestamp Microservice



