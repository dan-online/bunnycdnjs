/// <reference types="node" />
import { BunnyStorageClientConstructor, EdgeLocations, StorageListItem } from "./types";
export declare class BunnyStorageClient {
    apiKey: string;
    storageZoneName: string;
    cdnLocation: EdgeLocations;
    private endpoint;
    constructor(Options: BunnyStorageClientConstructor);
    List(path: string): Promise<StorageListItem[]>;
    Upload(path: string, filename: string, content: string | Buffer): Promise<unknown>;
    Download(path: string, filename: string, outputFilePath?: string, outputFileName?: string): Promise<unknown>;
}
export * from "./types";
//# sourceMappingURL=index.d.ts.map