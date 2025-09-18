import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllComponentsCredentials: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getComponentByName: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getSingleComponentsCredentialIcon: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
