declare const _default: {
    getAllComponentsCredentials: () => Promise<any>;
    getComponentByName: (credentialName: string) => Promise<any[] | import("flowise-components").INode>;
    getSingleComponentsCredentialIcon: (credentialName: string) => Promise<string>;
};
export default _default;
