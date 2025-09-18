import { NextFunction, Request, Response } from 'express';
export declare class LoginMethodController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    defaultMethods(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    read(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    testConfig(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
