import fs, { ReadStream } from "fs";
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

  async List(path: string): Promise<APIResponse<StorageListItem[]>> {
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
        let HttpResponse = res;
        let _Error = err;
        let IsLocalError = false;
        let Data;

        try {
          let parsed = JSON.parse(body);
          Data = parsed;
        } catch (err) {
          _Error = err;
          IsLocalError = true;
        }

        resolve({
          HttpResponse,
          Error: _Error,
          IsLocalError,
          Data,
        });
      };

      request(url, options, handle);
    });
  }

  async Upload(
    path: string,
    filename: string,
    content: string | ReadStream
  ): Promise<APIResponse<any>> {
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
        let HttpResponse = res;
        let _Error = err;
        let IsLocalError = false;
        let Data;

        try {
          let parsed = JSON.parse(body);
          Data = parsed;
        } catch (err) {
          _Error = err;
          IsLocalError = true;
        }

        resolve({
          HttpResponse,
          Error: _Error,
          IsLocalError,
          Data,
        });
      };

      request(url, options, handle);
    });
  }

  async Download(
    path: string,
    filename: string,
    outputFilePath?: string,
    outputFileName?: string
  ): Promise<APIResponse<any>> {
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

      let handle: request.RequestCallback = (err, res, body) => {
        resolve({
          HttpResponse: res,
          Error: err
        })
      };

      let req = request(url, options, handle);
      let FileStream = fs.createWriteStream(toSaveFullPath);

      FileStream.once("finish", () => {
        FileStream.close();
      });

      FileStream.once("error", () => {
        FileStream.close();
      });

      req.pipe(FileStream);
    });
  }

  async Delete(path: string, filename: string): Promise<APIResponse<any>> {
    let url = `${this.endpoint}/${this.storageZoneName}/${path}/${filename}`;

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "DELETE",
        headers: {
          AccessKey: this.apiKey,
        },
      };

      let handle: request.RequestCallback = (err, res, body) => {
        let HttpResponse = res;
        let _Error = err;
        let IsLocalError = false;
        let Data;

        try {
          let parsed = JSON.parse(body);
          let success = parsed.HttpCode == 200;

          if (!success) {
            _Error = new Error(parsed.Message);
          }
        } catch (err) {
          _Error = err;
          IsLocalError = true;
        }

        resolve({
          HttpResponse,
          Error: _Error,
          IsLocalError,
          Data,
        });
      };

      request(url, options, handle);
    });
  }
}

export * from "./types";
