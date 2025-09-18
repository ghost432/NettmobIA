import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllUpsertHistory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    patchDeleteUpsertHistory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
