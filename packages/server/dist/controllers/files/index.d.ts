import { NextFunction, Request, Response } from 'express';
declare const _default: {
    getAllFiles: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteFile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
