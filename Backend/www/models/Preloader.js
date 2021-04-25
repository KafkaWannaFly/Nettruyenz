"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const Schema = mongoose_1.default.Schema;
const url = `mongodb+srv://${EnvironmentConstants_1.DB_USERNAME}:${EnvironmentConstants_1.DB_PASSWORD}@${EnvironmentConstants_1.DB_HOST}/${EnvironmentConstants_1.DB_NAME}`;
/**
 * Important! Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
 */
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.default = mongoose_1.default;
