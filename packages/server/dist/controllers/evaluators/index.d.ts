import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllEvaluators: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getEvaluator: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createEvaluator: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateEvaluator: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteEvaluator: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
