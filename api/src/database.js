import mongoose from "mongoose";
import config from "./config";

(async () => {
    const db = await mongoose.connect(config.mongodb_url);
    console.log('Connected to database:', db.connection.name);
})();