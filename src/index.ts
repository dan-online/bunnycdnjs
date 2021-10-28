import fs from "fs";
import request from "request";
import nodepath from "path";
import {
  BunnyStorageClientConstructor,
  EdgeLocations,
  StorageListItem,
  APIResponse,
} from "./types";

const LocationsEndpoints = {
  Main: "https://storage.bunnycdn.com",
  Falkenstein: "https://storage.bunnycdn.com",
  "New York": "https://ny.storage.bunnycdn.com",
  "Los Angeles": "https://la.storage.bunnycdn.com",
  Singapore: "https://sg.storage.bunnycdn.com",
  Sydney: "https://syd.storage.bunnycdn.com",
};

export class BunnyStorageClient {
  apiKey: string;
  storageZoneName: string;
  cdnLocation: EdgeLocations;

  private endpoint: string;

  constructor(Options: BunnyStorageClientConstructor) {
    this.storageZoneName = Options.storageZoneName;
    this.apiKey = Options.apiKey;
    this.cdnLocation = Options.cdnLocation;
    this.endpoint = LocationsEndpoints[this.cdnLocation];
  }

  async List(path: string): Promise<StorageListItem[]> {
    let url = `${this.endpoint}/${this.storageZoneName}/${path}/`;

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "GET",
        headers: {
          AccessKey: this.apiKey,
          Accept: "*/*",
        },
      };

      let handle: request.RequestCallback = (err, res, body) => {
        resolve(JSON.parse(body));
      };

      request(url, options, handle);
    });
  }

  async Upload(
    path: string,
    filename: string,
    content: string | Buffer
  ): Promise<APIResponse> {
    let url = `${this.endpoint}/${this.storageZoneName}/${path}/${filename}`;

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "PUT",
        headers: {
          AccessKey: this.apiKey,
        },
        body: content,
      };

      let handle: request.RequestCallback = (err, res, body) => {
        try {
          let parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          resolve({
            HttpCode: 0,
            Message: "Upload: Error parsing api response",
          });
        }
      };

      request(url, options, handle);
    });
  }

  async Download(
    path: string,
    filename: string,
    outputFilePath?: string,
    outputFileName?: string
  ): Promise<boolean> {
    let url = `${this.endpoint}/${this.storageZoneName}/${path}/${filename}`;

    let toSavePath = "downloads";
    let toSaveFilename = "untitled";

    if (outputFilePath && outputFileName) {
      toSavePath = outputFilePath;
      toSaveFilename = outputFileName;
    } else {
      toSavePath = nodepath.join("downloads", path);
      toSaveFilename = filename;
    }

    if (!fs.existsSync(toSavePath)) {
      fs.mkdirSync(toSavePath, { recursive: true });
    }

    let toSaveFullPath = nodepath.join(toSavePath, toSaveFilename);

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "GET",
        headers: {
          AccessKey: this.apiKey,
        },
      };

      let req = request(url, options);
      let FileStream = fs.createWriteStream(toSaveFullPath);
      
      FileStream.once("finish", () => {
        FileStream.close();
        resolve(true);
      });

      FileStream.once("error", ()=>{
        FileStream.close();
        resolve(false);
      })

      req.pipe(FileStream);
    });
  }

  async Delete(path: string, filename: string): Promise<APIResponse> {
    let url = `${this.endpoint}/${this.storageZoneName}/${path}/${filename}`;

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "DELETE",
        headers: {
          AccessKey: this.apiKey,
        },
      };

      let handle: request.RequestCallback = (err, res, body) => {
        try {
          let parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          resolve({
            HttpCode: 0,
            Message: "Delete: Error parsing api response",
          });
        }
      };

      request(url, options, handle);
    });
  }
}

export * from "./types";
