import { NextFunction, Request, Response } from 'express';
declare const _default: {
    preload: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getToken: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    downloadInstaller: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    pullImage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    startContainer: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getImage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getContainer: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    listRunningContainers: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    stopContainer: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
