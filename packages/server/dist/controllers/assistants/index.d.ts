import { NextFunction, Request, Response } from 'express';
declare const _default: {
    createAssistant: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteAssistant: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllAssistants: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAssistantById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateAssistant: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getChatModels: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getDocumentStores: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getTools: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    generateAssistantInstruction: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
