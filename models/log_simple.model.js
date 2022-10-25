import mongoose from "mongoose";

const LogSimpleSchema = new mongoose.Schema({
    cmd: String,
    messageId: String,
    qos: String,
    dup: String,
    topic: String,
    payload: String,
    retain: String,
});

export const LogSimple = mongoose.model(
    "LogSimple",
    LogSimpleSchema,
    "LogSimple"
);
