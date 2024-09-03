// src/express-session.d.ts
import * as express from 'express';

declare module 'express-session' {
  interface SessionData {
    id?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session?: express.Session & Partial<express.SessionData>;
    }
  }
}
