import { Credential } from '../../database/entities/Credential';
declare const _default: {
    createCredential: (requestBody: any) => Promise<Credential>;
    deleteCredentials: (credentialId: string) => Promise<any>;
    getAllCredentials: (paramCredentialName: any, workspaceId?: string) => Promise<any[]>;
    getCredentialById: (credentialId: string, workspaceId?: string) => Promise<any>;
    updateCredential: (credentialId: string, requestBody: any) => Promise<any>;
};
export default _default;
