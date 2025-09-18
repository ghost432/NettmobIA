import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllExecutions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteExecutions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getExecutionById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getPublicExecutionById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateExecution: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
