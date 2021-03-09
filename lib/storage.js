"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemoryStorageProxy = exports.SessionStorageProxy = exports.LocalStorageProxy = exports.localStorageAvailable = void 0;
/**
 * Test if localStorage API is available
 * From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 * @returns {boolean}
 */
function localStorageAvailable() {
    try {
        var x = '@rehooks/local-storage:' + new Date().toISOString();
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (localStorage && localStorage.length !== 0);
    }
}
exports.localStorageAvailable = localStorageAvailable;
var LocalStorageProxy = /** @class */ (function () {
    function LocalStorageProxy() {
    }
    LocalStorageProxy.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageProxy.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };
    LocalStorageProxy.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    return LocalStorageProxy;
}());
exports.LocalStorageProxy = LocalStorageProxy;
var SessionStorageProxy = /** @class */ (function () {
    function SessionStorageProxy() {
    }
    SessionStorageProxy.prototype.getItem = function (key) {
        return sessionStorage.getItem(key);
    };
    SessionStorageProxy.prototype.setItem = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    SessionStorageProxy.prototype.removeItem = function (key) {
        sessionStorage.removeItem(key);
    };
    return SessionStorageProxy;
}());
exports.SessionStorageProxy = SessionStorageProxy;
var MemoryStorageProxy = /** @class */ (function () {
    function MemoryStorageProxy() {
        this._memoryStorage = new Map();
    }
    MemoryStorageProxy.prototype.getItem = function (key) {
        var _a;
        return (_a = this._memoryStorage.get(key)) !== null && _a !== void 0 ? _a : null;
    };
    MemoryStorageProxy.prototype.setItem = function (key, value) {
        this._memoryStorage.set(key, value);
    };
    MemoryStorageProxy.prototype.removeItem = function (key) {
        this._memoryStorage.delete(key);
    };
    return MemoryStorageProxy;
}());
exports.MemoryStorageProxy = MemoryStorageProxy;
var proxyStorageFrom = function () { return new SessionStorageProxy(); };
exports.storage = proxyStorageFrom();
//# sourceMappingURL=storage.js.map