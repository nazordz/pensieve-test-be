import "module-alias/register";
import bodyParser from "body-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import createHttpError from "http-errors";
import { checkSchema, param } from "express-validator";
import {
  authLogin,
  currentUser,
  refreshToken,
} from "./controllers/authController";
import { verifyJwt } from "./middlewares/authJwt";
import { getEnv } from "./configs/config";
import { getDevices, getGps } from "./controllers/gpsController";

const app: Express = express();
const port = getEnv('PORT', '8080')

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
const limiter = rateLimit({
  max: 1000,
  windowMs: 1 * 60 * 1000,
  message: createHttpError(
    429,
    "Too many requests from this IP, please try again in an 1 minutes"
  ),
});
app.use("*", limiter);

app.use(express.json());

app.post(
  "/api/auth/login",
  checkSchema(
    {
      email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: "email is required",
      },
      password: { notEmpty: true, errorMessage: "password is required" },
    },
    ["body"]
  ),
  authLogin
);
app.post("/api/auth/refresh", verifyJwt, refreshToken);
app.get("/api/auth/user", verifyJwt, currentUser);

app.get(
  "/api/gps/:device_id",
  verifyJwt,
  param("device_id").notEmpty(),
  getGps);

app.get(
  "/api/devices",
  verifyJwt,
  getDevices
);
  
// route not found
app.all("*", (req, res, next) => {
  next(createHttpError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
