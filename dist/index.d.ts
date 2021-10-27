/// <reference types="node" />
import { BunnyStorageClientConstructor, StorageListItem } from "./types";
export declare class BunnyStorageClient {
    apiKey: string;
    storageZoneName: string;
    constructor(Options: BunnyStorageClientConstructor);
    List(path: string): Promise<StorageListItem[]>;
    Upload(path: string, filename: string, content: string | Buffer): Promise<unknown>;
    Download(path: string, filename: string, outputFilePath?: string, outputFileName?: string): Promise<unknown>;
}
//# sourceMappingURL=index.d.ts.map