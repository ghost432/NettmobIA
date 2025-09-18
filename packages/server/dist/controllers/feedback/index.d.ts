import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllChatMessageFeedback: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createChatMessageFeedbackForChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateChatMessageFeedbackForChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
