import {Schema, model} from "mongoose";

const accessGroupSchema = new Schema({
    group_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    user_allowed: {
        type: Array,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('AccessGroup', accessGroupSchema);