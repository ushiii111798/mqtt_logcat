import mongoose from "mongoose";

const LogDataSchema = new mongoose.Schema({
    cmd: String,
    messageId: String,
    qos: String,
    dup: String,
    topic: String,
    payload: Object,
    retain: String,
});

export const LogData = mongoose.model("LogData", LogDataSchema, "LogData");
