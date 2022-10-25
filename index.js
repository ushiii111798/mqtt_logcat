import mqtt from "mqtt";
import * as pk from "mqtt-packet";
import mongoose from "mongoose";
import { LogConnect } from "./models/log_connect.model.js";
import { LogSimple } from "./models/log_simple.model.js";
import { LogData } from "./models/log_data.model.js";

//DB Connection Setup
const dbConnOptions = {
    authSource: "admin",
    user: "USERNAME",
    pass: "PASSWORD",
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnUrl = "mongodb://DB_URL:DB_PORT/mqtt";

//Connect Database
mongoose.connect(dbConnUrl, dbConnOptions).catch((error) => {
    console.log(error);
});

const parser = pk.parser();

const client = mqtt.connect("mqtt://SERVER_URL");
client.on("connect", () => {
    client.subscribe(["log_simple", "log_data", "log_connect"]);
});
client.on("message", (topic, payload, packet) => {
    console.log(topic, payload.toString());
});

client.on("packetreceive", async (packet) => {
    if (packet.cmd === "publish") {
        const data = {
            cmd: packet.cmd,
            messageId: packet.messageId,
            qos: packet.qos,
            dup: packet.dup,
            topic: packet.topic,
            payload: "",
            retain: packet.retain,
        };
        if (packet.topic == "log_simple") {
            data.payload = packet.payload.toString();
            await new LogSimple(data).save();
            console.log(data);
        } else if (packet.topic == "log_data") {
            data.payload = JSON.parse(packet.payload);
            await new LogData(data).save();
            console.log(data);
        } else if (packet.topic == "log_connect") {
            data.payload = packet.payload.toString();
            await new LogConnect(data).save();
            console.log(data);
        }
    } else {
        console.log("?????? Why ??????");
    }
});
