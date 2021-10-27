import fs from "fs";
import request from "request";
import nodepath from "path";
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

  async Upload(path: string, filename: string, content: string | Buffer) {
    let url = `${GeneralEndPoint}/${this.storageZoneName}/${path}/${filename}`;

    return new Promise((resolve) => {
      let options: request.CoreOptions = {
        method: "PUT",
        headers: {
          AccessKey: this.apiKey,
        },
        body: content,
      };

      let handle: request.RequestCallback = (err, res, body) => {
        resolve(JSON.parse(body));
      };

      request(url, options, handle);
    });
  }

  async Download(
    path: string,
    filename: string,
    outputFilePath?: string,
    outputFileName?: string
  ) {
    let url = `${GeneralEndPoint}/${this.storageZoneName}/${path}/${filename}`;

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
      req.pipe(FileStream);

      FileStream.once("finish", () => {
        resolve(true);
        FileStream.close();
      });

      FileStream.once("error", () => {
        resolve(false);
        FileStream.close();
      });
    });
  }
}
