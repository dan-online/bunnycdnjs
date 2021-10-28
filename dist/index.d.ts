/// <reference types="node" />
import { BunnyStorageClientConstructor, EdgeLocations, StorageListItem, APIResponse } from "./types";
export declare class BunnyStorageClient {
    apiKey: string;
    storageZoneName: string;
    cdnLocation: EdgeLocations;
    private endpoint;
    constructor(Options: BunnyStorageClientConstructor);
    List(path: string): Promise<StorageListItem[]>;
    Upload(path: string, filename: string, content: string | Buffer): Promise<APIResponse>;
    Download(path: string, filename: string, outputFilePath?: string, outputFileName?: string): Promise<boolean>;
    Delete(path: string, filename: string): Promise<APIResponse>;
}
export * from "./types";
//# sourceMappingURL=index.d.ts.map