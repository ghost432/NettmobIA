import { NextFunction, Request, Response } from 'express';
import { IChatFlow } from '../Interface';
export declare class RateLimiterManager {
    private rateLimiters;
    private rateLimiterMutex;
    private redisClient;
    private static instance;
    private queueEventsProducer;
    private queueEvents;
    constructor();
    getConnection(): {
        url: string;
        host: string;
        port: number;
        username: string;
        password: string;
        tls: any;
        maxRetriesPerRequest: any;
        enableReadyCheck: boolean;
        keepAlive: number;
    };
    static getInstance(): RateLimiterManager;
    addRateLimiter(id: string, duration: number, limit: number, message: string): Promise<void>;
    removeRateLimiter(id: string): void;
    getRateLimiter(): (req: Request, res: Response, next: NextFunction) => void;
    updateRateLimiter(chatFlow: IChatFlow, isInitialized?: boolean): Promise<void>;
    initializeRateLimiters(chatflows: IChatFlow[]): Promise<void>;
}
