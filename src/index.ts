import axios from "axios";
import fs from "fs";
import { BunnyStorageClientConstructor, StorageListItem } from "./types";

const GeneralEndPoint = "https://storage.bunnycdn.com";

const LocationsEndpoints = {
  Falkenstein: "https://storage.bunnycdn.com",
  "New York": "https://ny.storage.bunnycdn.com",
  "Los Angeles": "https://la.storage.bunnycdn.com",
  Singapore: "https://sg.storage.bunnycdn.com",
  Sydney: "https://syd.storage.bunnycdn.com",
};

export class BunnyStorageClient {
  apiKey: string;
  storageZoneName: string;

  constructor(Options: BunnyStorageClientConstructor) {
    this.storageZoneName = Options.storageZoneName;
    this.apiKey = Options.apiKey;
  }

  async List(path: string): Promise<StorageListItem[]> {
    let url = `${GeneralEndPoint}/${this.storageZoneName}/${path}`;

    let res = await axios.get(url, {
      method: "GET",
      headers: {
        AccessKey: this.apiKey,
        Accept: "*/*",
      },
    });

    return res.data;
  }
}