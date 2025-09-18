import { Request } from 'express';
import { IExecuteFlowParams } from '../Interface';
export declare const executeFlow: ({ componentNodes, incomingInput, chatflow, chatId, isEvaluation, evaluationRunId, appDataSource, telemetry, cachePool, usageCacheManager, sseStreamer, baseURL, isInternal, files, signal, isTool, orgId, workspaceId, subscriptionId, productId }: IExecuteFlowParams) => Promise<any>;
/**
 * Build/Data Preperation for execute function
 * @param {Request} req
 * @param {boolean} isInternal
 */
export declare const utilBuildChatflow: (req: Request, isInternal?: boolean) => Promise<any>;
