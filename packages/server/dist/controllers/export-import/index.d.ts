import { NextFunction, Request, Response } from 'express';
declare const _default: {
    exportData: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    importData: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
