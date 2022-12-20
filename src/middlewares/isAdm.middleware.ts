import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.user.isAdm;

  if (!isAdm) {
    return res.status(403).json({ message: "User dont have authorization" });
  }

  return next();
};

export default isAdmMiddleware;
