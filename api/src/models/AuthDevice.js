import {Schema, model} from "mongoose";

const authDeviceSchema = new Schema({
    hostname: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rpi_serial: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    access_list: {
        type: Array,
        trim: true,
        default: [ "master_group" ]
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('AuthDevice', authDeviceSchema);