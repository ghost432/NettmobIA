import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createChatMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllChatMessages: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllInternalChatMessages: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    removeAllChatMessages: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    abortChatMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
