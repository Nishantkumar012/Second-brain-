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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.User.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already exists"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield db_1.User.findOne({
            username: username,
            password: password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET);
            res.json({
                token,
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.Content.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    //@ts-ignore
    console.log("Deleting content with ID:", contentId, "for user:", req.userId);
    yield db_1.Content.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
}));
// app.post("/api/v1/brain/share", userMiddleware,async(req,res)=>{
//             const share = req.body.share;
//             if(share) {
//                 const existingLink = await Link.findOne({
//                    //@ts-ignore     
//                   userId: req.userId
//                 })
//                    if(existingLink){
//                          res.json({
//                    //@ts-ignore     
//                           hash: exsistingLink.hash
//                          })
//                          return;
//                    }
//                   const hash = random(10);
//                   await Link.create({
//                           //@ts-ignore
//                          userId: req.userId,
//                          hash
//                   })
//             } else{
//                await Link.deleteOne({
//                  //@ts-ignore
//                     userId: req.userId
//                });
//                res.json({
//                    //@ts-ignore     
//                 hash
//                })
//             }
// })
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Link.findOne({
            // @ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                // @ts-ignore
                hash: existingLink.hash,
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.Link.create({
            // @ts-ignore
            userId: req.userId,
            hash,
        });
        res.json({
            hash,
        });
    }
    else {
        yield db_1.Link.deleteOne({
            // @ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Shareable link deleted",
        }); // ✅ sends confirmation after deletion
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.Link.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.Content.find({
        //@ts-ignore
        userId: link.userId,
    });
    const user = yield db_1.User.findOne({
        //@ts-ignore
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
function customCors() {
    throw new Error("Function not implemented.");
}
