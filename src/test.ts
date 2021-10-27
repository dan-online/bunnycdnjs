import { BunnyStorageClient } from "./index";
import fs from "fs";

function LogFile(name: string, data: any) {
  fs.writeFileSync("test/" + name, JSON.stringify(data, null, 2));
}

async function test() {
  let TestClient = new BunnyStorageClient({
    apiKey: "545ecbfd-33cc-4c43-b63399ff9da7-cf89-4b3f",
    storageZoneName: "media--s1",
  });

  let RootFiles = await TestClient.List(".");
  await Promise.all(RootFiles.map((file) => new Promise(async (resolve) => {
    TestClient.Download(".", file.ObjectName);
  })));
}

test();
