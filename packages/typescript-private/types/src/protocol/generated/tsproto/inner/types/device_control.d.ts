import _m0 from 'protobufjs/minimal';
export declare enum DeviceControlType {
    DEVICE_CONTROL_TYPE_UNSPECIFIED = 0,
    DEVICE_CONTROL_TYPE_AOS_INJECT_KEYCODE = 1,
    DEVICE_CONTROL_TYPE_AOS_INJECT_TEXT = 2,
    DEVICE_CONTROL_TYPE_AOS_INJECT_TOUCH_EVENT = 3,
    DEVICE_CONTROL_TYPE_AOS_INJECT_SCROLL_EVENT = 4,
    DEVICE_CONTROL_TYPE_AOS_BACK_OR_SCREEN_ON = 5,
    DEVICE_CONTROL_TYPE_AOS_EXPAND_NOTIFICATION_PANEL = 6,
    DEVICE_CONTROL_TYPE_AOS_EXPAND_SETTINGS_PANEL = 7,
    DEVICE_CONTROL_TYPE_AOS_COLLAPSE_PANELS = 8,
    DEVICE_CONTROL_TYPE_AOS_GET_CLIPBOARD = 9,
    DEVICE_CONTROL_TYPE_AOS_SET_CLIPBOARD = 10,
    DEVICE_CONTROL_TYPE_AOS_SET_SCREEN_POWER_MODE = 11,
    DEVICE_CONTROL_TYPE_AOS_ROTATE_DEVICE = 12,
    /** DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE - desktop */
    DEVICE_CONTROL_TYPE_DESKTOP_INJECT_KEYCODE = 1,
    DEVICE_CONTROL_TYPE_DESKTOP_INJECT_TEXT = 2,
    DEVICE_CONTROL_TYPE_DESKTOP_INJECT_MOUSE_EVENT = 3,
    DEVICE_CONTROL_TYPE_DESKTOP_INJECT_SCROLL_EVENT = 4,
    DEVICE_CONTROL_TYPE_DESKTOP_GET_CLIPBOARD = 9,
    DEVICE_CONTROL_TYPE_DESKTOP_SET_CLIPBOARD = 10,
    DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_FOCUSED = 30,
    DEVICE_CONTROL_TYPE_DESKTOP_ONSCREEN_UNFOCUSED = 31,
    DEVICE_CONTROL_TYPE_IOS_INJECT_KEYCODE = 1,
    DEVICE_CONTROL_TYPE_IOS_INJECT_TEXT = 2,
    DEVICE_CONTROL_TYPE_IOS_INJECT_TOUCH_EVENT = 3,
    DEVICE_CONTROL_TYPE_IOS_INJECT_SCROLL_EVENT = 4,
    DEVICE_CONTROL_TYPE_IOS_GET_CLIPBOARD = 9,
    DEVICE_CONTROL_TYPE_IOS_SET_CLIPBOARD = 10,
    UNRECOGNIZED = -1
}
export declare function deviceControlTypeFromJSON(object: any): DeviceControlType;
export declare function deviceControlTypeToJSON(object: DeviceControlType): string;
export declare enum DeviceControlMetaState {
    /**
     * DEVICE_CONTROL_META_STATE_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DEVICE_CONTROL_META_STATE_UNSPECIFIED = 0,
    DEVICE_CONTROL_META_STATE_AOS_CAP_LOCKED = 256,
    DEVICE_CONTROL_META_STATE_AOS_ALT_LOCKED = 512,
    DEVICE_CONTROL_META_STATE_AOS_SYM_LOCKED = 1024,
    DEVICE_CONTROL_META_STATE_AOS_SELECTING = 2048,
    DEVICE_CONTROL_META_STATE_AOS_ALT_ON = 2,
    DEVICE_CONTROL_META_STATE_AOS_ALT_LEFT_ON = 16,
    DEVICE_CONTROL_META_STATE_AOS_ALT_RIGHT_ON = 32,
    DEVICE_CONTROL_META_STATE_AOS_SHIFT_ON = 1,
    DEVICE_CONTROL_META_STATE_AOS_SHIFT_LEFT_ON = 64,
    DEVICE_CONTROL_META_STATE_AOS_SHIFT_RIGHT_ON = 128,
    DEVICE_CONTROL_META_STATE_AOS_SYM_ON = 4,
    DEVICE_CONTROL_META_STATE_AOS_FUNCTION_ON = 8,
    DEVICE_CONTROL_META_STATE_AOS_CTRL_ON = 4096,
    DEVICE_CONTROL_META_STATE_AOS_CTRL_LEFT_ON = 8192,
    DEVICE_CONTROL_META_STATE_AOS_CTRL_RIGHT_ON = 16384,
    DEVICE_CONTROL_META_STATE_AOS_META_ON = 65536,
    DEVICE_CONTROL_META_STATE_AOS_META_LEFT_ON = 131072,
    DEVICE_CONTROL_META_STATE_AOS_META_RIGHT_ON = 262144,
    DEVICE_CONTROL_META_STATE_AOS_CAPS_LOCK_ON = 1048576,
    DEVICE_CONTROL_META_STATE_AOS_NUM_LOCK_ON = 2097152,
    DEVICE_CONTROL_META_STATE_AOS_SCROLL_LOCK_ON = 4194304,
    /** DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK - META_SHIFT_ON | META_SHIFT_LEFT_ON | META_SHIFT_RIGHT_ON; */
    DEVICE_CONTROL_META_STATE_AOS_SHIFT_MASK = 193,
    /** DEVICE_CONTROL_META_STATE_AOS_ALT_MASK - META_ALT_ON | META_ALT_LEFT_ON | META_ALT_RIGHT_ON; */
    DEVICE_CONTROL_META_STATE_AOS_ALT_MASK = 50,
    /** DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK - META_CTRL_ON | META_CTRL_LEFT_ON | META_CTRL_RIGHT_ON; */
    DEVICE_CONTROL_META_STATE_AOS_CTRL_MASK = 28672,
    /** DEVICE_CONTROL_META_STATE_AOS_META_MASK - META_META_ON | META_META_LEFT_ON | META_META_RIGHT_ON; */
    DEVICE_CONTROL_META_STATE_AOS_META_MASK = 458752,
    /** DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT - desktop */
    DEVICE_CONTROL_META_STATE_DESKTOP_SHIFT = 1,
    DEVICE_CONTROL_META_STATE_DESKTOP_ALT = 2,
    DEVICE_CONTROL_META_STATE_DESKTOP_CTRL = 4096,
    DEVICE_CONTROL_META_STATE_DESKTOP_META = 65536,
    UNRECOGNIZED = -1
}
export declare function deviceControlMetaStateFromJSON(object: any): DeviceControlMetaState;
export declare function deviceControlMetaStateToJSON(object: DeviceControlMetaState): string;
export declare enum DeviceControlAction {
    DEVICE_CONTROL_ACTION_UNSPECIFIED = 0,
    /**
     * DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_DOWN_UNSPECIFIED = 0,
    DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_UP = 1,
    DEVICE_CONTROL_ACTION_AOS_KEYEVENT_ACTION_MULTIPLE = 2,
    /**
     * DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/MotionEvent.java
     * https://developer.android.com/reference/android/view/MotionEvent
     */
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_DOWN_UNSPECIFIED = 0,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_UP = 1,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_MOVE = 2,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_CANCEL = 3,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_OUTSIDE = 4,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_DOWN = 5,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_POINTER_UP = 6,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_MOVE = 7,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_SCROLL = 8,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_ENTER = 9,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_HOVER_EXIT = 10,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_PRESS = 11,
    DEVICE_CONTROL_ACTION_AOS_MOTIONEVENT_ACTION_BUTTON_RELEASE = 12,
    /** DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED - desktop */
    DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWN_UNSPECIFIED = 0,
    DEVICE_CONTROL_ACTION_DESKTOP_ACTION_UP = 1,
    DEVICE_CONTROL_ACTION_DESKTOP_ACTION_MOVE = 2,
    DEVICE_CONTROL_ACTION_DESKTOP_ACTION_DOWNUP = 20,
    DEVICE_CONTROL_ACTION_IOS_ACTION_DOWN_UNSPECIFIED = 0,
    DEVICE_CONTROL_ACTION_IOS_ACTION_UP = 1,
    DEVICE_CONTROL_ACTION_IOS_ACTION_MOVE = 2,
    DEVICE_CONTROL_ACTION_IOS_ACTION_SCROLL = 8,
    UNRECOGNIZED = -1
}
export declare function deviceControlActionFromJSON(object: any): DeviceControlAction;
export declare function deviceControlActionToJSON(object: DeviceControlAction): string;
export declare enum DeviceControlKeycode {
    DEVICE_CONTROL_KEYCODE_UNSPECIFIED = 0,
    /**
     * DEVICE_CONTROL_KEYCODE_SOFT_LEFT - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
     * https://developer.android.com/reference/android/view/KeyEvent
     */
    DEVICE_CONTROL_KEYCODE_SOFT_LEFT = 1,
    DEVICE_CONTROL_KEYCODE_SOFT_RIGHT = 2,
    DEVICE_CONTROL_KEYCODE_HOME = 3,
    DEVICE_CONTROL_KEYCODE_BACK = 4,
    DEVICE_CONTROL_KEYCODE_CALL = 5,
    DEVICE_CONTROL_KEYCODE_ENDCALL = 6,
    DEVICE_CONTROL_KEYCODE_0 = 7,
    DEVICE_CONTROL_KEYCODE_1 = 8,
    DEVICE_CONTROL_KEYCODE_2 = 9,
    DEVICE_CONTROL_KEYCODE_3 = 10,
    DEVICE_CONTROL_KEYCODE_4 = 11,
    DEVICE_CONTROL_KEYCODE_5 = 12,
    DEVICE_CONTROL_KEYCODE_6 = 13,
    DEVICE_CONTROL_KEYCODE_7 = 14,
    DEVICE_CONTROL_KEYCODE_8 = 15,
    DEVICE_CONTROL_KEYCODE_9 = 16,
    DEVICE_CONTROL_KEYCODE_STAR = 17,
    DEVICE_CONTROL_KEYCODE_POUND = 18,
    DEVICE_CONTROL_KEYCODE_DPAD_UP = 19,
    DEVICE_CONTROL_KEYCODE_DPAD_DOWN = 20,
    DEVICE_CONTROL_KEYCODE_DPAD_LEFT = 21,
    DEVICE_CONTROL_KEYCODE_DPAD_RIGHT = 22,
    DEVICE_CONTROL_KEYCODE_DPAD_CENTER = 23,
    DEVICE_CONTROL_KEYCODE_VOLUME_UP = 24,
    DEVICE_CONTROL_KEYCODE_VOLUME_DOWN = 25,
    DEVICE_CONTROL_KEYCODE_POWER = 26,
    DEVICE_CONTROL_KEYCODE_CAMERA = 27,
    DEVICE_CONTROL_KEYCODE_CLEAR = 28,
    DEVICE_CONTROL_KEYCODE_A = 29,
    DEVICE_CONTROL_KEYCODE_B = 30,
    DEVICE_CONTROL_KEYCODE_C = 31,
    DEVICE_CONTROL_KEYCODE_D = 32,
    DEVICE_CONTROL_KEYCODE_E = 33,
    DEVICE_CONTROL_KEYCODE_F = 34,
    DEVICE_CONTROL_KEYCODE_G = 35,
    DEVICE_CONTROL_KEYCODE_H = 36,
    DEVICE_CONTROL_KEYCODE_I = 37,
    DEVICE_CONTROL_KEYCODE_J = 38,
    DEVICE_CONTROL_KEYCODE_K = 39,
    DEVICE_CONTROL_KEYCODE_L = 40,
    DEVICE_CONTROL_KEYCODE_M = 41,
    DEVICE_CONTROL_KEYCODE_N = 42,
    DEVICE_CONTROL_KEYCODE_O = 43,
    DEVICE_CONTROL_KEYCODE_P = 44,
    DEVICE_CONTROL_KEYCODE_Q = 45,
    DEVICE_CONTROL_KEYCODE_R = 46,
    DEVICE_CONTROL_KEYCODE_S = 47,
    DEVICE_CONTROL_KEYCODE_T = 48,
    DEVICE_CONTROL_KEYCODE_U = 49,
    DEVICE_CONTROL_KEYCODE_V = 50,
    DEVICE_CONTROL_KEYCODE_W = 51,
    DEVICE_CONTROL_KEYCODE_X = 52,
    DEVICE_CONTROL_KEYCODE_Y = 53,
    DEVICE_CONTROL_KEYCODE_Z = 54,
    DEVICE_CONTROL_KEYCODE_COMMA = 55,
    DEVICE_CONTROL_KEYCODE_PERIOD = 56,
    DEVICE_CONTROL_KEYCODE_ALT_LEFT = 57,
    DEVICE_CONTROL_KEYCODE_ALT_RIGHT = 58,
    DEVICE_CONTROL_KEYCODE_SHIFT_LEFT = 59,
    DEVICE_CONTROL_KEYCODE_SHIFT_RIGHT = 60,
    DEVICE_CONTROL_KEYCODE_TAB = 61,
    DEVICE_CONTROL_KEYCODE_SPACE = 62,
    DEVICE_CONTROL_KEYCODE_SYM = 63,
    DEVICE_CONTROL_KEYCODE_EXPLORER = 64,
    DEVICE_CONTROL_KEYCODE_ENVELOPE = 65,
    DEVICE_CONTROL_KEYCODE_ENTER = 66,
    DEVICE_CONTROL_KEYCODE_DEL = 67,
    DEVICE_CONTROL_KEYCODE_GRAVE = 68,
    DEVICE_CONTROL_KEYCODE_MINUS = 69,
    DEVICE_CONTROL_KEYCODE_EQUALS = 70,
    DEVICE_CONTROL_KEYCODE_LEFT_BRACKET = 71,
    DEVICE_CONTROL_KEYCODE_RIGHT_BRACKET = 72,
    DEVICE_CONTROL_KEYCODE_BACKSLASH = 73,
    DEVICE_CONTROL_KEYCODE_SEMICOLON = 74,
    DEVICE_CONTROL_KEYCODE_APOSTROPHE = 75,
    DEVICE_CONTROL_KEYCODE_SLASH = 76,
    DEVICE_CONTROL_KEYCODE_AT = 77,
    DEVICE_CONTROL_KEYCODE_NUM = 78,
    DEVICE_CONTROL_KEYCODE_HEADSETHOOK = 79,
    /** DEVICE_CONTROL_KEYCODE_FOCUS - Camera* focus */
    DEVICE_CONTROL_KEYCODE_FOCUS = 80,
    DEVICE_CONTROL_KEYCODE_PLUS = 81,
    DEVICE_CONTROL_KEYCODE_MENU = 82,
    DEVICE_CONTROL_KEYCODE_NOTIFICATION = 83,
    DEVICE_CONTROL_KEYCODE_SEARCH = 84,
    DEVICE_CONTROL_KEYCODE_MEDIA_PLAY_PAUSE = 85,
    DEVICE_CONTROL_KEYCODE_MEDIA_STOP = 86,
    DEVICE_CONTROL_KEYCODE_MEDIA_NEXT = 87,
    DEVICE_CONTROL_KEYCODE_MEDIA_PREVIOUS = 88,
    DEVICE_CONTROL_KEYCODE_MEDIA_REWIND = 89,
    DEVICE_CONTROL_KEYCODE_MEDIA_FAST_FORWARD = 90,
    DEVICE_CONTROL_KEYCODE_MUTE = 91,
    DEVICE_CONTROL_KEYCODE_PAGE_UP = 92,
    DEVICE_CONTROL_KEYCODE_PAGE_DOWN = 93,
    /** DEVICE_CONTROL_KEYCODE_PICTSYMBOLS - switch symbol-sets (Emoji,Kao-moji) */
    DEVICE_CONTROL_KEYCODE_PICTSYMBOLS = 94,
    /** DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET - switch char-sets (Kanji,Katakana) */
    DEVICE_CONTROL_KEYCODE_SWITCH_CHARSET = 95,
    DEVICE_CONTROL_KEYCODE_BUTTON_A = 96,
    DEVICE_CONTROL_KEYCODE_BUTTON_B = 97,
    DEVICE_CONTROL_KEYCODE_BUTTON_C = 98,
    DEVICE_CONTROL_KEYCODE_BUTTON_X = 99,
    DEVICE_CONTROL_KEYCODE_BUTTON_Y = 100,
    DEVICE_CONTROL_KEYCODE_BUTTON_Z = 101,
    DEVICE_CONTROL_KEYCODE_BUTTON_L1 = 102,
    DEVICE_CONTROL_KEYCODE_BUTTON_R1 = 103,
    DEVICE_CONTROL_KEYCODE_BUTTON_L2 = 104,
    DEVICE_CONTROL_KEYCODE_BUTTON_R2 = 105,
    DEVICE_CONTROL_KEYCODE_BUTTON_THUMBL = 106,
    DEVICE_CONTROL_KEYCODE_BUTTON_THUMBR = 107,
    DEVICE_CONTROL_KEYCODE_BUTTON_START = 108,
    DEVICE_CONTROL_KEYCODE_BUTTON_SELECT = 109,
    DEVICE_CONTROL_KEYCODE_BUTTON_MODE = 110,
    DEVICE_CONTROL_KEYCODE_ESCAPE = 111,
    DEVICE_CONTROL_KEYCODE_FORWARD_DEL = 112,
    DEVICE_CONTROL_KEYCODE_CTRL_LEFT = 113,
    DEVICE_CONTROL_KEYCODE_CTRL_RIGHT = 114,
    DEVICE_CONTROL_KEYCODE_CAPS_LOCK = 115,
    DEVICE_CONTROL_KEYCODE_SCROLL_LOCK = 116,
    DEVICE_CONTROL_KEYCODE_META_LEFT = 117,
    DEVICE_CONTROL_KEYCODE_META_RIGHT = 118,
    DEVICE_CONTROL_KEYCODE_FUNCTION = 119,
    DEVICE_CONTROL_KEYCODE_SYSRQ = 120,
    DEVICE_CONTROL_KEYCODE_BREAK = 121,
    DEVICE_CONTROL_KEYCODE_MOVE_HOME = 122,
    DEVICE_CONTROL_KEYCODE_MOVE_END = 123,
    DEVICE_CONTROL_KEYCODE_INSERT = 124,
    DEVICE_CONTROL_KEYCODE_FORWARD = 125,
    DEVICE_CONTROL_KEYCODE_MEDIA_PLAY = 126,
    DEVICE_CONTROL_KEYCODE_MEDIA_PAUSE = 127,
    DEVICE_CONTROL_KEYCODE_MEDIA_CLOSE = 128,
    DEVICE_CONTROL_KEYCODE_MEDIA_EJECT = 129,
    DEVICE_CONTROL_KEYCODE_MEDIA_RECORD = 130,
    DEVICE_CONTROL_KEYCODE_F1 = 131,
    DEVICE_CONTROL_KEYCODE_F2 = 132,
    DEVICE_CONTROL_KEYCODE_F3 = 133,
    DEVICE_CONTROL_KEYCODE_F4 = 134,
    DEVICE_CONTROL_KEYCODE_F5 = 135,
    DEVICE_CONTROL_KEYCODE_F6 = 136,
    DEVICE_CONTROL_KEYCODE_F7 = 137,
    DEVICE_CONTROL_KEYCODE_F8 = 138,
    DEVICE_CONTROL_KEYCODE_F9 = 139,
    DEVICE_CONTROL_KEYCODE_F10 = 140,
    DEVICE_CONTROL_KEYCODE_F11 = 141,
    DEVICE_CONTROL_KEYCODE_F12 = 142,
    DEVICE_CONTROL_KEYCODE_NUM_LOCK = 143,
    DEVICE_CONTROL_KEYCODE_NUMPAD_0 = 144,
    DEVICE_CONTROL_KEYCODE_NUMPAD_1 = 145,
    DEVICE_CONTROL_KEYCODE_NUMPAD_2 = 146,
    DEVICE_CONTROL_KEYCODE_NUMPAD_3 = 147,
    DEVICE_CONTROL_KEYCODE_NUMPAD_4 = 148,
    DEVICE_CONTROL_KEYCODE_NUMPAD_5 = 149,
    DEVICE_CONTROL_KEYCODE_NUMPAD_6 = 150,
    DEVICE_CONTROL_KEYCODE_NUMPAD_7 = 151,
    DEVICE_CONTROL_KEYCODE_NUMPAD_8 = 152,
    DEVICE_CONTROL_KEYCODE_NUMPAD_9 = 153,
    DEVICE_CONTROL_KEYCODE_NUMPAD_DIVIDE = 154,
    DEVICE_CONTROL_KEYCODE_NUMPAD_MULTIPLY = 155,
    DEVICE_CONTROL_KEYCODE_NUMPAD_SUBTRACT = 156,
    DEVICE_CONTROL_KEYCODE_NUMPAD_ADD = 157,
    DEVICE_CONTROL_KEYCODE_NUMPAD_DOT = 158,
    DEVICE_CONTROL_KEYCODE_NUMPAD_COMMA = 159,
    DEVICE_CONTROL_KEYCODE_NUMPAD_ENTER = 160,
    DEVICE_CONTROL_KEYCODE_NUMPAD_EQUALS = 161,
    DEVICE_CONTROL_KEYCODE_NUMPAD_LEFT_PAREN = 162,
    DEVICE_CONTROL_KEYCODE_NUMPAD_RIGHT_PAREN = 163,
    DEVICE_CONTROL_KEYCODE_VOLUME_MUTE = 164,
    DEVICE_CONTROL_KEYCODE_INFO = 165,
    DEVICE_CONTROL_KEYCODE_CHANNEL_UP = 166,
    DEVICE_CONTROL_KEYCODE_CHANNEL_DOWN = 167,
    DEVICE_CONTROL_KEYCODE_ZOOM_IN = 168,
    DEVICE_CONTROL_KEYCODE_ZOOM_OUT = 169,
    DEVICE_CONTROL_KEYCODE_TV = 170,
    DEVICE_CONTROL_KEYCODE_WINDOW = 171,
    DEVICE_CONTROL_KEYCODE_GUIDE = 172,
    DEVICE_CONTROL_KEYCODE_DVR = 173,
    DEVICE_CONTROL_KEYCODE_BOOKMARK = 174,
    DEVICE_CONTROL_KEYCODE_CAPTIONS = 175,
    DEVICE_CONTROL_KEYCODE_SETTINGS = 176,
    DEVICE_CONTROL_KEYCODE_TV_POWER = 177,
    DEVICE_CONTROL_KEYCODE_TV_INPUT = 178,
    DEVICE_CONTROL_KEYCODE_STB_POWER = 179,
    DEVICE_CONTROL_KEYCODE_STB_INPUT = 180,
    DEVICE_CONTROL_KEYCODE_AVR_POWER = 181,
    DEVICE_CONTROL_KEYCODE_AVR_INPUT = 182,
    DEVICE_CONTROL_KEYCODE_PROG_RED = 183,
    DEVICE_CONTROL_KEYCODE_PROG_GREEN = 184,
    DEVICE_CONTROL_KEYCODE_PROG_YELLOW = 185,
    DEVICE_CONTROL_KEYCODE_PROG_BLUE = 186,
    DEVICE_CONTROL_KEYCODE_APP_SWITCH = 187,
    DEVICE_CONTROL_KEYCODE_BUTTON_1 = 188,
    DEVICE_CONTROL_KEYCODE_BUTTON_2 = 189,
    DEVICE_CONTROL_KEYCODE_BUTTON_3 = 190,
    DEVICE_CONTROL_KEYCODE_BUTTON_4 = 191,
    DEVICE_CONTROL_KEYCODE_BUTTON_5 = 192,
    DEVICE_CONTROL_KEYCODE_BUTTON_6 = 193,
    DEVICE_CONTROL_KEYCODE_BUTTON_7 = 194,
    DEVICE_CONTROL_KEYCODE_BUTTON_8 = 195,
    DEVICE_CONTROL_KEYCODE_BUTTON_9 = 196,
    DEVICE_CONTROL_KEYCODE_BUTTON_10 = 197,
    DEVICE_CONTROL_KEYCODE_BUTTON_11 = 198,
    DEVICE_CONTROL_KEYCODE_BUTTON_12 = 199,
    DEVICE_CONTROL_KEYCODE_BUTTON_13 = 200,
    DEVICE_CONTROL_KEYCODE_BUTTON_14 = 201,
    DEVICE_CONTROL_KEYCODE_BUTTON_15 = 202,
    DEVICE_CONTROL_KEYCODE_BUTTON_16 = 203,
    DEVICE_CONTROL_KEYCODE_LANGUAGE_SWITCH = 204,
    DEVICE_CONTROL_KEYCODE_MANNER_MODE = 205,
    DEVICE_CONTROL_KEYCODE_3D_MODE = 206,
    DEVICE_CONTROL_KEYCODE_CONTACTS = 207,
    DEVICE_CONTROL_KEYCODE_CALENDAR = 208,
    DEVICE_CONTROL_KEYCODE_MUSIC = 209,
    DEVICE_CONTROL_KEYCODE_CALCULATOR = 210,
    DEVICE_CONTROL_KEYCODE_ZENKAKU_HANKAKU = 211,
    DEVICE_CONTROL_KEYCODE_EISU = 212,
    DEVICE_CONTROL_KEYCODE_MUHENKAN = 213,
    DEVICE_CONTROL_KEYCODE_HENKAN = 214,
    DEVICE_CONTROL_KEYCODE_KATAKANA_HIRAGANA = 215,
    DEVICE_CONTROL_KEYCODE_YEN = 216,
    DEVICE_CONTROL_KEYCODE_RO = 217,
    DEVICE_CONTROL_KEYCODE_KANA = 218,
    DEVICE_CONTROL_KEYCODE_ASSIST = 219,
    DEVICE_CONTROL_KEYCODE_BRIGHTNESS_DOWN = 220,
    DEVICE_CONTROL_KEYCODE_BRIGHTNESS_UP = 221,
    DEVICE_CONTROL_KEYCODE_MEDIA_AUDIO_TRACK = 222,
    DEVICE_CONTROL_KEYCODE_SLEEP = 223,
    DEVICE_CONTROL_KEYCODE_WAKEUP = 224,
    DEVICE_CONTROL_KEYCODE_PAIRING = 225,
    DEVICE_CONTROL_KEYCODE_MEDIA_TOP_MENU = 226,
    DEVICE_CONTROL_KEYCODE_11 = 227,
    DEVICE_CONTROL_KEYCODE_12 = 228,
    DEVICE_CONTROL_KEYCODE_LAST_CHANNEL = 229,
    DEVICE_CONTROL_KEYCODE_TV_DATA_SERVICE = 230,
    DEVICE_CONTROL_KEYCODE_VOICE_ASSIST = 231,
    DEVICE_CONTROL_KEYCODE_TV_RADIO_SERVICE = 232,
    DEVICE_CONTROL_KEYCODE_TV_TELETEXT = 233,
    DEVICE_CONTROL_KEYCODE_TV_NUMBER_ENTRY = 234,
    DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_ANALOG = 235,
    DEVICE_CONTROL_KEYCODE_TV_TERRESTRIAL_DIGITAL = 236,
    DEVICE_CONTROL_KEYCODE_TV_SATELLITE = 237,
    DEVICE_CONTROL_KEYCODE_TV_SATELLITE_BS = 238,
    DEVICE_CONTROL_KEYCODE_TV_SATELLITE_CS = 239,
    DEVICE_CONTROL_KEYCODE_TV_SATELLITE_SERVICE = 240,
    DEVICE_CONTROL_KEYCODE_TV_NETWORK = 241,
    DEVICE_CONTROL_KEYCODE_TV_ANTENNA_CABLE = 242,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_1 = 243,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_2 = 244,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_3 = 245,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_HDMI_4 = 246,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_1 = 247,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPOSITE_2 = 248,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_1 = 249,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_COMPONENT_2 = 250,
    DEVICE_CONTROL_KEYCODE_TV_INPUT_VGA_1 = 251,
    DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION = 252,
    DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP = 253,
    DEVICE_CONTROL_KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN = 254,
    DEVICE_CONTROL_KEYCODE_TV_ZOOM_MODE = 255,
    DEVICE_CONTROL_KEYCODE_TV_CONTENTS_MENU = 256,
    DEVICE_CONTROL_KEYCODE_TV_MEDIA_CONTEXT_MENU = 257,
    DEVICE_CONTROL_KEYCODE_TV_TIMER_PROGRAMMING = 258,
    DEVICE_CONTROL_KEYCODE_HELP = 259,
    DEVICE_CONTROL_KEYCODE_NAVIGATE_PREVIOUS = 260,
    DEVICE_CONTROL_KEYCODE_NAVIGATE_NEXT = 261,
    DEVICE_CONTROL_KEYCODE_NAVIGATE_IN = 262,
    DEVICE_CONTROL_KEYCODE_NAVIGATE_OUT = 263,
    DEVICE_CONTROL_KEYCODE_STEM_PRIMARY = 264,
    DEVICE_CONTROL_KEYCODE_STEM_1 = 265,
    DEVICE_CONTROL_KEYCODE_STEM_2 = 266,
    DEVICE_CONTROL_KEYCODE_STEM_3 = 267,
    DEVICE_CONTROL_KEYCODE_DPAD_UP_LEFT = 268,
    DEVICE_CONTROL_KEYCODE_DPAD_DOWN_LEFT = 269,
    DEVICE_CONTROL_KEYCODE_DPAD_UP_RIGHT = 270,
    DEVICE_CONTROL_KEYCODE_DPAD_DOWN_RIGHT = 271,
    DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_FORWARD = 272,
    DEVICE_CONTROL_KEYCODE_MEDIA_SKIP_BACKWARD = 273,
    DEVICE_CONTROL_KEYCODE_MEDIA_STEP_FORWARD = 274,
    DEVICE_CONTROL_KEYCODE_MEDIA_STEP_BACKWARD = 275,
    DEVICE_CONTROL_KEYCODE_SOFT_SLEEP = 276,
    DEVICE_CONTROL_KEYCODE_CUT = 277,
    DEVICE_CONTROL_KEYCODE_COPY = 278,
    DEVICE_CONTROL_KEYCODE_PASTE = 279,
    DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_UP = 280,
    DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_DOWN = 281,
    DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_LEFT = 282,
    DEVICE_CONTROL_KEYCODE_SYSTEM_NAVIGATION_RIGHT = 283,
    DEVICE_CONTROL_KEYCODE_ALL_APPS = 284,
    DEVICE_CONTROL_KEYCODE_REFRESH = 285,
    DEVICE_CONTROL_KEYCODE_THUMBS_UP = 286,
    DEVICE_CONTROL_KEYCODE_THUMBS_DOWN = 287,
    DEVICE_CONTROL_KEYCODE_PROFILE_SWITCH = 288,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_1 = 289,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_2 = 290,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_3 = 291,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_4 = 292,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_5 = 293,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_6 = 294,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_7 = 295,
    DEVICE_CONTROL_KEYCODE_VIDEO_APP_8 = 296,
    DEVICE_CONTROL_KEYCODE_FEATURED_APP_1 = 297,
    DEVICE_CONTROL_KEYCODE_FEATURED_APP_2 = 298,
    DEVICE_CONTROL_KEYCODE_FEATURED_APP_3 = 299,
    DEVICE_CONTROL_KEYCODE_FEATURED_APP_4 = 300,
    DEVICE_CONTROL_KEYCODE_DEMO_APP_1 = 301,
    DEVICE_CONTROL_KEYCODE_DEMO_APP_2 = 302,
    DEVICE_CONTROL_KEYCODE_DEMO_APP_3 = 303,
    DEVICE_CONTROL_KEYCODE_DEMO_APP_4 = 304,
    UNRECOGNIZED = -1
}
export declare function deviceControlKeycodeFromJSON(object: any): DeviceControlKeycode;
export declare function deviceControlKeycodeToJSON(object: DeviceControlKeycode): string;
export declare enum DeviceControlButton {
    /**
     * DEVICE_CONTROL_BUTTON_UNSPECIFIED - https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/MotionEvent.java
     * https://developer.android.com/reference/android/view/MotionEvent
     */
    DEVICE_CONTROL_BUTTON_UNSPECIFIED = 0,
    /** DEVICE_CONTROL_BUTTON_PRIMARY - left mouse */
    DEVICE_CONTROL_BUTTON_PRIMARY = 1,
    /** DEVICE_CONTROL_BUTTON_SECONDARY - right mouse */
    DEVICE_CONTROL_BUTTON_SECONDARY = 2,
    /** DEVICE_CONTROL_BUTTON_TERTIARY - middle mouse */
    DEVICE_CONTROL_BUTTON_TERTIARY = 4,
    DEVICE_CONTROL_BUTTON_BACK = 8,
    DEVICE_CONTROL_BUTTON_FORWARD = 16,
    DEVICE_CONTROL_BUTTON_STYLUS_PRIMARY = 32,
    DEVICE_CONTROL_BUTTON_STYLUS_SECONDARY = 64,
    UNRECOGNIZED = -1
}
export declare function deviceControlButtonFromJSON(object: any): DeviceControlButton;
export declare function deviceControlButtonToJSON(object: DeviceControlButton): string;
export declare enum DeviceControlCopyKey {
    DEVICE_CONTROL_COPY_KEY_UNSPECIFIED = 0,
    DEVICE_CONTROL_COPY_KEY_COPY = 1,
    DEVICE_CONTROL_COPY_KEY_CUT = 2,
    UNRECOGNIZED = -1
}
export declare function deviceControlCopyKeyFromJSON(object: any): DeviceControlCopyKey;
export declare function deviceControlCopyKeyToJSON(object: DeviceControlCopyKey): string;
export declare enum DeviceControlSequece {
    DEVICE_CONTROL_SEQUECE_UNSPECIFIED = 0,
    UNRECOGNIZED = -1
}
export declare function deviceControlSequeceFromJSON(object: any): DeviceControlSequece;
export declare function deviceControlSequeceToJSON(object: DeviceControlSequece): string;
export interface DevicePosition {
    x: number;
    y: number;
    screenWidth: number;
    screenHeight: number;
}
/**
 * reference
 * https://github.com/Genymobile/scrcpy/blob/master/server/src/main/java/com/genymobile/scrcpy/ControlMessage.java
 */
