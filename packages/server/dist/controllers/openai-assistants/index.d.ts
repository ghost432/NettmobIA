import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllOpenaiAssistants: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getSingleOpenaiAssistant: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getFileFromAssistant: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    uploadAssistantFiles: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
