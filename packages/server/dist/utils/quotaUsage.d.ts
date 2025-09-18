import { UsageCacheManager } from '../UsageCacheManager';
type UsageType = 'flows' | 'users';
export declare const ENTERPRISE_FEATURE_FLAGS: string[];
export declare const getCurrentUsage: (orgId: string, subscriptionId: string, usageCacheManager: UsageCacheManager) => Promise<{
    predictions: {
        usage: unknown;
        limit: number;
    };
    storage: {
        usage: unknown;
        limit: number;
    };
}>;
export declare const checkUsageLimit: (type: UsageType, subscriptionId: string, usageCacheManager: UsageCacheManager, currentUsage: number) => Promise<void>;
export declare const updatePredictionsUsage: (orgId: string, subscriptionId: string, _?: string, usageCacheManager?: UsageCacheManager) => Promise<void>;
export declare const checkPredictions: (orgId: string, subscriptionId: string, usageCacheManager: UsageCacheManager) => Promise<{
    usage: number;
    limit: number;
}>;
export declare const updateStorageUsage: (orgId: string, _: string, totalSize: number, usageCacheManager?: UsageCacheManager) => void;
export declare const checkStorage: (orgId: string, subscriptionId: string, usageCacheManager: UsageCacheManager) => Promise<{
    usage: number;
    limit: number;
}>;
export {};
