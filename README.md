# BunnyJS / BunnyCDNJS

is a unoficial NodeJS client for the BunnyCDN API.

# Why ?

I always use BunnyCDN in my projects, but there's no oficial library for NodeJS, so i decide to make my own.

# Installation

With NPM:

```cli
npm i bunnycdnjs
```

yarn soon, sorry

# Get started

Using Require:

```js
const { BunnyStorageClient } = require("bunnycdnjs");
```

Using Import:

```ts
import { BunnyStorageClient } from "bunnycdnjs";
```

# Create Storage

You can find your apiKey at: `FTP & API Access > Password`

```js
const CDN = new BunnyStorageClient({
  apiKey: process.env.BUNNY_STORAGE_PASSWORD_KEY, // eg: "515qdnsd-3ghc-1c43-bd339jff9ga7-cd89-4b6f"
  storageZoneName: "myassets",
  cdnLocation: "New York",
});
```

# List Usage

```js
async function ListMyStorageRootFolder() {
  let RootFiles = await CDN.List(".");

  for (const File of RootFiles) {
    console.log(`Name: ${File.ObjectName} Size: ${File.Length}`);
  }
}

ListMyStorageRootFolder();
```

# Download Usage

```js
async function SaveMyAssetsLocally() {
  let AssetsFiles = await CDN.List("Assets");

  for (const File of AssetsFiles) {
    await CDN.Download("Assets", File.ObjectName);
    // Saved at: downloads/Assets

    // OR

    await CDN.Download("Assets", File.ObjectName, "media", File.ObjectName);
    // Saved at: media
  }
}

SaveMyAssetsLocally();
```

# Download Usage

```js
async function SaveMyAssetsLocally() {
  let AssetsFiles = await CDN.List("Assets");

  for (const File of AssetsFiles) {
    await CDN.Download("Assets", File.ObjectName);
    // Saved at: downloads/Assets

    // OR

    await CDN.Download("Assets", File.ObjectName, "media", File.ObjectName);
    // Saved at: media
  }
}

SaveMyAssetsLocally();
```

# Upload Usage

```js
async function SaveMyAssetsRemotelly() {
  let LocalAssetsFiles = fs.readdirSync("LocalAssets");

  for (const FileName of LocalAssetsFiles) {
    let content = fs.createReadStream("LocalAssets/" + FileName);
    let uploadResult = await CDN.Upload("Assets", FileName, content);

    if (uploadResult.Error) {
      console.log(FileName, "upload failed");
    }
  }
}

SaveMyAssetsRemotelly();
```

# Delete Usage

```js
async function ClearMyRemoteAssetsFolder() {
  let AssetsFiles = await CDN.List("Assets");

  if (AssetsFiles.Data) {
    for (const File of AssetsFiles.Data) {
      let deleteResult = await CDN.Delete("Assets", File.ObjectName);

      if (deleteResult.Error) {
        console.log("delete", File.ObjectName, "failed");
      }
    }
  } else if (AssetsFiles.Error) {
    console.log("Get assets files failed");
  }
}

ClearMyRemoteAssetsFolder();
```
