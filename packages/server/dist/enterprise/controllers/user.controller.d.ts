import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    read(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    test(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
