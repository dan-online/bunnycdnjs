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

# Usage

```js
// SECURITY ISSUE: USE ENVIRONMENT VARIABLES FOR API KEY !!!!!!!!!!!!!!
// LEARN MORE: https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa

const CDN = new BunnyStorageClient({
  apiKey: "5g5ednfd-3gcc-4c43-b33399ff9da7-cf89-4b3f",
  storageZoneName: "myassets",
  cdnLocation: "New York",
});

async function ListMyStorageRootFolder() {
  let RootFiles = await CDN.List(".");
  
  for (const File of RootFiles) {
    console.log(`Name: ${File.ObjectName} Size: ${File.Length}`);
  }
}

ListMyStorageRootFolder();
```