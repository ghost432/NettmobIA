import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createVariable: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteVariable: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllVariables: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateVariable: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
