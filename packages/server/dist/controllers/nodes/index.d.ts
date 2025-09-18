import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllNodes: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getNodeByName: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getSingleNodeIcon: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleNodeAsyncOptions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    executeCustomFunction: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getNodesByCategory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
