import { NextFunction, Request, Response } from 'express';
export declare class WorkspaceController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    read(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    switchWorkspace(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getSharedWorkspacesForItem(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    setSharedWorkspacesForItem(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
