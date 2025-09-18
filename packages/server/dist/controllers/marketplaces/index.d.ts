import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllTemplates: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllCustomTemplates: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    saveCustomTemplate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteCustomTemplate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
