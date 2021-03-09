"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromStorage = exports.writeStorage = exports.isTypeOfLocalStorageChanged = exports.LocalStorageChanged = void 0;
var storage_1 = require("./storage");
/**
 * Used for creating new events for LocalStorage. This enables us to
 * have the ability of updating the LocalStorage from outside of the component,
 * but still update the component without prop drilling or creating a dependency
 * on a large library such as Redux.
 *
 * @class LocalStorageChanged
 * @extends {CustomEvent<KVP<string, string>>}
 */
var LocalStorageChanged = /** @class */ (function (_super) {
    __extends(LocalStorageChanged, _super);
    function LocalStorageChanged(payload) {
        return _super.call(this, LocalStorageChanged.eventName, { detail: payload }) || this;
    }
    LocalStorageChanged.eventName = 'onLocalStorageChange';
    return LocalStorageChanged;
}(CustomEvent));
exports.LocalStorageChanged = LocalStorageChanged;
/**
 * Checks if the event that is passed in is the same type as LocalStorageChanged.
 *
 * @export
 * @template TValue
 * @param {*} evt the object you wish to assert as a LocalStorageChanged event.
 * @returns {evt is LocalStorageChanged<TValue>} if true, evt is asserted to be LocalStorageChanged.
 */
function isTypeOfLocalStorageChanged(evt) {
    return (!!evt) && (evt instanceof LocalStorageChanged || (evt.detail && evt.type === LocalStorageChanged.eventName));
}
exports.isTypeOfLocalStorageChanged = isTypeOfLocalStorageChanged;
/**
 * Use this instead of directly using localStorage.setItem
 * in order to correctly send events within the same window.
 *
 * @example
 * ```js
 * writeStorage('hello', JSON.stringify({ name: 'world' }));
 * const { name } = JSON.parse(localStorage.getItem('hello'));
 * ```
 *
 * @export
 * @param {string} key The key to write to in the localStorage.
 * @param {string} value The value to write to in the localStorage.
 */
function writeStorage(key, value) {
    try {
        storage_1.storage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : "" + value);
        window.dispatchEvent(new LocalStorageChanged({ key: key, value: value }));
    }
    catch (err) {
        if (err instanceof TypeError && err.message.includes('circular structure')) {
            throw new TypeError('The object that was given to the writeStorage function has circular references.\n' +
                'For more information, check here: ' +
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value');
        }
        throw err;
    }
}
exports.writeStorage = writeStorage;
/**
 * Use this function to delete a value from localStorage.
 *
 * After calling this function, the localStorage value will be null.
 *
 * @example
 * ```js
 * const user = { name: 'John', email: 'John@fakemail.com' };
 *
 * // Add a user to your localStorage
 * writeStorage('user', JSON.stringify(user));
 *
 * // This will also trigger an update to the state of your component
 * deleteFromStorage('user');
 *
 * localStorage.getItem('user') === null // ✔ This is now null
 * ```
 *
 * @export
 * @param {string} key The key of the item you wish to delete from localStorage.
 */
function deleteFromStorage(key) {
    storage_1.storage.removeItem(key);
    window.dispatchEvent(new LocalStorageChanged({ key: key, value: null }));
}
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=local-storage-events.js.map