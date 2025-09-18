declare const _default: {
    getAllNodes: () => Promise<any[]>;
    getNodeByName: (nodeName: string) => Promise<import("flowise-components").INode>;
    getSingleNodeIcon: (nodeName: string) => Promise<string>;
    getSingleNodeAsyncOptions: (nodeName: string, requestBody: any) => Promise<any>;
    executeCustomFunction: (requestBody: any, workspaceId?: string, orgId?: string) => Promise<any>;
    getAllNodesForCategory: (category: string) => Promise<any[]>;
};
export default _default;
