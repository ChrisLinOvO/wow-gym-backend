const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
// const cookieSession = require("cookie-session");

const shopRoutes = require("./routes/shop-routes");
const coursesRoutes = require("./routes/courses-routes");
const categoryRoutes = require("./routes/category-routes");
const employeeRoutes = require("./routes/employee-routes");
const customerRoutes = require("./routes/customer-routes");
const OrderRoutes = require("./routes/orders-routes");
const memberRoutes = require("./routes/member-routes");
const articleRoutes = require("./routes/article-routes");
const app = express();
const bodyParser = express.urlencoded({ extended: false });
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(bodyParser);
app.use(express.json());

app.use(
  session({
    secret: "wowowowwowo",
    resave: "false",
    saveUninitialized: "false",
  })
);

// Passport
require("./passport");

app.use(passport.initialize());
app.use(passport.session());

// Cors
const whiteList = [
  "undefined",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://gym-project-backend.herokuapp.com",
  "https://wow-gym-1874c.web.app",
  "https://wow-gym-1874c.firebaseapp.com",
];
const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    // console.log(origin);
    if (whiteList.indexOf(origin) >= 0) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
app.use(cors(corsOptions));

// Router
app.use("/api/shop", shopRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/customerRoutes", customerRoutes);
app.use("/api/user", memberRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api", employeeRoutes);
app.use("/Orders", OrderRoutes);


// home route
app.use((req, res, next) => res.send("Hi welcome to wow-gym API server 👻"));
// Error handler
app.use((req, res, next) => {
  throw new httpError("Route can't find!", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "unKnown Error!" });
});

app.listen(process.env.PORT || 5000, () => console.log("server start 🥶"));

// ---------