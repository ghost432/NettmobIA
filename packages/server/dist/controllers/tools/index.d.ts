import { NextFunction, Request, Response } from 'express';
declare const _default: {
    createTool: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteTool: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllTools: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getToolById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateTool: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
