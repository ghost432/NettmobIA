import { Request, Response, NextFunction } from 'express';
export declare class AccountController {
    register(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    invite(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    verify(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    resendVerificationEmail(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    createStripeCustomerPortalSession(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    cancelPreviousCloudSubscrption(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getBasicAuth(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    checkBasicAuth(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
