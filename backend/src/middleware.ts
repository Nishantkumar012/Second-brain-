
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers["authorization"];

    if (!header) {
        //@ts-ignore
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);

        // If token is valid, attach userId to the request object
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ message: "You are not logged in" });
    }
};







// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from './config';

// export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const header = req.headers["authorization"];

//     if (!header) {
//         return res.status(401).json({ message: "Authorization header missing" });
//     }

//     const token = header.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token as string, JWT_SECRET);

//         //@ts-ignore
//         req.userId = decoded.id;
//         next();
//     } catch (err) {
//         res.status(403).json({ message: "Invalid or expired token" });
//     }
// };
