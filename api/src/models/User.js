import {Schema, model} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    phone_num: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rfid_code: {
        type: String,
        trim: true,
        unique: true
    },
    role_user: {
        type: String,
        required: true,
        enum: ["user", "it_admin"],
        default: "user"
    },
    auth_counter: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('User', userSchema);