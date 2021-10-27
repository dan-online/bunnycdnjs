export declare type EdgeLocations = "Falkenstein" | "New York" | "Los Angeles" | "Singapore" | "Sydney";
export interface BunnyStorageClientConstructor {
    storageZoneName: string;
    apiKey: string;
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
//# sourceMappingURL=types.d.ts.map