export interface DeviceControl {
    type: DeviceControlType;
    text: string;
    metaState: DeviceControlMetaState;
    action: DeviceControlAction;
    keycode: DeviceControlKeycode;
    buttons: number;
    pointerId: number;
    pressure: number;
    position: DevicePosition | undefined;
    hScroll: number;
    vScroll: number;
    copyKey: DeviceControlCopyKey;
    paste: boolean;
    repeat: number;
    sequence: number;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
     * required for ios key input.
     */
    key: string;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp
     * required for ios touch input move time calculation.
     */
    timeStamp: number;
}
export declare const DevicePosition: {
    encode(message: DevicePosition, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DevicePosition;
    fromJSON(object: any): DevicePosition;
    toJSON(message: DevicePosition): unknown;
    fromPartial<I extends {
        x?: number | undefined;
        y?: number | undefined;
        screenWidth?: number | undefined;
        screenHeight?: number | undefined;
    } & {
        x?: number | undefined;
        y?: number | undefined;
        screenWidth?: number | undefined;
        screenHeight?: number | undefined;
    } & { [K in Exclude<keyof I, keyof DevicePosition>]: never; }>(object: I): DevicePosition;
};
export declare const DeviceControl: {
    encode(message: DeviceControl, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeviceControl;
    fromJSON(object: any): DeviceControl;
    toJSON(message: DeviceControl): unknown;
    fromPartial<I extends {
        type?: DeviceControlType | undefined;
        text?: string | undefined;
        metaState?: DeviceControlMetaState | undefined;
        action?: DeviceControlAction | undefined;
        keycode?: DeviceControlKeycode | undefined;
        buttons?: number | undefined;
        pointerId?: number | undefined;
        pressure?: number | undefined;
        position?: {
            x?: number | undefined;
            y?: number | undefined;
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } | undefined;
        hScroll?: number | undefined;
        vScroll?: number | undefined;
        copyKey?: DeviceControlCopyKey | undefined;
        paste?: boolean | undefined;
        repeat?: number | undefined;
        sequence?: number | undefined;
        key?: string | undefined;
        timeStamp?: number | undefined;
    } & {
        type?: DeviceControlType | undefined;
        text?: string | undefined;
        metaState?: DeviceControlMetaState | undefined;
        action?: DeviceControlAction | undefined;
        keycode?: DeviceControlKeycode | undefined;
        buttons?: number | undefined;
        pointerId?: number | undefined;
        pressure?: number | undefined;
        position?: ({
            x?: number | undefined;
            y?: number | undefined;
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } & {
            x?: number | undefined;
            y?: number | undefined;
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } & { [K in Exclude<keyof I["position"], keyof DevicePosition>]: never; }) | undefined;
        hScroll?: number | undefined;
        vScroll?: number | undefined;
        copyKey?: DeviceControlCopyKey | undefined;
        paste?: boolean | undefined;
        repeat?: number | undefined;
        sequence?: number | undefined;
        key?: string | undefined;
        timeStamp?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof DeviceControl>]: never; }>(object: I): DeviceControl;
};
