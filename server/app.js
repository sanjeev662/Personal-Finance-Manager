const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/Database.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const transactionRoutes = require("./Routers/transactionsRouter.js");
const savingRoutes = require("./Routers/savingsRouter.js");
const userRoutes = require("./Routers/userRouter.js");
const path = require("path");

dotenv.config({ path: "./.env" });
const app = express();

const port = process.env.PORT;

// const allowedOrigins = ["http://localhost:3000"];
const allowedOrigins = ["https://personal-finance-manager-topaz.vercel.app"];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/v1", savingRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
