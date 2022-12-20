import { Request, Response, NextFunction } from "express";
import jtw from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jtw.verify(token, process.env.SECRET_KEY, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
    req.user = {
      id: decoded.sub as string,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default authMiddleware;
