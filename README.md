BunnyJS is a unoficial NodeJS client for the BunnyCDN API.

# Why ?

I always use BunnyCDN in my projects, but there's no oficial library for NodeJS, so i decide to make my own.

# Installation

With NPM:
```cli
npm i 
```

# Usage

Using Require:
```js
const { BunnyStorageClient } = require("bunnycdnjs");
const CDN = new BunnyStorageClient({
  apiKey: YOUR_KEY_HERE, // eg: "5g5ednfd-3gcc-4c43-b33399ff9da7-cf89-4b3f"
  storageZoneName: YOUR_STORAGE, // eg: "myassets"
});

(async () => {
  let RootFiles = await CDN.List(".");
  RootFiles.forEach((file) => {
    console.log(file.ObjectName);
  });
})();

```