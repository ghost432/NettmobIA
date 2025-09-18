import { Request, Response, NextFunction } from 'express';
declare const _default: {
    getAllDatasets: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getDataset: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createDataset: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateDataset: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteDataset: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addDatasetRow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateDatasetRow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteDatasetRow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    patchDeleteRows: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    reorderDatasetRow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
