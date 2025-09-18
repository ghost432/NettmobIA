import { NextFunction, Request, Response } from 'express';
export declare class OrganizationUserController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    read(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
