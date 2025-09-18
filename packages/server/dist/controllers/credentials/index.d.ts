import { Request, Response, NextFunction } from 'express';
declare const _default: {
    createCredential: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteCredentials: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAllCredentials: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getCredentialById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateCredential: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
