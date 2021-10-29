import fs from "fs";
import { BunnyStorageClient } from "./index";

const CDN = new BunnyStorageClient({
  apiKey: "b082d727-395b-4c37-9ec42963d790-6fde-442c",
  storageZoneName: "media--s2",
  cdnLocation: "New York",
});

async function main() {
  console.log("===== Testing upload =====");

  let UploadFilename = Math.random() + ".txt";
  let UploadContent = fs.createReadStream("README.md");
  let UploadResult = await CDN.Upload(".", UploadFilename, UploadContent);

  if (UploadResult.Error) {
    console.log("Upload failed:", UploadResult.Error.name);
  } else {
    console.log("Upload passed:", UploadResult.HttpResponse.statusMessage);
  }

  console.log("===== Testing List =====");

  let ListResult = await CDN.List(".");

  if (ListResult.Error) {
    console.log("List failed:", ListResult.Error.name);
  } else {
    console.log("List passed:", ListResult.Data?.length, "items");
  }

  console.log("===== Testing Download =====");

  let DownloadResult = await CDN.Download(".", "wallpaper.png");

  if (DownloadResult.Error) {
    console.log("Download failed:", DownloadResult.Error.name);
  } else {
    console.log("Download passed:", DownloadResult.HttpResponse.statusMessage);
  }

  console.log("===== Testing Delete =====");

  let DeleteResult = await CDN.Delete(".", UploadFilename);

  if (DeleteResult.Error) {
    console.log("Delete failed:", DeleteResult.Error.name);
  } else {
    console.log("Delete passed:", DeleteResult.HttpResponse.statusMessage);
  }
}

main();