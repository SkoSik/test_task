import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import ApiRouter from "./routes/api.route.js";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "5mb"}));

let corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use("/api", ApiRouter);

export default app;
