import { config } from "dotenv";
config();

export default {
    mongodb_url: process.env.MONGODB_URI,
    duo_ikey: process.env.DUO_IKEY,
    duo_skey: process.env.DUO_SKEY,
    duo_host: process.env.DUO_HOST,
    api_host: process.env.API_HOST
}