"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.BunnyStorageClient = void 0;
var fs_1 = __importDefault(require("fs"));
var request_1 = __importDefault(require("request"));
var path_1 = __importDefault(require("path"));
var LocationsEndpoints = {
    Main: "https://storage.bunnycdn.com",
    Falkenstein: "https://storage.bunnycdn.com",
    "New York": "https://ny.storage.bunnycdn.com",
    "Los Angeles": "https://la.storage.bunnycdn.com",
    Singapore: "https://sg.storage.bunnycdn.com",
    Sydney: "https://syd.storage.bunnycdn.com",
};
var BunnyStorageClient = /** @class */ (function () {
    function BunnyStorageClient(Options) {
        this.storageZoneName = Options.storageZoneName;
        this.apiKey = Options.apiKey;
        this.cdnLocation = Options.cdnLocation;
        this.endpoint = LocationsEndpoints[this.cdnLocation];
    }
    BunnyStorageClient.prototype.List = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                url = this.endpoint + "/" + this.storageZoneName + "/" + path + "/";
                return [2 /*return*/, new Promise(function (resolve) {
                        var options = {
                            method: "GET",
                            headers: {
                                AccessKey: _this.apiKey,
                                Accept: "*/*",
                            },
                        };
                        var handle = function (err, res, body) {
                            resolve(JSON.parse(body));
                        };
                        (0, request_1.default)(url, options, handle);
                    })];
            });
        });
    };
    BunnyStorageClient.prototype.Upload = function (path, filename, content) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                url = this.endpoint + "/" + this.storageZoneName + "/" + path + "/" + filename;
                return [2 /*return*/, new Promise(function (resolve) {
                        var options = {
                            method: "PUT",
                            headers: {
                                AccessKey: _this.apiKey,
                            },
                            body: content,
                        };
                        var handle = function (err, res, body) {
                            resolve(JSON.parse(body));
                        };
                        (0, request_1.default)(url, options, handle);
                    })];
            });
        });
    };
    BunnyStorageClient.prototype.Download = function (path, filename, outputFilePath, outputFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var url, toSavePath, toSaveFilename, toSaveFullPath;
            var _this = this;
            return __generator(this, function (_a) {
                url = this.endpoint + "/" + this.storageZoneName + "/" + path + "/" + filename;
                toSavePath = "downloads";
                toSaveFilename = "untitled";
                if (outputFilePath && outputFileName) {
                    toSavePath = outputFilePath;
                    toSaveFilename = outputFileName;
                }
                else {
                    toSavePath = path_1.default.join("downloads", path);
                    toSaveFilename = filename;
                }
                if (!fs_1.default.existsSync(toSavePath)) {
                    fs_1.default.mkdirSync(toSavePath, { recursive: true });
                }
                toSaveFullPath = path_1.default.join(toSavePath, toSaveFilename);
                return [2 /*return*/, new Promise(function (resolve) {
                        var options = {
                            method: "GET",
                            headers: {
                                AccessKey: _this.apiKey,
                            },
                        };
                        var req = (0, request_1.default)(url, options);
                        var FileStream = fs_1.default.createWriteStream(toSaveFullPath);
                        req.pipe(FileStream);
                        FileStream.once("finish", function () {
                            resolve(true);
                            FileStream.close();
                        });
                        FileStream.once("error", function () {
                            resolve(false);
                            FileStream.close();
                        });
                    })];
            });
        });
    };
    return BunnyStorageClient;
}());
exports.BunnyStorageClient = BunnyStorageClient;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map