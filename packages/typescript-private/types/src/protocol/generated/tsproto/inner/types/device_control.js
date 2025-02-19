"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceControl = exports.DevicePosition = exports.deviceControlSequeceToJSON = exports.deviceControlSequeceFromJSON = exports.DeviceControlSequece = exports.deviceControlCopyKeyToJSON = exports.deviceControlCopyKeyFromJSON = exports.DeviceControlCopyKey = exports.deviceControlButtonToJSON = exports.deviceControlButtonFromJSON = exports.DeviceControlButton = exports.deviceControlKeycodeToJSON = exports.deviceControlKeycodeFromJSON = exports.DeviceControlKeycode = exports.deviceControlActionToJSON = exports.deviceControlActionFromJSON = exports.DeviceControlAction = exports.deviceControlMetaStateToJSON = exports.deviceControlMetaStateFromJSON = exports.DeviceControlMetaState = exports.deviceControlTypeToJSON = exports.deviceControlTypeFromJSON = exports.DeviceControlType = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
var DeviceControlType;
(function (DeviceControlType) {
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_TYPE_UNSPECIFIED";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE"] = 1] = "DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT"] = 2] = "DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT"] = 3] = "DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT"] = 4] = "DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON"] = 5] = "DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL"] = 6] = "DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL"] = 7] = "DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS"] = 8] = "DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD"] = 9] = "DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD"] = 10] = "DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE"] = 11] = "DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE"] = 12] = "DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE";
    /** DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE - desktop */
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE"] = 1] = "DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT"] = 2] = "DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT"] = 3] = "DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT"] = 4] = "DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD"] = 9] = "DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD"] = 10] = "DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED"] = 30] = "DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED"] = 31] = "DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE"] = 1] = "DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT"] = 2] = "DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT"] = 3] = "DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT"] = 4] = "DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD"] = 9] = "DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD";
    DeviceControlType[DeviceControlType["DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD"] = 10] = "DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD";
    DeviceControlType[DeviceControlType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlType = exports.DeviceControlType || (exports.DeviceControlType = {}));
function deviceControlTypeFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_TYPE_UNSPECIFIED':
            return DeviceControlType.DEVICE_CONTROL_TYPE_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE;
        case 2:
        case 'DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT;
        case 3:
        case 'DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT;
        case 4:
        case 'DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT;
        case 5:
        case 'DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON;
        case 6:
        case 'DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL;
        case 7:
        case 'DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL;
        case 8:
        case 'DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS;
        case 9:
        case 'DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD;
        case 10:
        case 'DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD;
        case 11:
        case 'DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE;
        case 12:
        case 'DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE':
            return DeviceControlType.DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE;
        case 1:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE;
        case 2:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT;
        case 3:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT;
        case 4:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT;
        case 9:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD;
        case 10:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD;
        case 30:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED;
        case 31:
        case 'DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED':
            return DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED;
        case 1:
        case 'DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE;
        case 2:
        case 'DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT;
        case 3:
        case 'DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT;
        case 4:
        case 'DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT;
        case 9:
        case 'DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD;
        case 10:
        case 'DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD':
            return DeviceControlType.DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlType.UNRECOGNIZED;
    }
}
exports.deviceControlTypeFromJSON = deviceControlTypeFromJSON;
function deviceControlTypeToJSON(object) {
    switch (object) {
        case DeviceControlType.DEVICE_CONTROL_TYPE_UNSPECIFIED:
            return 'DEVICE_CONTROL_TYPE_UNSPECIFIED';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE:
            return 'DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT:
            return 'DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT:
            return 'DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT:
            return 'DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON:
            return 'DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL:
            return 'DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL:
            return 'DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS:
            return 'DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE:
            return 'DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE';
        case DeviceControlType.DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE:
            return 'DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED';
        case DeviceControlType.DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED:
            return 'DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE:
            return 'DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT:
            return 'DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT:
            return 'DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT:
            return 'DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD';
        case DeviceControlType.DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD:
            return 'DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD';
        case DeviceControlType.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlTypeToJSON = deviceControlTypeToJSON;
var DeviceControlMetaState;
(function (DeviceControlMetaState) {
    /**
     * DEVICE_CONTROL_META_STATE_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_META_STATE_UNSPECIFIED";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED"] = 256] = "DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED"] = 512] = "DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED"] = 1024] = "DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SELECTING"] = 2048] = "DEVICE_CONTROL_META_STATE_AOS_SELECTING";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_ALT_ON"] = 2] = "DEVICE_CONTROL_META_STATE_AOS_ALT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON"] = 16] = "DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON"] = 32] = "DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON"] = 1] = "DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON"] = 64] = "DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON"] = 128] = "DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SYM_ON"] = 4] = "DEVICE_CONTROL_META_STATE_AOS_SYM_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON"] = 8] = "DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CTRL_ON"] = 4096] = "DEVICE_CONTROL_META_STATE_AOS_CTRL_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON"] = 8192] = "DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON"] = 16384] = "DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_META_ON"] = 65536] = "DEVICE_CONTROL_META_STATE_AOS_META_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON"] = 131072] = "DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON"] = 262144] = "DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON"] = 1048576] = "DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON"] = 2097152] = "DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON"] = 4194304] = "DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON";
    /** DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK - META_SHIFT_ON | META_SHIFT_LEFT_ON | META_SHIFT_RIGHT_ON; */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK"] = 193] = "DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK";
    /** DEVICE_CONTROL_META_STATE_AOS_ALT_MASK - META_ALT_ON | META_ALT_LEFT_ON | META_ALT_RIGHT_ON; */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_ALT_MASK"] = 50] = "DEVICE_CONTROL_META_STATE_AOS_ALT_MASK";
    /** DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK - META_CTRL_ON | META_CTRL_LEFT_ON | META_CTRL_RIGHT_ON; */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK"] = 28672] = "DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK";
    /** DEVICE_CONTROL_META_STATE_AOS_META_MASK - META_META_ON | META_META_LEFT_ON | META_META_RIGHT_ON; */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_AOS_META_MASK"] = 458752] = "DEVICE_CONTROL_META_STATE_AOS_META_MASK";
    /** DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT - desktop */
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT"] = 1] = "DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_DESKTOP_ALT"] = 2] = "DEVICE_CONTROL_META_STATE_DESKTOP_ALT";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_DESKTOP_CTRL"] = 4096] = "DEVICE_CONTROL_META_STATE_DESKTOP_CTRL";
    DeviceControlMetaState[DeviceControlMetaState["DEVICE_CONTROL_META_STATE_DESKTOP_META"] = 65536] = "DEVICE_CONTROL_META_STATE_DESKTOP_META";
    DeviceControlMetaState[DeviceControlMetaState["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlMetaState = exports.DeviceControlMetaState || (exports.DeviceControlMetaState = {}));
function deviceControlMetaStateFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_META_STATE_UNSPECIFIED':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_UNSPECIFIED;
        case 256:
        case 'DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED;
        case 512:
        case 'DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED;
        case 1024:
        case 'DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED;
        case 2048:
        case 'DEVICE_CONTROL_META_STATE_AOS_SELECTING':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SELECTING;
        case 2:
        case 'DEVICE_CONTROL_META_STATE_AOS_ALT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_ON;
        case 16:
        case 'DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON;
        case 32:
        case 'DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON;
        case 1:
        case 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON;
        case 64:
        case 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON;
        case 128:
        case 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON;
        case 4:
        case 'DEVICE_CONTROL_META_STATE_AOS_SYM_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SYM_ON;
        case 8:
        case 'DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON;
        case 4096:
        case 'DEVICE_CONTROL_META_STATE_AOS_CTRL_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_ON;
        case 8192:
        case 'DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON;
        case 16384:
        case 'DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON;
        case 65536:
        case 'DEVICE_CONTROL_META_STATE_AOS_META_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_ON;
        case 131072:
        case 'DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON;
        case 262144:
        case 'DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON;
        case 1048576:
        case 'DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON;
        case 2097152:
        case 'DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON;
        case 4194304:
        case 'DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON;
        case 193:
        case 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK;
        case 50:
        case 'DEVICE_CONTROL_META_STATE_AOS_ALT_MASK':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_MASK;
        case 28672:
        case 'DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK;
        case 458752:
        case 'DEVICE_CONTROL_META_STATE_AOS_META_MASK':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_MASK;
        case 1:
        case 'DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT;
        case 2:
        case 'DEVICE_CONTROL_META_STATE_DESKTOP_ALT':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_ALT;
        case 4096:
        case 'DEVICE_CONTROL_META_STATE_DESKTOP_CTRL':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_CTRL;
        case 65536:
        case 'DEVICE_CONTROL_META_STATE_DESKTOP_META':
            return DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_META;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlMetaState.UNRECOGNIZED;
    }
}
exports.deviceControlMetaStateFromJSON = deviceControlMetaStateFromJSON;
function deviceControlMetaStateToJSON(object) {
    switch (object) {
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_UNSPECIFIED:
            return 'DEVICE_CONTROL_META_STATE_UNSPECIFIED';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED:
            return 'DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED:
            return 'DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED:
            return 'DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SELECTING:
            return 'DEVICE_CONTROL_META_STATE_AOS_SELECTING';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_ALT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SYM_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_SYM_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_CTRL_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_META_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON:
            return 'DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK:
            return 'DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_ALT_MASK:
            return 'DEVICE_CONTROL_META_STATE_AOS_ALT_MASK';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK:
            return 'DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_AOS_META_MASK:
            return 'DEVICE_CONTROL_META_STATE_AOS_META_MASK';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT:
            return 'DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_ALT:
            return 'DEVICE_CONTROL_META_STATE_DESKTOP_ALT';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_CTRL:
            return 'DEVICE_CONTROL_META_STATE_DESKTOP_CTRL';
        case DeviceControlMetaState.DEVICE_CONTROL_META_STATE_DESKTOP_META:
            return 'DEVICE_CONTROL_META_STATE_DESKTOP_META';
        case DeviceControlMetaState.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlMetaStateToJSON = deviceControlMetaStateToJSON;
var DeviceControlAction;
(function (DeviceControlAction) {
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_ACTION_UNSPECIFIED";
    /**
     * DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP"] = 1] = "DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE"] = 2] = "DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE";
    /**
     * DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/MotionEvent.java
     * https://developer.android.com/reference/android/view/MotionEvent
     */
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP"] = 1] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE"] = 2] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL"] = 3] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE"] = 4] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN"] = 5] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP"] = 6] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE"] = 7] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL"] = 8] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER"] = 9] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT"] = 10] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS"] = 11] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE"] = 12] = "DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE";
    /** DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED - desktop */
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP"] = 1] = "DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE"] = 2] = "DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP"] = 20] = "DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_IOS_ACTION_UP"] = 1] = "DEVICE_CONTROL_ACTION_IOS_ACTION_UP";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE"] = 2] = "DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE";
    DeviceControlAction[DeviceControlAction["DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL"] = 8] = "DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL";
    DeviceControlAction[DeviceControlAction["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlAction = exports.DeviceControlAction || (exports.DeviceControlAction = {}));
function deviceControlActionFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_ACTION_UNSPECIFIED':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_UNSPECIFIED;
        case 0:
        case 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP;
        case 2:
        case 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE;
        case 0:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP;
        case 2:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE;
        case 3:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL;
        case 4:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE;
        case 5:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN;
        case 6:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP;
        case 7:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE;
        case 8:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL;
        case 9:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER;
        case 10:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT;
        case 11:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS;
        case 12:
        case 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE;
        case 0:
        case 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP;
        case 2:
        case 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE;
        case 20:
        case 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP;
        case 0:
        case 'DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_ACTION_IOS_ACTION_UP':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_UP;
        case 2:
        case 'DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE;
        case 8:
        case 'DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL':
            return DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlAction.UNRECOGNIZED;
    }
}
exports.deviceControlActionFromJSON = deviceControlActionFromJSON;
function deviceControlActionToJSON(object) {
    switch (object) {
        case DeviceControlAction.DEVICE_CONTROL_ACTION_UNSPECIFIED:
            return 'DEVICE_CONTROL_ACTION_UNSPECIFIED';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED:
            return 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP:
            return 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE:
            return 'DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE:
            return 'DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED:
            return 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP:
            return 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE:
            return 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP:
            return 'DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED:
            return 'DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_UP:
            return 'DEVICE_CONTROL_ACTION_IOS_ACTION_UP';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE:
            return 'DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE';
        case DeviceControlAction.DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL:
            return 'DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL';
        case DeviceControlAction.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlActionToJSON = deviceControlActionToJSON;
var DeviceControlKeycode;
(function (DeviceControlKeycode) {
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_KEYCODE_UNSPECIFIED";
    /**
     * DEVICE_CONTROL_KEYCODE_SOFT_LEFT - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SOFT_LEFT"] = 1] = "DEVICE_CONTROL_KEYCODE_SOFT_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SOFT_RIGHT"] = 2] = "DEVICE_CONTROL_KEYCODE_SOFT_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_HOME"] = 3] = "DEVICE_CONTROL_KEYCODE_HOME";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BACK"] = 4] = "DEVICE_CONTROL_KEYCODE_BACK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CALL"] = 5] = "DEVICE_CONTROL_KEYCODE_CALL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ENDCALL"] = 6] = "DEVICE_CONTROL_KEYCODE_ENDCALL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_0"] = 7] = "DEVICE_CONTROL_KEYCODE_0";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_1"] = 8] = "DEVICE_CONTROL_KEYCODE_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_2"] = 9] = "DEVICE_CONTROL_KEYCODE_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_3"] = 10] = "DEVICE_CONTROL_KEYCODE_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_4"] = 11] = "DEVICE_CONTROL_KEYCODE_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_5"] = 12] = "DEVICE_CONTROL_KEYCODE_5";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_6"] = 13] = "DEVICE_CONTROL_KEYCODE_6";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_7"] = 14] = "DEVICE_CONTROL_KEYCODE_7";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_8"] = 15] = "DEVICE_CONTROL_KEYCODE_8";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_9"] = 16] = "DEVICE_CONTROL_KEYCODE_9";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STAR"] = 17] = "DEVICE_CONTROL_KEYCODE_STAR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_POUND"] = 18] = "DEVICE_CONTROL_KEYCODE_POUND";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_UP"] = 19] = "DEVICE_CONTROL_KEYCODE_DPAD_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_DOWN"] = 20] = "DEVICE_CONTROL_KEYCODE_DPAD_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_LEFT"] = 21] = "DEVICE_CONTROL_KEYCODE_DPAD_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_RIGHT"] = 22] = "DEVICE_CONTROL_KEYCODE_DPAD_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_CENTER"] = 23] = "DEVICE_CONTROL_KEYCODE_DPAD_CENTER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VOLUME_UP"] = 24] = "DEVICE_CONTROL_KEYCODE_VOLUME_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VOLUME_DOWN"] = 25] = "DEVICE_CONTROL_KEYCODE_VOLUME_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_POWER"] = 26] = "DEVICE_CONTROL_KEYCODE_POWER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CAMERA"] = 27] = "DEVICE_CONTROL_KEYCODE_CAMERA";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CLEAR"] = 28] = "DEVICE_CONTROL_KEYCODE_CLEAR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_A"] = 29] = "DEVICE_CONTROL_KEYCODE_A";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_B"] = 30] = "DEVICE_CONTROL_KEYCODE_B";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_C"] = 31] = "DEVICE_CONTROL_KEYCODE_C";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_D"] = 32] = "DEVICE_CONTROL_KEYCODE_D";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_E"] = 33] = "DEVICE_CONTROL_KEYCODE_E";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F"] = 34] = "DEVICE_CONTROL_KEYCODE_F";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_G"] = 35] = "DEVICE_CONTROL_KEYCODE_G";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_H"] = 36] = "DEVICE_CONTROL_KEYCODE_H";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_I"] = 37] = "DEVICE_CONTROL_KEYCODE_I";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_J"] = 38] = "DEVICE_CONTROL_KEYCODE_J";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_K"] = 39] = "DEVICE_CONTROL_KEYCODE_K";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_L"] = 40] = "DEVICE_CONTROL_KEYCODE_L";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_M"] = 41] = "DEVICE_CONTROL_KEYCODE_M";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_N"] = 42] = "DEVICE_CONTROL_KEYCODE_N";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_O"] = 43] = "DEVICE_CONTROL_KEYCODE_O";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_P"] = 44] = "DEVICE_CONTROL_KEYCODE_P";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_Q"] = 45] = "DEVICE_CONTROL_KEYCODE_Q";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_R"] = 46] = "DEVICE_CONTROL_KEYCODE_R";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_S"] = 47] = "DEVICE_CONTROL_KEYCODE_S";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_T"] = 48] = "DEVICE_CONTROL_KEYCODE_T";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_U"] = 49] = "DEVICE_CONTROL_KEYCODE_U";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_V"] = 50] = "DEVICE_CONTROL_KEYCODE_V";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_W"] = 51] = "DEVICE_CONTROL_KEYCODE_W";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_X"] = 52] = "DEVICE_CONTROL_KEYCODE_X";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_Y"] = 53] = "DEVICE_CONTROL_KEYCODE_Y";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_Z"] = 54] = "DEVICE_CONTROL_KEYCODE_Z";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_COMMA"] = 55] = "DEVICE_CONTROL_KEYCODE_COMMA";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PERIOD"] = 56] = "DEVICE_CONTROL_KEYCODE_PERIOD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ALT_LEFT"] = 57] = "DEVICE_CONTROL_KEYCODE_ALT_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ALT_RIGHT"] = 58] = "DEVICE_CONTROL_KEYCODE_ALT_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SHIFT_LEFT"] = 59] = "DEVICE_CONTROL_KEYCODE_SHIFT_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT"] = 60] = "DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TAB"] = 61] = "DEVICE_CONTROL_KEYCODE_TAB";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SPACE"] = 62] = "DEVICE_CONTROL_KEYCODE_SPACE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYM"] = 63] = "DEVICE_CONTROL_KEYCODE_SYM";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_EXPLORER"] = 64] = "DEVICE_CONTROL_KEYCODE_EXPLORER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ENVELOPE"] = 65] = "DEVICE_CONTROL_KEYCODE_ENVELOPE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ENTER"] = 66] = "DEVICE_CONTROL_KEYCODE_ENTER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DEL"] = 67] = "DEVICE_CONTROL_KEYCODE_DEL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_GRAVE"] = 68] = "DEVICE_CONTROL_KEYCODE_GRAVE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MINUS"] = 69] = "DEVICE_CONTROL_KEYCODE_MINUS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_EQUALS"] = 70] = "DEVICE_CONTROL_KEYCODE_EQUALS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_LEFT_BRACKET"] = 71] = "DEVICE_CONTROL_KEYCODE_LEFT_BRACKET";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET"] = 72] = "DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BACKSLASH"] = 73] = "DEVICE_CONTROL_KEYCODE_BACKSLASH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SEMICOLON"] = 74] = "DEVICE_CONTROL_KEYCODE_SEMICOLON";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_APOSTROPHE"] = 75] = "DEVICE_CONTROL_KEYCODE_APOSTROPHE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SLASH"] = 76] = "DEVICE_CONTROL_KEYCODE_SLASH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_AT"] = 77] = "DEVICE_CONTROL_KEYCODE_AT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUM"] = 78] = "DEVICE_CONTROL_KEYCODE_NUM";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_HEADSETHOOK"] = 79] = "DEVICE_CONTROL_KEYCODE_HEADSETHOOK";
    /** DEVICE_CONTROL_KEYCODE_FOCUS - Camera* focus */
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FOCUS"] = 80] = "DEVICE_CONTROL_KEYCODE_FOCUS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PLUS"] = 81] = "DEVICE_CONTROL_KEYCODE_PLUS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MENU"] = 82] = "DEVICE_CONTROL_KEYCODE_MENU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NOTIFICATION"] = 83] = "DEVICE_CONTROL_KEYCODE_NOTIFICATION";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SEARCH"] = 84] = "DEVICE_CONTROL_KEYCODE_SEARCH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE"] = 85] = "DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_STOP"] = 86] = "DEVICE_CONTROL_KEYCODE_MEDIA_STOP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_NEXT"] = 87] = "DEVICE_CONTROL_KEYCODE_MEDIA_NEXT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS"] = 88] = "DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_REWIND"] = 89] = "DEVICE_CONTROL_KEYCODE_MEDIA_REWIND";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD"] = 90] = "DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MUTE"] = 91] = "DEVICE_CONTROL_KEYCODE_MUTE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PAGE_UP"] = 92] = "DEVICE_CONTROL_KEYCODE_PAGE_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PAGE_DOWN"] = 93] = "DEVICE_CONTROL_KEYCODE_PAGE_DOWN";
    /** DEVICE_CONTROL_KEYCODE_PICTSYMBOLS - switch symbol-sets (Emoji,Kao-moji) */
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PICTSYMBOLS"] = 94] = "DEVICE_CONTROL_KEYCODE_PICTSYMBOLS";
    /** DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET - switch char-sets (Kanji,Katakana) */
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET"] = 95] = "DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_A"] = 96] = "DEVICE_CONTROL_KEYCODE_BUTTON_A";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_B"] = 97] = "DEVICE_CONTROL_KEYCODE_BUTTON_B";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_C"] = 98] = "DEVICE_CONTROL_KEYCODE_BUTTON_C";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_X"] = 99] = "DEVICE_CONTROL_KEYCODE_BUTTON_X";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_Y"] = 100] = "DEVICE_CONTROL_KEYCODE_BUTTON_Y";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_Z"] = 101] = "DEVICE_CONTROL_KEYCODE_BUTTON_Z";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_L1"] = 102] = "DEVICE_CONTROL_KEYCODE_BUTTON_L1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_R1"] = 103] = "DEVICE_CONTROL_KEYCODE_BUTTON_R1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_L2"] = 104] = "DEVICE_CONTROL_KEYCODE_BUTTON_L2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_R2"] = 105] = "DEVICE_CONTROL_KEYCODE_BUTTON_R2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL"] = 106] = "DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR"] = 107] = "DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_START"] = 108] = "DEVICE_CONTROL_KEYCODE_BUTTON_START";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_SELECT"] = 109] = "DEVICE_CONTROL_KEYCODE_BUTTON_SELECT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_MODE"] = 110] = "DEVICE_CONTROL_KEYCODE_BUTTON_MODE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ESCAPE"] = 111] = "DEVICE_CONTROL_KEYCODE_ESCAPE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FORWARD_DEL"] = 112] = "DEVICE_CONTROL_KEYCODE_FORWARD_DEL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CTRL_LEFT"] = 113] = "DEVICE_CONTROL_KEYCODE_CTRL_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CTRL_RIGHT"] = 114] = "DEVICE_CONTROL_KEYCODE_CTRL_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CAPS_LOCK"] = 115] = "DEVICE_CONTROL_KEYCODE_CAPS_LOCK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SCROLL_LOCK"] = 116] = "DEVICE_CONTROL_KEYCODE_SCROLL_LOCK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_META_LEFT"] = 117] = "DEVICE_CONTROL_KEYCODE_META_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_META_RIGHT"] = 118] = "DEVICE_CONTROL_KEYCODE_META_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FUNCTION"] = 119] = "DEVICE_CONTROL_KEYCODE_FUNCTION";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYSRQ"] = 120] = "DEVICE_CONTROL_KEYCODE_SYSRQ";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BREAK"] = 121] = "DEVICE_CONTROL_KEYCODE_BREAK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MOVE_HOME"] = 122] = "DEVICE_CONTROL_KEYCODE_MOVE_HOME";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MOVE_END"] = 123] = "DEVICE_CONTROL_KEYCODE_MOVE_END";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_INSERT"] = 124] = "DEVICE_CONTROL_KEYCODE_INSERT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FORWARD"] = 125] = "DEVICE_CONTROL_KEYCODE_FORWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_PLAY"] = 126] = "DEVICE_CONTROL_KEYCODE_MEDIA_PLAY";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE"] = 127] = "DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE"] = 128] = "DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_EJECT"] = 129] = "DEVICE_CONTROL_KEYCODE_MEDIA_EJECT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_RECORD"] = 130] = "DEVICE_CONTROL_KEYCODE_MEDIA_RECORD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F1"] = 131] = "DEVICE_CONTROL_KEYCODE_F1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F2"] = 132] = "DEVICE_CONTROL_KEYCODE_F2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F3"] = 133] = "DEVICE_CONTROL_KEYCODE_F3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F4"] = 134] = "DEVICE_CONTROL_KEYCODE_F4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F5"] = 135] = "DEVICE_CONTROL_KEYCODE_F5";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F6"] = 136] = "DEVICE_CONTROL_KEYCODE_F6";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F7"] = 137] = "DEVICE_CONTROL_KEYCODE_F7";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F8"] = 138] = "DEVICE_CONTROL_KEYCODE_F8";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F9"] = 139] = "DEVICE_CONTROL_KEYCODE_F9";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F10"] = 140] = "DEVICE_CONTROL_KEYCODE_F10";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F11"] = 141] = "DEVICE_CONTROL_KEYCODE_F11";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_F12"] = 142] = "DEVICE_CONTROL_KEYCODE_F12";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUM_LOCK"] = 143] = "DEVICE_CONTROL_KEYCODE_NUM_LOCK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_0"] = 144] = "DEVICE_CONTROL_KEYCODE_NUMPAD_0";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_1"] = 145] = "DEVICE_CONTROL_KEYCODE_NUMPAD_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_2"] = 146] = "DEVICE_CONTROL_KEYCODE_NUMPAD_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_3"] = 147] = "DEVICE_CONTROL_KEYCODE_NUMPAD_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_4"] = 148] = "DEVICE_CONTROL_KEYCODE_NUMPAD_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_5"] = 149] = "DEVICE_CONTROL_KEYCODE_NUMPAD_5";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_6"] = 150] = "DEVICE_CONTROL_KEYCODE_NUMPAD_6";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_7"] = 151] = "DEVICE_CONTROL_KEYCODE_NUMPAD_7";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_8"] = 152] = "DEVICE_CONTROL_KEYCODE_NUMPAD_8";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_9"] = 153] = "DEVICE_CONTROL_KEYCODE_NUMPAD_9";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE"] = 154] = "DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY"] = 155] = "DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT"] = 156] = "DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_ADD"] = 157] = "DEVICE_CONTROL_KEYCODE_NUMPAD_ADD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_DOT"] = 158] = "DEVICE_CONTROL_KEYCODE_NUMPAD_DOT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA"] = 159] = "DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER"] = 160] = "DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS"] = 161] = "DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN"] = 162] = "DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN"] = 163] = "DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VOLUME_MUTE"] = 164] = "DEVICE_CONTROL_KEYCODE_VOLUME_MUTE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_INFO"] = 165] = "DEVICE_CONTROL_KEYCODE_INFO";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CHANNEL_UP"] = 166] = "DEVICE_CONTROL_KEYCODE_CHANNEL_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN"] = 167] = "DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ZOOM_IN"] = 168] = "DEVICE_CONTROL_KEYCODE_ZOOM_IN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ZOOM_OUT"] = 169] = "DEVICE_CONTROL_KEYCODE_ZOOM_OUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV"] = 170] = "DEVICE_CONTROL_KEYCODE_TV";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_WINDOW"] = 171] = "DEVICE_CONTROL_KEYCODE_WINDOW";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_GUIDE"] = 172] = "DEVICE_CONTROL_KEYCODE_GUIDE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DVR"] = 173] = "DEVICE_CONTROL_KEYCODE_DVR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BOOKMARK"] = 174] = "DEVICE_CONTROL_KEYCODE_BOOKMARK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CAPTIONS"] = 175] = "DEVICE_CONTROL_KEYCODE_CAPTIONS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SETTINGS"] = 176] = "DEVICE_CONTROL_KEYCODE_SETTINGS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_POWER"] = 177] = "DEVICE_CONTROL_KEYCODE_TV_POWER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT"] = 178] = "DEVICE_CONTROL_KEYCODE_TV_INPUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STB_POWER"] = 179] = "DEVICE_CONTROL_KEYCODE_STB_POWER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STB_INPUT"] = 180] = "DEVICE_CONTROL_KEYCODE_STB_INPUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_AVR_POWER"] = 181] = "DEVICE_CONTROL_KEYCODE_AVR_POWER";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_AVR_INPUT"] = 182] = "DEVICE_CONTROL_KEYCODE_AVR_INPUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PROG_RED"] = 183] = "DEVICE_CONTROL_KEYCODE_PROG_RED";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PROG_GREEN"] = 184] = "DEVICE_CONTROL_KEYCODE_PROG_GREEN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PROG_YELLOW"] = 185] = "DEVICE_CONTROL_KEYCODE_PROG_YELLOW";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PROG_BLUE"] = 186] = "DEVICE_CONTROL_KEYCODE_PROG_BLUE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_APP_SWITCH"] = 187] = "DEVICE_CONTROL_KEYCODE_APP_SWITCH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_1"] = 188] = "DEVICE_CONTROL_KEYCODE_BUTTON_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_2"] = 189] = "DEVICE_CONTROL_KEYCODE_BUTTON_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_3"] = 190] = "DEVICE_CONTROL_KEYCODE_BUTTON_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_4"] = 191] = "DEVICE_CONTROL_KEYCODE_BUTTON_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_5"] = 192] = "DEVICE_CONTROL_KEYCODE_BUTTON_5";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_6"] = 193] = "DEVICE_CONTROL_KEYCODE_BUTTON_6";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_7"] = 194] = "DEVICE_CONTROL_KEYCODE_BUTTON_7";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_8"] = 195] = "DEVICE_CONTROL_KEYCODE_BUTTON_8";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_9"] = 196] = "DEVICE_CONTROL_KEYCODE_BUTTON_9";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_10"] = 197] = "DEVICE_CONTROL_KEYCODE_BUTTON_10";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_11"] = 198] = "DEVICE_CONTROL_KEYCODE_BUTTON_11";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_12"] = 199] = "DEVICE_CONTROL_KEYCODE_BUTTON_12";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_13"] = 200] = "DEVICE_CONTROL_KEYCODE_BUTTON_13";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_14"] = 201] = "DEVICE_CONTROL_KEYCODE_BUTTON_14";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_15"] = 202] = "DEVICE_CONTROL_KEYCODE_BUTTON_15";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BUTTON_16"] = 203] = "DEVICE_CONTROL_KEYCODE_BUTTON_16";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH"] = 204] = "DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MANNER_MODE"] = 205] = "DEVICE_CONTROL_KEYCODE_MANNER_MODE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_3D_MODE"] = 206] = "DEVICE_CONTROL_KEYCODE_3D_MODE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CONTACTS"] = 207] = "DEVICE_CONTROL_KEYCODE_CONTACTS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CALENDAR"] = 208] = "DEVICE_CONTROL_KEYCODE_CALENDAR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MUSIC"] = 209] = "DEVICE_CONTROL_KEYCODE_MUSIC";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CALCULATOR"] = 210] = "DEVICE_CONTROL_KEYCODE_CALCULATOR";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU"] = 211] = "DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_EISU"] = 212] = "DEVICE_CONTROL_KEYCODE_EISU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MUHENKAN"] = 213] = "DEVICE_CONTROL_KEYCODE_MUHENKAN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_HENKAN"] = 214] = "DEVICE_CONTROL_KEYCODE_HENKAN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA"] = 215] = "DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_YEN"] = 216] = "DEVICE_CONTROL_KEYCODE_YEN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_RO"] = 217] = "DEVICE_CONTROL_KEYCODE_RO";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_KANA"] = 218] = "DEVICE_CONTROL_KEYCODE_KANA";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ASSIST"] = 219] = "DEVICE_CONTROL_KEYCODE_ASSIST";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN"] = 220] = "DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP"] = 221] = "DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK"] = 222] = "DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SLEEP"] = 223] = "DEVICE_CONTROL_KEYCODE_SLEEP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_WAKEUP"] = 224] = "DEVICE_CONTROL_KEYCODE_WAKEUP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PAIRING"] = 225] = "DEVICE_CONTROL_KEYCODE_PAIRING";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU"] = 226] = "DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_11"] = 227] = "DEVICE_CONTROL_KEYCODE_11";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_12"] = 228] = "DEVICE_CONTROL_KEYCODE_12";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_LAST_CHANNEL"] = 229] = "DEVICE_CONTROL_KEYCODE_LAST_CHANNEL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE"] = 230] = "DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VOICE_ASSIST"] = 231] = "DEVICE_CONTROL_KEYCODE_VOICE_ASSIST";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE"] = 232] = "DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_TELETEXT"] = 233] = "DEVICE_CONTROL_KEYCODE_TV_TELETEXT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY"] = 234] = "DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG"] = 235] = "DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL"] = 236] = "DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_SATELLITE"] = 237] = "DEVICE_CONTROL_KEYCODE_TV_SATELLITE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS"] = 238] = "DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS"] = 239] = "DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE"] = 240] = "DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_NETWORK"] = 241] = "DEVICE_CONTROL_KEYCODE_TV_NETWORK";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE"] = 242] = "DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1"] = 243] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2"] = 244] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3"] = 245] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4"] = 246] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1"] = 247] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2"] = 248] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1"] = 249] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2"] = 250] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1"] = 251] = "DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION"] = 252] = "DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP"] = 253] = "DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN"] = 254] = "DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE"] = 255] = "DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU"] = 256] = "DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU"] = 257] = "DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING"] = 258] = "DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_HELP"] = 259] = "DEVICE_CONTROL_KEYCODE_HELP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS"] = 260] = "DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT"] = 261] = "DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NAVIGATE_IN"] = 262] = "DEVICE_CONTROL_KEYCODE_NAVIGATE_IN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT"] = 263] = "DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STEM_PRIMARY"] = 264] = "DEVICE_CONTROL_KEYCODE_STEM_PRIMARY";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STEM_1"] = 265] = "DEVICE_CONTROL_KEYCODE_STEM_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STEM_2"] = 266] = "DEVICE_CONTROL_KEYCODE_STEM_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_STEM_3"] = 267] = "DEVICE_CONTROL_KEYCODE_STEM_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT"] = 268] = "DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT"] = 269] = "DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT"] = 270] = "DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT"] = 271] = "DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD"] = 272] = "DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD"] = 273] = "DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD"] = 274] = "DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD"] = 275] = "DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SOFT_SLEEP"] = 276] = "DEVICE_CONTROL_KEYCODE_SOFT_SLEEP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_CUT"] = 277] = "DEVICE_CONTROL_KEYCODE_CUT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_COPY"] = 278] = "DEVICE_CONTROL_KEYCODE_COPY";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PASTE"] = 279] = "DEVICE_CONTROL_KEYCODE_PASTE";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP"] = 280] = "DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN"] = 281] = "DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT"] = 282] = "DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT"] = 283] = "DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_ALL_APPS"] = 284] = "DEVICE_CONTROL_KEYCODE_ALL_APPS";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_REFRESH"] = 285] = "DEVICE_CONTROL_KEYCODE_REFRESH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_THUMBS_UP"] = 286] = "DEVICE_CONTROL_KEYCODE_THUMBS_UP";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_THUMBS_DOWN"] = 287] = "DEVICE_CONTROL_KEYCODE_THUMBS_DOWN";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH"] = 288] = "DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_1"] = 289] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_2"] = 290] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_3"] = 291] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_4"] = 292] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_5"] = 293] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_5";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_6"] = 294] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_6";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_7"] = 295] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_7";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_VIDEO_APP_8"] = 296] = "DEVICE_CONTROL_KEYCODE_VIDEO_APP_8";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FEATURED_APP_1"] = 297] = "DEVICE_CONTROL_KEYCODE_FEATURED_APP_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FEATURED_APP_2"] = 298] = "DEVICE_CONTROL_KEYCODE_FEATURED_APP_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FEATURED_APP_3"] = 299] = "DEVICE_CONTROL_KEYCODE_FEATURED_APP_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_FEATURED_APP_4"] = 300] = "DEVICE_CONTROL_KEYCODE_FEATURED_APP_4";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DEMO_APP_1"] = 301] = "DEVICE_CONTROL_KEYCODE_DEMO_APP_1";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DEMO_APP_2"] = 302] = "DEVICE_CONTROL_KEYCODE_DEMO_APP_2";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DEMO_APP_3"] = 303] = "DEVICE_CONTROL_KEYCODE_DEMO_APP_3";
    DeviceControlKeycode[DeviceControlKeycode["DEVICE_CONTROL_KEYCODE_DEMO_APP_4"] = 304] = "DEVICE_CONTROL_KEYCODE_DEMO_APP_4";
    DeviceControlKeycode[DeviceControlKeycode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlKeycode = exports.DeviceControlKeycode || (exports.DeviceControlKeycode = {}));
function deviceControlKeycodeFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_KEYCODE_UNSPECIFIED':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_KEYCODE_SOFT_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_LEFT;
        case 2:
        case 'DEVICE_CONTROL_KEYCODE_SOFT_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_RIGHT;
        case 3:
        case 'DEVICE_CONTROL_KEYCODE_HOME':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HOME;
        case 4:
        case 'DEVICE_CONTROL_KEYCODE_BACK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BACK;
        case 5:
        case 'DEVICE_CONTROL_KEYCODE_CALL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALL;
        case 6:
        case 'DEVICE_CONTROL_KEYCODE_ENDCALL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENDCALL;
        case 7:
        case 'DEVICE_CONTROL_KEYCODE_0':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_0;
        case 8:
        case 'DEVICE_CONTROL_KEYCODE_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_1;
        case 9:
        case 'DEVICE_CONTROL_KEYCODE_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_2;
        case 10:
        case 'DEVICE_CONTROL_KEYCODE_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_3;
        case 11:
        case 'DEVICE_CONTROL_KEYCODE_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_4;
        case 12:
        case 'DEVICE_CONTROL_KEYCODE_5':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_5;
        case 13:
        case 'DEVICE_CONTROL_KEYCODE_6':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_6;
        case 14:
        case 'DEVICE_CONTROL_KEYCODE_7':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_7;
        case 15:
        case 'DEVICE_CONTROL_KEYCODE_8':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_8;
        case 16:
        case 'DEVICE_CONTROL_KEYCODE_9':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_9;
        case 17:
        case 'DEVICE_CONTROL_KEYCODE_STAR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STAR;
        case 18:
        case 'DEVICE_CONTROL_KEYCODE_POUND':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_POUND;
        case 19:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP;
        case 20:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN;
        case 21:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_LEFT;
        case 22:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_RIGHT;
        case 23:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_CENTER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_CENTER;
        case 24:
        case 'DEVICE_CONTROL_KEYCODE_VOLUME_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_UP;
        case 25:
        case 'DEVICE_CONTROL_KEYCODE_VOLUME_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_DOWN;
        case 26:
        case 'DEVICE_CONTROL_KEYCODE_POWER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_POWER;
        case 27:
        case 'DEVICE_CONTROL_KEYCODE_CAMERA':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAMERA;
        case 28:
        case 'DEVICE_CONTROL_KEYCODE_CLEAR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CLEAR;
        case 29:
        case 'DEVICE_CONTROL_KEYCODE_A':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_A;
        case 30:
        case 'DEVICE_CONTROL_KEYCODE_B':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_B;
        case 31:
        case 'DEVICE_CONTROL_KEYCODE_C':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_C;
        case 32:
        case 'DEVICE_CONTROL_KEYCODE_D':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_D;
        case 33:
        case 'DEVICE_CONTROL_KEYCODE_E':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_E;
        case 34:
        case 'DEVICE_CONTROL_KEYCODE_F':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F;
        case 35:
        case 'DEVICE_CONTROL_KEYCODE_G':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_G;
        case 36:
        case 'DEVICE_CONTROL_KEYCODE_H':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_H;
        case 37:
        case 'DEVICE_CONTROL_KEYCODE_I':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_I;
        case 38:
        case 'DEVICE_CONTROL_KEYCODE_J':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_J;
        case 39:
        case 'DEVICE_CONTROL_KEYCODE_K':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_K;
        case 40:
        case 'DEVICE_CONTROL_KEYCODE_L':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_L;
        case 41:
        case 'DEVICE_CONTROL_KEYCODE_M':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_M;
        case 42:
        case 'DEVICE_CONTROL_KEYCODE_N':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_N;
        case 43:
        case 'DEVICE_CONTROL_KEYCODE_O':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_O;
        case 44:
        case 'DEVICE_CONTROL_KEYCODE_P':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_P;
        case 45:
        case 'DEVICE_CONTROL_KEYCODE_Q':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Q;
        case 46:
        case 'DEVICE_CONTROL_KEYCODE_R':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_R;
        case 47:
        case 'DEVICE_CONTROL_KEYCODE_S':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_S;
        case 48:
        case 'DEVICE_CONTROL_KEYCODE_T':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_T;
        case 49:
        case 'DEVICE_CONTROL_KEYCODE_U':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_U;
        case 50:
        case 'DEVICE_CONTROL_KEYCODE_V':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_V;
        case 51:
        case 'DEVICE_CONTROL_KEYCODE_W':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_W;
        case 52:
        case 'DEVICE_CONTROL_KEYCODE_X':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_X;
        case 53:
        case 'DEVICE_CONTROL_KEYCODE_Y':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Y;
        case 54:
        case 'DEVICE_CONTROL_KEYCODE_Z':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Z;
        case 55:
        case 'DEVICE_CONTROL_KEYCODE_COMMA':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_COMMA;
        case 56:
        case 'DEVICE_CONTROL_KEYCODE_PERIOD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PERIOD;
        case 57:
        case 'DEVICE_CONTROL_KEYCODE_ALT_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALT_LEFT;
        case 58:
        case 'DEVICE_CONTROL_KEYCODE_ALT_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALT_RIGHT;
        case 59:
        case 'DEVICE_CONTROL_KEYCODE_SHIFT_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SHIFT_LEFT;
        case 60:
        case 'DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT;
        case 61:
        case 'DEVICE_CONTROL_KEYCODE_TAB':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TAB;
        case 62:
        case 'DEVICE_CONTROL_KEYCODE_SPACE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SPACE;
        case 63:
        case 'DEVICE_CONTROL_KEYCODE_SYM':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYM;
        case 64:
        case 'DEVICE_CONTROL_KEYCODE_EXPLORER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EXPLORER;
        case 65:
        case 'DEVICE_CONTROL_KEYCODE_ENVELOPE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENVELOPE;
        case 66:
        case 'DEVICE_CONTROL_KEYCODE_ENTER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENTER;
        case 67:
        case 'DEVICE_CONTROL_KEYCODE_DEL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEL;
        case 68:
        case 'DEVICE_CONTROL_KEYCODE_GRAVE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_GRAVE;
        case 69:
        case 'DEVICE_CONTROL_KEYCODE_MINUS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MINUS;
        case 70:
        case 'DEVICE_CONTROL_KEYCODE_EQUALS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EQUALS;
        case 71:
        case 'DEVICE_CONTROL_KEYCODE_LEFT_BRACKET':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LEFT_BRACKET;
        case 72:
        case 'DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET;
        case 73:
        case 'DEVICE_CONTROL_KEYCODE_BACKSLASH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BACKSLASH;
        case 74:
        case 'DEVICE_CONTROL_KEYCODE_SEMICOLON':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SEMICOLON;
        case 75:
        case 'DEVICE_CONTROL_KEYCODE_APOSTROPHE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_APOSTROPHE;
        case 76:
        case 'DEVICE_CONTROL_KEYCODE_SLASH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SLASH;
        case 77:
        case 'DEVICE_CONTROL_KEYCODE_AT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AT;
        case 78:
        case 'DEVICE_CONTROL_KEYCODE_NUM':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUM;
        case 79:
        case 'DEVICE_CONTROL_KEYCODE_HEADSETHOOK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HEADSETHOOK;
        case 80:
        case 'DEVICE_CONTROL_KEYCODE_FOCUS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FOCUS;
        case 81:
        case 'DEVICE_CONTROL_KEYCODE_PLUS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PLUS;
        case 82:
        case 'DEVICE_CONTROL_KEYCODE_MENU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MENU;
        case 83:
        case 'DEVICE_CONTROL_KEYCODE_NOTIFICATION':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NOTIFICATION;
        case 84:
        case 'DEVICE_CONTROL_KEYCODE_SEARCH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SEARCH;
        case 85:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE;
        case 86:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_STOP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STOP;
        case 87:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_NEXT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_NEXT;
        case 88:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS;
        case 89:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_REWIND':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_REWIND;
        case 90:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD;
        case 91:
        case 'DEVICE_CONTROL_KEYCODE_MUTE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUTE;
        case 92:
        case 'DEVICE_CONTROL_KEYCODE_PAGE_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAGE_UP;
        case 93:
        case 'DEVICE_CONTROL_KEYCODE_PAGE_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAGE_DOWN;
        case 94:
        case 'DEVICE_CONTROL_KEYCODE_PICTSYMBOLS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PICTSYMBOLS;
        case 95:
        case 'DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET;
        case 96:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_A':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_A;
        case 97:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_B':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_B;
        case 98:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_C':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_C;
        case 99:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_X':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_X;
        case 100:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_Y':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_Y;
        case 101:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_Z':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_Z;
        case 102:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_L1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_L1;
        case 103:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_R1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_R1;
        case 104:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_L2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_L2;
        case 105:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_R2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_R2;
        case 106:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL;
        case 107:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR;
        case 108:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_START':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_START;
        case 109:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_SELECT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_SELECT;
        case 110:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_MODE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_MODE;
        case 111:
        case 'DEVICE_CONTROL_KEYCODE_ESCAPE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ESCAPE;
        case 112:
        case 'DEVICE_CONTROL_KEYCODE_FORWARD_DEL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FORWARD_DEL;
        case 113:
        case 'DEVICE_CONTROL_KEYCODE_CTRL_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CTRL_LEFT;
        case 114:
        case 'DEVICE_CONTROL_KEYCODE_CTRL_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CTRL_RIGHT;
        case 115:
        case 'DEVICE_CONTROL_KEYCODE_CAPS_LOCK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAPS_LOCK;
        case 116:
        case 'DEVICE_CONTROL_KEYCODE_SCROLL_LOCK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SCROLL_LOCK;
        case 117:
        case 'DEVICE_CONTROL_KEYCODE_META_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_META_LEFT;
        case 118:
        case 'DEVICE_CONTROL_KEYCODE_META_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_META_RIGHT;
        case 119:
        case 'DEVICE_CONTROL_KEYCODE_FUNCTION':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FUNCTION;
        case 120:
        case 'DEVICE_CONTROL_KEYCODE_SYSRQ':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSRQ;
        case 121:
        case 'DEVICE_CONTROL_KEYCODE_BREAK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BREAK;
        case 122:
        case 'DEVICE_CONTROL_KEYCODE_MOVE_HOME':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MOVE_HOME;
        case 123:
        case 'DEVICE_CONTROL_KEYCODE_MOVE_END':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MOVE_END;
        case 124:
        case 'DEVICE_CONTROL_KEYCODE_INSERT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_INSERT;
        case 125:
        case 'DEVICE_CONTROL_KEYCODE_FORWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FORWARD;
        case 126:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_PLAY':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PLAY;
        case 127:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE;
        case 128:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE;
        case 129:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_EJECT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_EJECT;
        case 130:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_RECORD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_RECORD;
        case 131:
        case 'DEVICE_CONTROL_KEYCODE_F1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F1;
        case 132:
        case 'DEVICE_CONTROL_KEYCODE_F2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F2;
        case 133:
        case 'DEVICE_CONTROL_KEYCODE_F3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F3;
        case 134:
        case 'DEVICE_CONTROL_KEYCODE_F4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F4;
        case 135:
        case 'DEVICE_CONTROL_KEYCODE_F5':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F5;
        case 136:
        case 'DEVICE_CONTROL_KEYCODE_F6':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F6;
        case 137:
        case 'DEVICE_CONTROL_KEYCODE_F7':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F7;
        case 138:
        case 'DEVICE_CONTROL_KEYCODE_F8':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F8;
        case 139:
        case 'DEVICE_CONTROL_KEYCODE_F9':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F9;
        case 140:
        case 'DEVICE_CONTROL_KEYCODE_F10':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F10;
        case 141:
        case 'DEVICE_CONTROL_KEYCODE_F11':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F11;
        case 142:
        case 'DEVICE_CONTROL_KEYCODE_F12':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F12;
        case 143:
        case 'DEVICE_CONTROL_KEYCODE_NUM_LOCK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUM_LOCK;
        case 144:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_0':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_0;
        case 145:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_1;
        case 146:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_2;
        case 147:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_3;
        case 148:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_4;
        case 149:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_5':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_5;
        case 150:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_6':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_6;
        case 151:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_7':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_7;
        case 152:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_8':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_8;
        case 153:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_9':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_9;
        case 154:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE;
        case 155:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY;
        case 156:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT;
        case 157:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_ADD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_ADD;
        case 158:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_DOT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_DOT;
        case 159:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA;
        case 160:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER;
        case 161:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS;
        case 162:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN;
        case 163:
        case 'DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN;
        case 164:
        case 'DEVICE_CONTROL_KEYCODE_VOLUME_MUTE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_MUTE;
        case 165:
        case 'DEVICE_CONTROL_KEYCODE_INFO':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_INFO;
        case 166:
        case 'DEVICE_CONTROL_KEYCODE_CHANNEL_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CHANNEL_UP;
        case 167:
        case 'DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN;
        case 168:
        case 'DEVICE_CONTROL_KEYCODE_ZOOM_IN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZOOM_IN;
        case 169:
        case 'DEVICE_CONTROL_KEYCODE_ZOOM_OUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZOOM_OUT;
        case 170:
        case 'DEVICE_CONTROL_KEYCODE_TV':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV;
        case 171:
        case 'DEVICE_CONTROL_KEYCODE_WINDOW':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_WINDOW;
        case 172:
        case 'DEVICE_CONTROL_KEYCODE_GUIDE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_GUIDE;
        case 173:
        case 'DEVICE_CONTROL_KEYCODE_DVR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DVR;
        case 174:
        case 'DEVICE_CONTROL_KEYCODE_BOOKMARK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BOOKMARK;
        case 175:
        case 'DEVICE_CONTROL_KEYCODE_CAPTIONS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAPTIONS;
        case 176:
        case 'DEVICE_CONTROL_KEYCODE_SETTINGS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SETTINGS;
        case 177:
        case 'DEVICE_CONTROL_KEYCODE_TV_POWER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_POWER;
        case 178:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT;
        case 179:
        case 'DEVICE_CONTROL_KEYCODE_STB_POWER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STB_POWER;
        case 180:
        case 'DEVICE_CONTROL_KEYCODE_STB_INPUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STB_INPUT;
        case 181:
        case 'DEVICE_CONTROL_KEYCODE_AVR_POWER':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AVR_POWER;
        case 182:
        case 'DEVICE_CONTROL_KEYCODE_AVR_INPUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AVR_INPUT;
        case 183:
        case 'DEVICE_CONTROL_KEYCODE_PROG_RED':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_RED;
        case 184:
        case 'DEVICE_CONTROL_KEYCODE_PROG_GREEN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_GREEN;
        case 185:
        case 'DEVICE_CONTROL_KEYCODE_PROG_YELLOW':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_YELLOW;
        case 186:
        case 'DEVICE_CONTROL_KEYCODE_PROG_BLUE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_BLUE;
        case 187:
        case 'DEVICE_CONTROL_KEYCODE_APP_SWITCH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_APP_SWITCH;
        case 188:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_1;
        case 189:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_2;
        case 190:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_3;
        case 191:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_4;
        case 192:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_5':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_5;
        case 193:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_6':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_6;
        case 194:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_7':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_7;
        case 195:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_8':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_8;
        case 196:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_9':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_9;
        case 197:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_10':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_10;
        case 198:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_11':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_11;
        case 199:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_12':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_12;
        case 200:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_13':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_13;
        case 201:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_14':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_14;
        case 202:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_15':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_15;
        case 203:
        case 'DEVICE_CONTROL_KEYCODE_BUTTON_16':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_16;
        case 204:
        case 'DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH;
        case 205:
        case 'DEVICE_CONTROL_KEYCODE_MANNER_MODE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MANNER_MODE;
        case 206:
        case 'DEVICE_CONTROL_KEYCODE_3D_MODE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_3D_MODE;
        case 207:
        case 'DEVICE_CONTROL_KEYCODE_CONTACTS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CONTACTS;
        case 208:
        case 'DEVICE_CONTROL_KEYCODE_CALENDAR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALENDAR;
        case 209:
        case 'DEVICE_CONTROL_KEYCODE_MUSIC':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUSIC;
        case 210:
        case 'DEVICE_CONTROL_KEYCODE_CALCULATOR':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALCULATOR;
        case 211:
        case 'DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU;
        case 212:
        case 'DEVICE_CONTROL_KEYCODE_EISU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EISU;
        case 213:
        case 'DEVICE_CONTROL_KEYCODE_MUHENKAN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUHENKAN;
        case 214:
        case 'DEVICE_CONTROL_KEYCODE_HENKAN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HENKAN;
        case 215:
        case 'DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA;
        case 216:
        case 'DEVICE_CONTROL_KEYCODE_YEN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_YEN;
        case 217:
        case 'DEVICE_CONTROL_KEYCODE_RO':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_RO;
        case 218:
        case 'DEVICE_CONTROL_KEYCODE_KANA':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_KANA;
        case 219:
        case 'DEVICE_CONTROL_KEYCODE_ASSIST':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ASSIST;
        case 220:
        case 'DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN;
        case 221:
        case 'DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP;
        case 222:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK;
        case 223:
        case 'DEVICE_CONTROL_KEYCODE_SLEEP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SLEEP;
        case 224:
        case 'DEVICE_CONTROL_KEYCODE_WAKEUP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_WAKEUP;
        case 225:
        case 'DEVICE_CONTROL_KEYCODE_PAIRING':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAIRING;
        case 226:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU;
        case 227:
        case 'DEVICE_CONTROL_KEYCODE_11':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_11;
        case 228:
        case 'DEVICE_CONTROL_KEYCODE_12':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_12;
        case 229:
        case 'DEVICE_CONTROL_KEYCODE_LAST_CHANNEL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LAST_CHANNEL;
        case 230:
        case 'DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE;
        case 231:
        case 'DEVICE_CONTROL_KEYCODE_VOICE_ASSIST':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOICE_ASSIST;
        case 232:
        case 'DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE;
        case 233:
        case 'DEVICE_CONTROL_KEYCODE_TV_TELETEXT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TELETEXT;
        case 234:
        case 'DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY;
        case 235:
        case 'DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG;
        case 236:
        case 'DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL;
        case 237:
        case 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE;
        case 238:
        case 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS;
        case 239:
        case 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS;
        case 240:
        case 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE;
        case 241:
        case 'DEVICE_CONTROL_KEYCODE_TV_NETWORK':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_NETWORK;
        case 242:
        case 'DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE;
        case 243:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1;
        case 244:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2;
        case 245:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3;
        case 246:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4;
        case 247:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1;
        case 248:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2;
        case 249:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1;
        case 250:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2;
        case 251:
        case 'DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1;
        case 252:
        case 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION;
        case 253:
        case 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP;
        case 254:
        case 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN;
        case 255:
        case 'DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE;
        case 256:
        case 'DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU;
        case 257:
        case 'DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU;
        case 258:
        case 'DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING;
        case 259:
        case 'DEVICE_CONTROL_KEYCODE_HELP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HELP;
        case 260:
        case 'DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS;
        case 261:
        case 'DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT;
        case 262:
        case 'DEVICE_CONTROL_KEYCODE_NAVIGATE_IN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_IN;
        case 263:
        case 'DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT;
        case 264:
        case 'DEVICE_CONTROL_KEYCODE_STEM_PRIMARY':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_PRIMARY;
        case 265:
        case 'DEVICE_CONTROL_KEYCODE_STEM_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_1;
        case 266:
        case 'DEVICE_CONTROL_KEYCODE_STEM_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_2;
        case 267:
        case 'DEVICE_CONTROL_KEYCODE_STEM_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_3;
        case 268:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT;
        case 269:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT;
        case 270:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT;
        case 271:
        case 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT;
        case 272:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD;
        case 273:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD;
        case 274:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD;
        case 275:
        case 'DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD;
        case 276:
        case 'DEVICE_CONTROL_KEYCODE_SOFT_SLEEP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_SLEEP;
        case 277:
        case 'DEVICE_CONTROL_KEYCODE_CUT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CUT;
        case 278:
        case 'DEVICE_CONTROL_KEYCODE_COPY':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_COPY;
        case 279:
        case 'DEVICE_CONTROL_KEYCODE_PASTE':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PASTE;
        case 280:
        case 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP;
        case 281:
        case 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN;
        case 282:
        case 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT;
        case 283:
        case 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT;
        case 284:
        case 'DEVICE_CONTROL_KEYCODE_ALL_APPS':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALL_APPS;
        case 285:
        case 'DEVICE_CONTROL_KEYCODE_REFRESH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_REFRESH;
        case 286:
        case 'DEVICE_CONTROL_KEYCODE_THUMBS_UP':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_THUMBS_UP;
        case 287:
        case 'DEVICE_CONTROL_KEYCODE_THUMBS_DOWN':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_THUMBS_DOWN;
        case 288:
        case 'DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH;
        case 289:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_1;
        case 290:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_2;
        case 291:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_3;
        case 292:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_4;
        case 293:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_5':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_5;
        case 294:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_6':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_6;
        case 295:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_7':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_7;
        case 296:
        case 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_8':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_8;
        case 297:
        case 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_1;
        case 298:
        case 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_2;
        case 299:
        case 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_3;
        case 300:
        case 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_4;
        case 301:
        case 'DEVICE_CONTROL_KEYCODE_DEMO_APP_1':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_1;
        case 302:
        case 'DEVICE_CONTROL_KEYCODE_DEMO_APP_2':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_2;
        case 303:
        case 'DEVICE_CONTROL_KEYCODE_DEMO_APP_3':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_3;
        case 304:
        case 'DEVICE_CONTROL_KEYCODE_DEMO_APP_4':
            return DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_4;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlKeycode.UNRECOGNIZED;
    }
}
exports.deviceControlKeycodeFromJSON = deviceControlKeycodeFromJSON;
function deviceControlKeycodeToJSON(object) {
    switch (object) {
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_UNSPECIFIED:
            return 'DEVICE_CONTROL_KEYCODE_UNSPECIFIED';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_SOFT_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_SOFT_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HOME:
            return 'DEVICE_CONTROL_KEYCODE_HOME';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BACK:
            return 'DEVICE_CONTROL_KEYCODE_BACK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALL:
            return 'DEVICE_CONTROL_KEYCODE_CALL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENDCALL:
            return 'DEVICE_CONTROL_KEYCODE_ENDCALL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_0:
            return 'DEVICE_CONTROL_KEYCODE_0';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_1:
            return 'DEVICE_CONTROL_KEYCODE_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_2:
            return 'DEVICE_CONTROL_KEYCODE_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_3:
            return 'DEVICE_CONTROL_KEYCODE_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_4:
            return 'DEVICE_CONTROL_KEYCODE_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_5:
            return 'DEVICE_CONTROL_KEYCODE_5';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_6:
            return 'DEVICE_CONTROL_KEYCODE_6';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_7:
            return 'DEVICE_CONTROL_KEYCODE_7';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_8:
            return 'DEVICE_CONTROL_KEYCODE_8';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_9:
            return 'DEVICE_CONTROL_KEYCODE_9';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STAR:
            return 'DEVICE_CONTROL_KEYCODE_STAR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_POUND:
            return 'DEVICE_CONTROL_KEYCODE_POUND';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_CENTER:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_CENTER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_UP:
            return 'DEVICE_CONTROL_KEYCODE_VOLUME_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_VOLUME_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_POWER:
            return 'DEVICE_CONTROL_KEYCODE_POWER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAMERA:
            return 'DEVICE_CONTROL_KEYCODE_CAMERA';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CLEAR:
            return 'DEVICE_CONTROL_KEYCODE_CLEAR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_A:
            return 'DEVICE_CONTROL_KEYCODE_A';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_B:
            return 'DEVICE_CONTROL_KEYCODE_B';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_C:
            return 'DEVICE_CONTROL_KEYCODE_C';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_D:
            return 'DEVICE_CONTROL_KEYCODE_D';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_E:
            return 'DEVICE_CONTROL_KEYCODE_E';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F:
            return 'DEVICE_CONTROL_KEYCODE_F';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_G:
            return 'DEVICE_CONTROL_KEYCODE_G';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_H:
            return 'DEVICE_CONTROL_KEYCODE_H';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_I:
            return 'DEVICE_CONTROL_KEYCODE_I';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_J:
            return 'DEVICE_CONTROL_KEYCODE_J';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_K:
            return 'DEVICE_CONTROL_KEYCODE_K';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_L:
            return 'DEVICE_CONTROL_KEYCODE_L';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_M:
            return 'DEVICE_CONTROL_KEYCODE_M';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_N:
            return 'DEVICE_CONTROL_KEYCODE_N';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_O:
            return 'DEVICE_CONTROL_KEYCODE_O';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_P:
            return 'DEVICE_CONTROL_KEYCODE_P';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Q:
            return 'DEVICE_CONTROL_KEYCODE_Q';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_R:
            return 'DEVICE_CONTROL_KEYCODE_R';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_S:
            return 'DEVICE_CONTROL_KEYCODE_S';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_T:
            return 'DEVICE_CONTROL_KEYCODE_T';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_U:
            return 'DEVICE_CONTROL_KEYCODE_U';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_V:
            return 'DEVICE_CONTROL_KEYCODE_V';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_W:
            return 'DEVICE_CONTROL_KEYCODE_W';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_X:
            return 'DEVICE_CONTROL_KEYCODE_X';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Y:
            return 'DEVICE_CONTROL_KEYCODE_Y';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_Z:
            return 'DEVICE_CONTROL_KEYCODE_Z';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_COMMA:
            return 'DEVICE_CONTROL_KEYCODE_COMMA';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PERIOD:
            return 'DEVICE_CONTROL_KEYCODE_PERIOD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALT_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_ALT_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALT_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_ALT_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SHIFT_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_SHIFT_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TAB:
            return 'DEVICE_CONTROL_KEYCODE_TAB';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SPACE:
            return 'DEVICE_CONTROL_KEYCODE_SPACE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYM:
            return 'DEVICE_CONTROL_KEYCODE_SYM';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EXPLORER:
            return 'DEVICE_CONTROL_KEYCODE_EXPLORER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENVELOPE:
            return 'DEVICE_CONTROL_KEYCODE_ENVELOPE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ENTER:
            return 'DEVICE_CONTROL_KEYCODE_ENTER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEL:
            return 'DEVICE_CONTROL_KEYCODE_DEL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_GRAVE:
            return 'DEVICE_CONTROL_KEYCODE_GRAVE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MINUS:
            return 'DEVICE_CONTROL_KEYCODE_MINUS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EQUALS:
            return 'DEVICE_CONTROL_KEYCODE_EQUALS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LEFT_BRACKET:
            return 'DEVICE_CONTROL_KEYCODE_LEFT_BRACKET';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET:
            return 'DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BACKSLASH:
            return 'DEVICE_CONTROL_KEYCODE_BACKSLASH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SEMICOLON:
            return 'DEVICE_CONTROL_KEYCODE_SEMICOLON';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_APOSTROPHE:
            return 'DEVICE_CONTROL_KEYCODE_APOSTROPHE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SLASH:
            return 'DEVICE_CONTROL_KEYCODE_SLASH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AT:
            return 'DEVICE_CONTROL_KEYCODE_AT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUM:
            return 'DEVICE_CONTROL_KEYCODE_NUM';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HEADSETHOOK:
            return 'DEVICE_CONTROL_KEYCODE_HEADSETHOOK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FOCUS:
            return 'DEVICE_CONTROL_KEYCODE_FOCUS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PLUS:
            return 'DEVICE_CONTROL_KEYCODE_PLUS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MENU:
            return 'DEVICE_CONTROL_KEYCODE_MENU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NOTIFICATION:
            return 'DEVICE_CONTROL_KEYCODE_NOTIFICATION';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SEARCH:
            return 'DEVICE_CONTROL_KEYCODE_SEARCH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STOP:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_STOP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_NEXT:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_NEXT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_REWIND:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_REWIND';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUTE:
            return 'DEVICE_CONTROL_KEYCODE_MUTE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAGE_UP:
            return 'DEVICE_CONTROL_KEYCODE_PAGE_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAGE_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_PAGE_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PICTSYMBOLS:
            return 'DEVICE_CONTROL_KEYCODE_PICTSYMBOLS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET:
            return 'DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_A:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_A';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_B:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_B';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_C:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_C';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_X:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_X';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_Y:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_Y';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_Z:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_Z';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_L1:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_L1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_R1:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_R1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_L2:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_L2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_R2:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_R2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_START:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_START';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_SELECT:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_SELECT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_MODE:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_MODE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ESCAPE:
            return 'DEVICE_CONTROL_KEYCODE_ESCAPE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FORWARD_DEL:
            return 'DEVICE_CONTROL_KEYCODE_FORWARD_DEL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CTRL_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_CTRL_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CTRL_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_CTRL_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAPS_LOCK:
            return 'DEVICE_CONTROL_KEYCODE_CAPS_LOCK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SCROLL_LOCK:
            return 'DEVICE_CONTROL_KEYCODE_SCROLL_LOCK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_META_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_META_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_META_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_META_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FUNCTION:
            return 'DEVICE_CONTROL_KEYCODE_FUNCTION';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSRQ:
            return 'DEVICE_CONTROL_KEYCODE_SYSRQ';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BREAK:
            return 'DEVICE_CONTROL_KEYCODE_BREAK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MOVE_HOME:
            return 'DEVICE_CONTROL_KEYCODE_MOVE_HOME';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MOVE_END:
            return 'DEVICE_CONTROL_KEYCODE_MOVE_END';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_INSERT:
            return 'DEVICE_CONTROL_KEYCODE_INSERT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FORWARD:
            return 'DEVICE_CONTROL_KEYCODE_FORWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PLAY:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_PLAY';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_EJECT:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_EJECT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_RECORD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_RECORD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F1:
            return 'DEVICE_CONTROL_KEYCODE_F1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F2:
            return 'DEVICE_CONTROL_KEYCODE_F2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F3:
            return 'DEVICE_CONTROL_KEYCODE_F3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F4:
            return 'DEVICE_CONTROL_KEYCODE_F4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F5:
            return 'DEVICE_CONTROL_KEYCODE_F5';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F6:
            return 'DEVICE_CONTROL_KEYCODE_F6';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F7:
            return 'DEVICE_CONTROL_KEYCODE_F7';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F8:
            return 'DEVICE_CONTROL_KEYCODE_F8';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F9:
            return 'DEVICE_CONTROL_KEYCODE_F9';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F10:
            return 'DEVICE_CONTROL_KEYCODE_F10';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F11:
            return 'DEVICE_CONTROL_KEYCODE_F11';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_F12:
            return 'DEVICE_CONTROL_KEYCODE_F12';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUM_LOCK:
            return 'DEVICE_CONTROL_KEYCODE_NUM_LOCK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_0:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_0';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_1:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_2:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_3:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_4:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_5:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_5';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_6:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_6';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_7:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_7';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_8:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_8';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_9:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_9';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_ADD:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_ADD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_DOT:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_DOT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN:
            return 'DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOLUME_MUTE:
            return 'DEVICE_CONTROL_KEYCODE_VOLUME_MUTE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_INFO:
            return 'DEVICE_CONTROL_KEYCODE_INFO';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CHANNEL_UP:
            return 'DEVICE_CONTROL_KEYCODE_CHANNEL_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZOOM_IN:
            return 'DEVICE_CONTROL_KEYCODE_ZOOM_IN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZOOM_OUT:
            return 'DEVICE_CONTROL_KEYCODE_ZOOM_OUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV:
            return 'DEVICE_CONTROL_KEYCODE_TV';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_WINDOW:
            return 'DEVICE_CONTROL_KEYCODE_WINDOW';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_GUIDE:
            return 'DEVICE_CONTROL_KEYCODE_GUIDE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DVR:
            return 'DEVICE_CONTROL_KEYCODE_DVR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BOOKMARK:
            return 'DEVICE_CONTROL_KEYCODE_BOOKMARK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CAPTIONS:
            return 'DEVICE_CONTROL_KEYCODE_CAPTIONS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SETTINGS:
            return 'DEVICE_CONTROL_KEYCODE_SETTINGS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_POWER:
            return 'DEVICE_CONTROL_KEYCODE_TV_POWER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STB_POWER:
            return 'DEVICE_CONTROL_KEYCODE_STB_POWER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STB_INPUT:
            return 'DEVICE_CONTROL_KEYCODE_STB_INPUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AVR_POWER:
            return 'DEVICE_CONTROL_KEYCODE_AVR_POWER';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_AVR_INPUT:
            return 'DEVICE_CONTROL_KEYCODE_AVR_INPUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_RED:
            return 'DEVICE_CONTROL_KEYCODE_PROG_RED';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_GREEN:
            return 'DEVICE_CONTROL_KEYCODE_PROG_GREEN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_YELLOW:
            return 'DEVICE_CONTROL_KEYCODE_PROG_YELLOW';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROG_BLUE:
            return 'DEVICE_CONTROL_KEYCODE_PROG_BLUE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_APP_SWITCH:
            return 'DEVICE_CONTROL_KEYCODE_APP_SWITCH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_1:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_2:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_3:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_4:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_5:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_5';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_6:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_6';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_7:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_7';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_8:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_8';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_9:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_9';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_10:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_10';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_11:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_11';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_12:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_12';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_13:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_13';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_14:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_14';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_15:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_15';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BUTTON_16:
            return 'DEVICE_CONTROL_KEYCODE_BUTTON_16';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH:
            return 'DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MANNER_MODE:
            return 'DEVICE_CONTROL_KEYCODE_MANNER_MODE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_3D_MODE:
            return 'DEVICE_CONTROL_KEYCODE_3D_MODE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CONTACTS:
            return 'DEVICE_CONTROL_KEYCODE_CONTACTS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALENDAR:
            return 'DEVICE_CONTROL_KEYCODE_CALENDAR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUSIC:
            return 'DEVICE_CONTROL_KEYCODE_MUSIC';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CALCULATOR:
            return 'DEVICE_CONTROL_KEYCODE_CALCULATOR';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU:
            return 'DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_EISU:
            return 'DEVICE_CONTROL_KEYCODE_EISU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MUHENKAN:
            return 'DEVICE_CONTROL_KEYCODE_MUHENKAN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HENKAN:
            return 'DEVICE_CONTROL_KEYCODE_HENKAN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA:
            return 'DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_YEN:
            return 'DEVICE_CONTROL_KEYCODE_YEN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_RO:
            return 'DEVICE_CONTROL_KEYCODE_RO';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_KANA:
            return 'DEVICE_CONTROL_KEYCODE_KANA';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ASSIST:
            return 'DEVICE_CONTROL_KEYCODE_ASSIST';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP:
            return 'DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SLEEP:
            return 'DEVICE_CONTROL_KEYCODE_SLEEP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_WAKEUP:
            return 'DEVICE_CONTROL_KEYCODE_WAKEUP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PAIRING:
            return 'DEVICE_CONTROL_KEYCODE_PAIRING';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_11:
            return 'DEVICE_CONTROL_KEYCODE_11';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_12:
            return 'DEVICE_CONTROL_KEYCODE_12';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_LAST_CHANNEL:
            return 'DEVICE_CONTROL_KEYCODE_LAST_CHANNEL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE:
            return 'DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VOICE_ASSIST:
            return 'DEVICE_CONTROL_KEYCODE_VOICE_ASSIST';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE:
            return 'DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TELETEXT:
            return 'DEVICE_CONTROL_KEYCODE_TV_TELETEXT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY:
            return 'DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG:
            return 'DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL:
            return 'DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE:
            return 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS:
            return 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS:
            return 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE:
            return 'DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_NETWORK:
            return 'DEVICE_CONTROL_KEYCODE_TV_NETWORK';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE:
            return 'DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1:
            return 'DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION:
            return 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP:
            return 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE:
            return 'DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU:
            return 'DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU:
            return 'DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING:
            return 'DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_HELP:
            return 'DEVICE_CONTROL_KEYCODE_HELP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS:
            return 'DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT:
            return 'DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_IN:
            return 'DEVICE_CONTROL_KEYCODE_NAVIGATE_IN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT:
            return 'DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_PRIMARY:
            return 'DEVICE_CONTROL_KEYCODE_STEM_PRIMARY';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_1:
            return 'DEVICE_CONTROL_KEYCODE_STEM_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_2:
            return 'DEVICE_CONTROL_KEYCODE_STEM_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_STEM_3:
            return 'DEVICE_CONTROL_KEYCODE_STEM_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD:
            return 'DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SOFT_SLEEP:
            return 'DEVICE_CONTROL_KEYCODE_SOFT_SLEEP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_CUT:
            return 'DEVICE_CONTROL_KEYCODE_CUT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_COPY:
            return 'DEVICE_CONTROL_KEYCODE_COPY';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PASTE:
            return 'DEVICE_CONTROL_KEYCODE_PASTE';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP:
            return 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT:
            return 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT:
            return 'DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_ALL_APPS:
            return 'DEVICE_CONTROL_KEYCODE_ALL_APPS';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_REFRESH:
            return 'DEVICE_CONTROL_KEYCODE_REFRESH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_THUMBS_UP:
            return 'DEVICE_CONTROL_KEYCODE_THUMBS_UP';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_THUMBS_DOWN:
            return 'DEVICE_CONTROL_KEYCODE_THUMBS_DOWN';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH:
            return 'DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_1:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_2:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_3:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_4:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_5:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_5';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_6:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_6';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_7:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_7';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_VIDEO_APP_8:
            return 'DEVICE_CONTROL_KEYCODE_VIDEO_APP_8';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_1:
            return 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_2:
            return 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_3:
            return 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_FEATURED_APP_4:
            return 'DEVICE_CONTROL_KEYCODE_FEATURED_APP_4';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_1:
            return 'DEVICE_CONTROL_KEYCODE_DEMO_APP_1';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_2:
            return 'DEVICE_CONTROL_KEYCODE_DEMO_APP_2';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_3:
            return 'DEVICE_CONTROL_KEYCODE_DEMO_APP_3';
        case DeviceControlKeycode.DEVICE_CONTROL_KEYCODE_DEMO_APP_4:
            return 'DEVICE_CONTROL_KEYCODE_DEMO_APP_4';
        case DeviceControlKeycode.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlKeycodeToJSON = deviceControlKeycodeToJSON;
var DeviceControlButton;
(function (DeviceControlButton) {
    /**
     * DEVICE_CONTROL_BUTTON_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/MotionEvent.java
     * https://developer.android.com/reference/android/view/MotionEvent
     */
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_BUTTON_UNSPECIFIED";
    /** DEVICE_CONTROL_BUTTON_PRIMARY - left mouse */
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_PRIMARY"] = 1] = "DEVICE_CONTROL_BUTTON_PRIMARY";
    /** DEVICE_CONTROL_BUTTON_SECONDARY - right mouse */
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_SECONDARY"] = 2] = "DEVICE_CONTROL_BUTTON_SECONDARY";
    /** DEVICE_CONTROL_BUTTON_TERTIARY - middle mouse */
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_TERTIARY"] = 4] = "DEVICE_CONTROL_BUTTON_TERTIARY";
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_BACK"] = 8] = "DEVICE_CONTROL_BUTTON_BACK";
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_FORWARD"] = 16] = "DEVICE_CONTROL_BUTTON_FORWARD";
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY"] = 32] = "DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY";
    DeviceControlButton[DeviceControlButton["DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY"] = 64] = "DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY";
    DeviceControlButton[DeviceControlButton["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlButton = exports.DeviceControlButton || (exports.DeviceControlButton = {}));
function deviceControlButtonFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_BUTTON_UNSPECIFIED':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_BUTTON_PRIMARY':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_PRIMARY;
        case 2:
        case 'DEVICE_CONTROL_BUTTON_SECONDARY':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_SECONDARY;
        case 4:
        case 'DEVICE_CONTROL_BUTTON_TERTIARY':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_TERTIARY;
        case 8:
        case 'DEVICE_CONTROL_BUTTON_BACK':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_BACK;
        case 16:
        case 'DEVICE_CONTROL_BUTTON_FORWARD':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_FORWARD;
        case 32:
        case 'DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY;
        case 64:
        case 'DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY':
            return DeviceControlButton.DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlButton.UNRECOGNIZED;
    }
}
exports.deviceControlButtonFromJSON = deviceControlButtonFromJSON;
function deviceControlButtonToJSON(object) {
    switch (object) {
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_UNSPECIFIED:
            return 'DEVICE_CONTROL_BUTTON_UNSPECIFIED';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_PRIMARY:
            return 'DEVICE_CONTROL_BUTTON_PRIMARY';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_SECONDARY:
            return 'DEVICE_CONTROL_BUTTON_SECONDARY';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_TERTIARY:
            return 'DEVICE_CONTROL_BUTTON_TERTIARY';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_BACK:
            return 'DEVICE_CONTROL_BUTTON_BACK';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_FORWARD:
            return 'DEVICE_CONTROL_BUTTON_FORWARD';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY:
            return 'DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY';
        case DeviceControlButton.DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY:
            return 'DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY';
        case DeviceControlButton.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlButtonToJSON = deviceControlButtonToJSON;
var DeviceControlCopyKey;
(function (DeviceControlCopyKey) {
    DeviceControlCopyKey[DeviceControlCopyKey["DEVICE_CONTROL_COPY_KEY_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_COPY_KEY_UNSPECIFIED";
    DeviceControlCopyKey[DeviceControlCopyKey["DEVICE_CONTROL_COPY_KEY_COPY"] = 1] = "DEVICE_CONTROL_COPY_KEY_COPY";
    DeviceControlCopyKey[DeviceControlCopyKey["DEVICE_CONTROL_COPY_KEY_CUT"] = 2] = "DEVICE_CONTROL_COPY_KEY_CUT";
    DeviceControlCopyKey[DeviceControlCopyKey["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlCopyKey = exports.DeviceControlCopyKey || (exports.DeviceControlCopyKey = {}));
function deviceControlCopyKeyFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_COPY_KEY_UNSPECIFIED':
            return DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_UNSPECIFIED;
        case 1:
        case 'DEVICE_CONTROL_COPY_KEY_COPY':
            return DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_COPY;
        case 2:
        case 'DEVICE_CONTROL_COPY_KEY_CUT':
            return DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_CUT;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlCopyKey.UNRECOGNIZED;
    }
}
exports.deviceControlCopyKeyFromJSON = deviceControlCopyKeyFromJSON;
function deviceControlCopyKeyToJSON(object) {
    switch (object) {
        case DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_UNSPECIFIED:
            return 'DEVICE_CONTROL_COPY_KEY_UNSPECIFIED';
        case DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_COPY:
            return 'DEVICE_CONTROL_COPY_KEY_COPY';
        case DeviceControlCopyKey.DEVICE_CONTROL_COPY_KEY_CUT:
            return 'DEVICE_CONTROL_COPY_KEY_CUT';
        case DeviceControlCopyKey.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlCopyKeyToJSON = deviceControlCopyKeyToJSON;
var DeviceControlSequece;
(function (DeviceControlSequece) {
    DeviceControlSequece[DeviceControlSequece["DEVICE_CONTROL_SEQUECE_UNSPECIFIED"] = 0] = "DEVICE_CONTROL_SEQUECE_UNSPECIFIED";
    DeviceControlSequece[DeviceControlSequece["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DeviceControlSequece = exports.DeviceControlSequece || (exports.DeviceControlSequece = {}));
function deviceControlSequeceFromJSON(object) {
    switch (object) {
        case 0:
        case 'DEVICE_CONTROL_SEQUECE_UNSPECIFIED':
            return DeviceControlSequece.DEVICE_CONTROL_SEQUECE_UNSPECIFIED;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return DeviceControlSequece.UNRECOGNIZED;
    }
}
exports.deviceControlSequeceFromJSON = deviceControlSequeceFromJSON;
function deviceControlSequeceToJSON(object) {
    switch (object) {
        case DeviceControlSequece.DEVICE_CONTROL_SEQUECE_UNSPECIFIED:
            return 'DEVICE_CONTROL_SEQUECE_UNSPECIFIED';
        case DeviceControlSequece.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}
exports.deviceControlSequeceToJSON = deviceControlSequeceToJSON;
function createBaseDevicePosition() {
    return { x: 0, y: 0, screenWidth: 0, screenHeight: 0 };
}
exports.DevicePosition = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.x !== 0) {
            writer.uint32(13).sfixed32(message.x);
        }
        if (message.y !== 0) {
            writer.uint32(21).sfixed32(message.y);
        }
        if (message.screenWidth !== 0) {
            writer.uint32(29).fixed32(message.screenWidth);
        }
        if (message.screenHeight !== 0) {
            writer.uint32(37).fixed32(message.screenHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDevicePosition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.x = reader.sfixed32();
                    break;
                case 2:
                    message.y = reader.sfixed32();
                    break;
                case 3:
                    message.screenWidth = reader.fixed32();
                    break;
                case 4:
                    message.screenHeight = reader.fixed32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            x: isSet(object.x) ? Number(object.x) : 0,
            y: isSet(object.y) ? Number(object.y) : 0,
            screenWidth: isSet(object.screenWidth) ? Number(object.screenWidth) : 0,
            screenHeight: isSet(object.screenHeight) ? Number(object.screenHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.x !== undefined && (obj.x = Math.round(message.x));
        message.y !== undefined && (obj.y = Math.round(message.y));
        message.screenWidth !== undefined && (obj.screenWidth = Math.round(message.screenWidth));
        message.screenHeight !== undefined && (obj.screenHeight = Math.round(message.screenHeight));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDevicePosition();
        message.x = object.x ?? 0;
        message.y = object.y ?? 0;
        message.screenWidth = object.screenWidth ?? 0;
        message.screenHeight = object.screenHeight ?? 0;
        return message;
    },
};
function createBaseDeviceControl() {
    return {
        type: 0,
        text: '',
        metaState: 0,
        action: 0,
        keycode: 0,
        buttons: 0,
        pointerId: 0,
        pressure: 0,
        position: undefined,
        hScroll: 0,
        vScroll: 0,
        copyKey: 0,
        paste: false,
        repeat: 0,
        sequence: 0,
        key: '',
        timeStamp: 0,
    };
}
exports.DeviceControl = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.text !== '') {
            writer.uint32(18).string(message.text);
        }
        if (message.metaState !== 0) {
            writer.uint32(24).int32(message.metaState);
        }
        if (message.action !== 0) {
            writer.uint32(32).int32(message.action);
        }
        if (message.keycode !== 0) {
            writer.uint32(40).int32(message.keycode);
        }
        if (message.buttons !== 0) {
            writer.uint32(53).sfixed32(message.buttons);
        }
        if (message.pointerId !== 0) {
            writer.uint32(57).sfixed64(message.pointerId);
        }
        if (message.pressure !== 0) {
            writer.uint32(69).float(message.pressure);
        }
        if (message.position !== undefined) {
            exports.DevicePosition.encode(message.position, writer.uint32(74).fork()).ldelim();
        }
        if (message.hScroll !== 0) {
            writer.uint32(85).sfixed32(message.hScroll);
        }
        if (message.vScroll !== 0) {
            writer.uint32(93).sfixed32(message.vScroll);
        }
        if (message.copyKey !== 0) {
            writer.uint32(96).int32(message.copyKey);
        }
        if (message.paste === true) {
            writer.uint32(104).bool(message.paste);
        }
        if (message.repeat !== 0) {
            writer.uint32(117).sfixed32(message.repeat);
        }
        if (message.sequence !== 0) {
            writer.uint32(121).sfixed64(message.sequence);
        }
        if (message.key !== '') {
            writer.uint32(130).string(message.key);
        }
        if (message.timeStamp !== 0) {
            writer.uint32(137).fixed64(message.timeStamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeviceControl();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.text = reader.string();
                    break;
                case 3:
                    message.metaState = reader.int32();
                    break;
                case 4:
                    message.action = reader.int32();
                    break;
                case 5:
                    message.keycode = reader.int32();
                    break;
                case 6:
                    message.buttons = reader.sfixed32();
                    break;
                case 7:
                    message.pointerId = longToNumber(reader.sfixed64());
                    break;
                case 8:
                    message.pressure = reader.float();
                    break;
                case 9:
                    message.position = exports.DevicePosition.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.hScroll = reader.sfixed32();
                    break;
                case 11:
                    message.vScroll = reader.sfixed32();
                    break;
                case 12:
                    message.copyKey = reader.int32();
                    break;
                case 13:
                    message.paste = reader.bool();
                    break;
                case 14:
                    message.repeat = reader.sfixed32();
                    break;
                case 15:
                    message.sequence = longToNumber(reader.sfixed64());
                    break;
                case 16:
                    message.key = reader.string();
                    break;
                case 17:
                    message.timeStamp = longToNumber(reader.fixed64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            type: isSet(object.type) ? deviceControlTypeFromJSON(object.type) : 0,
            text: isSet(object.text) ? String(object.text) : '',
            metaState: isSet(object.metaState) ? deviceControlMetaStateFromJSON(object.metaState) : 0,
            action: isSet(object.action) ? deviceControlActionFromJSON(object.action) : 0,
            keycode: isSet(object.keycode) ? deviceControlKeycodeFromJSON(object.keycode) : 0,
            buttons: isSet(object.buttons) ? Number(object.buttons) : 0,
            pointerId: isSet(object.pointerId) ? Number(object.pointerId) : 0,
            pressure: isSet(object.pressure) ? Number(object.pressure) : 0,
            position: isSet(object.position) ? exports.DevicePosition.fromJSON(object.position) : undefined,
            hScroll: isSet(object.hScroll) ? Number(object.hScroll) : 0,
            vScroll: isSet(object.vScroll) ? Number(object.vScroll) : 0,
            copyKey: isSet(object.copyKey) ? deviceControlCopyKeyFromJSON(object.copyKey) : 0,
            paste: isSet(object.paste) ? Boolean(object.paste) : false,
            repeat: isSet(object.repeat) ? Number(object.repeat) : 0,
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
            key: isSet(object.key) ? String(object.key) : '',
            timeStamp: isSet(object.timeStamp) ? Number(object.timeStamp) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = deviceControlTypeToJSON(message.type));
        message.text !== undefined && (obj.text = message.text);
        message.metaState !== undefined && (obj.metaState = deviceControlMetaStateToJSON(message.metaState));
        message.action !== undefined && (obj.action = deviceControlActionToJSON(message.action));
        message.keycode !== undefined && (obj.keycode = deviceControlKeycodeToJSON(message.keycode));
        message.buttons !== undefined && (obj.buttons = Math.round(message.buttons));
        message.pointerId !== undefined && (obj.pointerId = Math.round(message.pointerId));
        message.pressure !== undefined && (obj.pressure = message.pressure);
        message.position !== undefined && (obj.position = message.position ? exports.DevicePosition.toJSON(message.position) : undefined);
        message.hScroll !== undefined && (obj.hScroll = Math.round(message.hScroll));
        message.vScroll !== undefined && (obj.vScroll = Math.round(message.vScroll));
        message.copyKey !== undefined && (obj.copyKey = deviceControlCopyKeyToJSON(message.copyKey));
        message.paste !== undefined && (obj.paste = message.paste);
        message.repeat !== undefined && (obj.repeat = Math.round(message.repeat));
        message.sequence !== undefined && (obj.sequence = Math.round(message.sequence));
        message.key !== undefined && (obj.key = message.key);
        message.timeStamp !== undefined && (obj.timeStamp = Math.round(message.timeStamp));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDeviceControl();
        message.type = object.type ?? 0;
        message.text = object.text ?? '';
        message.metaState = object.metaState ?? 0;
        message.action = object.action ?? 0;
        message.keycode = object.keycode ?? 0;
        message.buttons = object.buttons ?? 0;
        message.pointerId = object.pointerId ?? 0;
        message.pressure = object.pressure ?? 0;
        message.position = object.position !== undefined && object.position !== null ? exports.DevicePosition.fromPartial(object.position) : undefined;
        message.hScroll = object.hScroll ?? 0;
        message.vScroll = object.vScroll ?? 0;
        message.copyKey = object.copyKey ?? 0;
        message.paste = object.paste ?? false;
        message.repeat = object.repeat ?? 0;
        message.sequence = object.sequence ?? 0;
        message.key = object.key ?? '';
        message.timeStamp = object.timeStamp ?? 0;
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
