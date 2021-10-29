"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var index_1 = require("./index");
var CDN = new index_1.BunnyStorageClient({
    apiKey: "b082d727-395b-4c37-9ec42963d790-6fde-442c",
    storageZoneName: "media--s2",
    cdnLocation: "New York",
});
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var UploadFilename, UploadContent, UploadResult, ListResult, DownloadResult, DeleteResult;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("===== Testing upload =====");
                    UploadFilename = Math.random() + ".txt";
                    UploadContent = fs_1.default.createReadStream("README.md");
                    return [4 /*yield*/, CDN.Upload(".", UploadFilename, UploadContent)];
                case 1:
                    UploadResult = _b.sent();
                    if (UploadResult.Error) {
                        console.log("Upload failed:", UploadResult.Error.name);
                    }
                    else {
                        console.log("Upload passed:", UploadResult.HttpResponse.statusMessage);
                    }
                    console.log("===== Testing List =====");
                    return [4 /*yield*/, CDN.List(".")];
                case 2:
                    ListResult = _b.sent();
                    if (ListResult.Error) {
                        console.log("List failed:", ListResult.Error.name);
                    }
                    else {
                        console.log("List passed:", (_a = ListResult.Data) === null || _a === void 0 ? void 0 : _a.length, "items");
                    }
                    console.log("===== Testing Download =====");
                    return [4 /*yield*/, CDN.Download(".", "wallpaper.png")];
                case 3:
                    DownloadResult = _b.sent();
                    if (DownloadResult.Error) {
                        console.log("Download failed:", DownloadResult.Error.name);
                    }
                    else {
                        console.log("Download passed:", DownloadResult.HttpResponse.statusMessage);
                    }
                    console.log("===== Testing Delete =====");
                    return [4 /*yield*/, CDN.Delete(".", UploadFilename)];
                case 4:
                    DeleteResult = _b.sent();
                    if (DeleteResult.Error) {
                        console.log("Delete failed:", DeleteResult.Error.name);
                    }
                    else {
                        console.log("Delete passed:", DeleteResult.HttpResponse.statusMessage);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=index.test.js.map