import { NextFunction, Request, Response } from 'express';
declare const _default: {
    checkIfChatflowIsValidForStreaming: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    checkIfChatflowIsValidForUploads: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllChatflows: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getChatflowByApiKey: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getChatflowById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    saveChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getSinglePublicChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getSinglePublicChatbotConfig: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    checkIfChatflowHasChanged: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
