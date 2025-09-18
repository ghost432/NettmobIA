import { Request, Response, NextFunction } from 'express';
declare const _default: {
    upsertVectorMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createInternalUpsert: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getRateLimiterMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
