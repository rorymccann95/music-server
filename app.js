const createError = require("http-errors");
const express = require("express"); 
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const whitelist = [
    "http://localhost:3000"
];

const corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
};

const app = express();

app.use(cors(corsOptions));

const artists = require("./api/artists");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use("/api/artists", artists)


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err,req,res,next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.logger("env") === "development" ? err : {},
    });
});

module.exports = app;