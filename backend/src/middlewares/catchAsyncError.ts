import {Request, Response, NextFunction} from "../types/express";

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export default (theFunc: MiddlewareFunction): MiddlewareFunction => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(theFunc(req, res, next)).catch(next);
};
