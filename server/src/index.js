import * as http from "http";
import sequelize from "./sequelize.js";
import app from "./app.js";

const port = 3000;

(async () => sequelize.authenticate().then(() =>
        http.createServer(app).listen(port, async () => {
            console.log(`[Express] Server started at port ${port}`)
        })
    ).catch((error) => console.log('Failed to connect the database:', error))
)();