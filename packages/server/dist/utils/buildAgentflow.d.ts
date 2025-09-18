import { ICommonObject, IMessage } from 'flowise-components';
import { IncomingAgentflowInput, INodeData, IExecuteFlowParams, IFlowConfig, IAgentflowExecutedData, IVariableOverride } from '../Interface';
import { Variable } from '../database/entities/Variable';
interface IExecuteAgentFlowParams extends Omit<IExecuteFlowParams, 'incomingInput'> {
    incomingInput: IncomingAgentflowInput;
}
export declare const resolveVariables: (reactFlowNodeData: INodeData, question: string, form: Record<string, any>, flowConfig: IFlowConfig | undefined, availableVariables: Variable[], variableOverrides: IVariableOverride[], uploadedFilesContent: string, chatHistory: IMessage[], agentFlowExecutedData?: IAgentflowExecutedData[], iterationContext?: ICommonObject) => Promise<INodeData>;
export declare const executeAgentFlow: ({ componentNodes, incomingInput, chatflow, chatId, evaluationRunId, appDataSource, telemetry, usageCacheManager, cachePool, sseStreamer, baseURL, isInternal, uploadedFilesContent, fileUploads, signal: abortController, isRecursive, parentExecutionId, iterationContext, isTool, orgId, workspaceId, subscriptionId, productId }: IExecuteAgentFlowParams) => Promise<ICommonObject>;
export {};
