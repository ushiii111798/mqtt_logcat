import mongoose from "mongoose";

const LogConnectSchema = new mongoose.Schema({
    cmd: String,
    messageId: String,
    qos: String,
    dup: String,
    topic: String,
    payload: String,
    retain: String,
});

export const LogConnect = mongoose.model(
    "LogConnect",
    LogConnectSchema,
    "LogConnect"
);
