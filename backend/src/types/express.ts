import { Request as Req, Response as Res, NextFunction as Next } from "express";

interface User {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export type Request = Req & User;
export type Response = Res & User;
export type NextFunction = Next;