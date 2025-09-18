import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createApiKey: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteApiKey: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllApiKeys: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateApiKey: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    verifyApiKey: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    importKeys: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
