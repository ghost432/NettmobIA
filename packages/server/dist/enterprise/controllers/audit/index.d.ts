import { NextFunction, Request, Response } from 'express';
declare const _default: {
    fetchLoginActivity: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteLoginActivity: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
