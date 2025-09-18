import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createLeadInChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllLeadsForChatflow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
