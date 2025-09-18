import { Request, Response, NextFunction } from 'express';
export declare class OrganizationController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    read(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAdditionalSeatsQuantity(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getCustomerWithDefaultSource(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAdditionalSeatsProration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getPlanProration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateAdditionalSeats(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateSubscriptionPlan(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getCurrentUsage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
