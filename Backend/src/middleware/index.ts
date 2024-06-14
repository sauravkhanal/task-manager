import express from "express";
import cookieParser from "cookie-parser";
import decodeAccessToken from "./decodeAccessToken";
import cors from "cors";

const middleware = express();

// Split the CORS origins string into an array
const origins = process.env.CORS_ORIGINS?.split(",");

middleware.use(
    cors({
        origin: origins,
        credentials: true,
    }),
);
//if withCredentials: true in request, wild card cors entry "*" doesn't work.
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: false }));
middleware.use(cookieParser());
middleware.use(express.static("public"));
middleware.use(decodeAccessToken);

export default middleware;
