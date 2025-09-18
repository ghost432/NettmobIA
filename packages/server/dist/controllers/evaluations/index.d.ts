import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createEvaluation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getEvaluation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteEvaluation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllEvaluations: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    isOutdated: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    runAgain: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getVersions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    patchDeleteEvaluations: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
