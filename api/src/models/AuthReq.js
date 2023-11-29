import {Schema, model} from "mongoose";

const authReqSchema = new Schema({
    auth_device: {
        type: String,
        required: true,
        trim: true
    },
    user_detected: {
        type: String,
        required: true,
        trim: true
    },
    auth_status: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('AuthReq', authReqSchema);