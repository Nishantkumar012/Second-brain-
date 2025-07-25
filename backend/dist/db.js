"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.Link = exports.Tag = exports.User = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// import  MONGO_URI  from './env'; // Removed, using dotenv and process.env instead
// tqTXhaamw5Fw2bSV
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        console.log('Connecting to MongoDB...', MONGO_URI);
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit process if connection fails
    }
});
exports.connectDB = connectDB;
// Define the allowed content types
const contentTypes = ['images', 'video', 'article', 'audio'];
// User Schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Tag Schema
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
});
// Link Schema
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true,
        unique: true
    },
});
// Content Schema
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
// Models
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
const Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
const Content = mongoose_1.default.model('Content', contentSchema);
exports.Content = Content;
