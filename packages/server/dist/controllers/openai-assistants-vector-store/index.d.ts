import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    listAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    uploadFilesToAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteFilesFromAssistantVectorStore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
