import request from "request";
export declare type EdgeLocations = "Main" | "Falkenstein" | "New York" | "Los Angeles" | "Singapore" | "Sydney";
export interface BunnyStorageClientConstructor {
    storageZoneName: string;
    apiKey: string;
    cdnLocation: EdgeLocations;
}
export interface StorageListItem {
    Guid: string;
    StorageZoneName: string;
    Path: string;
    ObjectName: string;
    Length: number;
    LastChanged: string;
    ServerId: number;
    ArrayNumber: number;
    IsDirectory: boolean;
    UserId: string;
    ContentType: string;
    DateCreated: string;
    StorageZoneId: number;
    Checksum: string;
    ReplicatedZones: string;
}
export interface APIResponse<D> {
    HttpResponse: request.Response;
    Error?: Error;
    IsLocalError?: boolean;
    Data?: D;
}
//# sourceMappingURL=types.d.ts.map