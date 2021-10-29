/// <reference types="node" />
import { ReadStream } from "fs";
import { BunnyStorageClientConstructor, EdgeLocations, StorageListItem, APIResponse } from "./types";
export declare class BunnyStorageClient {
    apiKey: string;
    storageZoneName: string;
    cdnLocation: EdgeLocations;
    private endpoint;
    constructor(Options: BunnyStorageClientConstructor);
    List(path: string): Promise<APIResponse<StorageListItem[]>>;
    Upload(path: string, filename: string, content: string | ReadStream): Promise<APIResponse<any>>;
    Download(path: string, filename: string, outputFilePath?: string, outputFileName?: string): Promise<APIResponse<any>>;
    Delete(path: string, filename: string): Promise<APIResponse<any>>;
}
export * from "./types";
//# sourceMappingURL=index.d.ts.map