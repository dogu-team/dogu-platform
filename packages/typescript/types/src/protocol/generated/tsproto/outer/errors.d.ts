import _m0 from 'protobufjs/minimal';
/**
 * @note To maintain the uniqueness of error codes, duplicate codes are not
 * allowed.
 */
export declare enum Code {
    /**
     * CODE_SUCCESS_COMMON_BEGIN_UNSPECIFIED - @note Common errors.
     * 0 ~ 999 is used for common errors.
     * 0 means success code.
     */
    CODE_SUCCESS_COMMON_BEGIN_UNSPECIFIED = 0,
    /** CODE_UNEXPECTED_ERROR - @note Unexpected error. */
    CODE_UNEXPECTED_ERROR = 1,
    /** CODE_NUMBER_UNDER_RANGE - @note Number errors. */
    CODE_NUMBER_UNDER_RANGE = 2,
    CODE_NUMBER_OVER_RANGE = 3,
    CODE_NUMBER_ZERO = 4,
    CODE_NUMBER_NULL = 5,
    /** CODE_STRING_UNDER_RANGE - @note String errors. */
    CODE_STRING_UNDER_RANGE = 10,
    CODE_STRING_OVER_RANGE = 11,
    CODE_STRING_EMPTY = 12,
    CODE_STRING_NULL = 13,
    CODE_STRING_PARSE_FAILED = 14,
    CODE_STRING_INVALID_CHARACTER = 15,
    CODE_STRING_ENCODING_FAILED = 16,
    CODE_STRING_DECODING_FAILED = 17,
    CODE_STRING_CONVERSION_FAILED = 18,
    CODE_STRING_INVALID_SYNTAX = 19,
    /** CODE_BINARY_UNDER_RANGE - @note Binary errors. */
    CODE_BINARY_UNDER_RANGE = 20,
    CODE_BINARY_OVER_RANGE = 21,
    CODE_BINARY_EMPTY = 22,
    CODE_BINARY_NULL = 23,
    CODE_BINARY_ENCODING_FAILED = 24,
    CODE_BINARY_DECODING_FAILED = 25,
    CODE_BINARY_CONVERSION_FAILED = 26,
    CODE_BINARY_VALIDATION_FAILED = 27,
    /** CODE_DATE_INVALID_YEAR - @note Date errors. */
    CODE_DATE_INVALID_YEAR = 30,
    CODE_DATE_INVALID_MONTH = 31,
    CODE_DATE_INVALID_DAY = 32,
    CODE_DATE_INVALID_HOUR = 33,
    CODE_DATE_INVALID_MINITE = 34,
    CODE_DATE_INVALID_SECOND = 35,
    /** CODE_TIME_INVALID_TIMEZONE - @note Time errors. */
    CODE_TIME_INVALID_TIMEZONE = 40,
    /** CODE_ARRAY_UNDER_RANGE - @note Array errors. */
    CODE_ARRAY_UNDER_RANGE = 50,
    CODE_ARRAY_OVER_RANGE = 51,
    CODE_ARRAY_EMPTY = 52,
    CODE_ARRAY_KEY_NOTFOUND = 53,
    /**
     * CODE_MAP_KEY_NOTFOUND - @note Map errors.
     * map means key-value storage like dictionary.
     */
    CODE_MAP_KEY_NOTFOUND = 60,
    /** CODE_CONCURRENCY_LOCK_FAILED - @note Concurrency errors. */
    CODE_CONCURRENCY_LOCK_FAILED = 70,
    CODE_CONCURRENCY_DEADLOCK = 71,
    CODE_CONCURRENCY_RACE = 72,
    /** CODE_FILESYSTEM_FILE_NOTFOUND - @note Filesystem errors. */
    CODE_FILESYSTEM_FILE_NOTFOUND = 90,
    CODE_FILESYSTEM_DIRECTORY_NOTFOUND = 91,
    CODE_FILESYSTEM_FILE_OPEN_FAILED = 92,
    CODE_FILESYSTEM_FILE_CLOSE_FAILED = 93,
    CODE_FILESYSTEM_FILE_READ_FAILED = 94,
    CODE_FILESYSTEM_FILE_WRITE_FAILED = 95,
    CODE_FILESYSTEM_DISK_FULL = 96,
    /** CODE_NETWORK_CONNECTION_FAILED - @note Network errors. */
    CODE_NETWORK_CONNECTION_FAILED = 100,
    CODE_NETWORK_CONNECTION_CLOSED = 101,
    CODE_NETWORK_CONNECTION_TIMEOUT = 102,
    CODE_NETWORK_CONNECTION_REFUSED = 103,
    CODE_NETWORK_CONNECTION_ABORTED = 104,
    CODE_NETWORK_CONNECTION_ALREADY_CONNECTED = 105,
    CODE_NETWORK_CONNECTION_INVALID_URI = 106,
    /** CODE_PROCESS_FORK_FAILED - @note Process errors. */
    CODE_PROCESS_FORK_FAILED = 110,
    CODE_PROCESS_EXEC_FAILED = 111,
    CODE_PROCESS_WAIT_FAILED = 112,
    CODE_PROCESS_KILL_FAILED = 113,
    CODE_PROCESS_SIGNAL_FAILED = 114,
    CODE_PROCESS_SIGNAL_NOT_SUPPORTED = 115,
    /** CODE_MEMORY_ALLOCATION_FAILED - @note Memory errors. */
    CODE_MEMORY_ALLOCATION_FAILED = 120,
    CODE_MEMORY_REALLOCATION_FAILED = 121,
    CODE_MEMORY_FREE_FAILED = 122,
    CODE_MEMORY_OUT_OF_MEMORY = 123,
    /** CODE_SECURITY_UNAUTHENTICATED - @note Security errors */
    CODE_SECURITY_UNAUTHENTICATED = 130,
    CODE_SECURITY_UNAUTHORISED = 131,
    CODE_SECURITY_PERMISSION_DENIED = 132,
    CODE_SECURITY_INVALID_TOKEN = 133,
    /** CODE_INPUT_NOTREADY - @note Input errors. */
    CODE_INPUT_NOTREADY = 140,
    CODE_INPUT_DISCARDED = 141,
    CODE_INPUT_UNKNOWN = 142,
    /** CODE_SCREENRECORD_NOTREADY - @note Screen record errors. */
    CODE_SCREENRECORD_NOTREADY = 150,
    CODE_SCREENRECORD_ALREADY_RECORDING = 151,
    CODE_SCREENRECORD_NOTSTARTED = 152,
    CODE_SCREENRECORD_MULTIPLE_RECORDING = 153,
    CODE_SCREENRECORD_NOTFOUND = 154,
    CODE_SCREENRECORD_NOTSUPPORTED = 155,
    /** CODE_WEBRTC_PEERCONNECTION_FAILED - @note WebRTC errors. */
    CODE_WEBRTC_PEERCONNECTION_FAILED = 160,
    CODE_WEBRTC_CODEC_NOTSUPPORTED = 161,
    /** CODE_DEVICE_NOTFOUND - @note Device errors. */
    CODE_DEVICE_NOTFOUND = 200,
    /** CODE_COMMON_END - @note Common errors end. */
    CODE_COMMON_END = 999,
    /**
     * CODE_DOST_SUCCESS_BEGIN - @note Dost errors.
     * 1000 ~ 1999 is used for dost app.
     * 1000 ~ 1255 are used for exit codes 0 ~ 255.
     * 1000 means success code.
     */
    CODE_DOST_SUCCESS_BEGIN = 1000,
    /** CODE_DOST_END - @note Dost errors end. */
    CODE_DOST_END = 1999,
    /**
     * CODE_HOST_AGENT_SUCCESS_BEGIN - @note Host Agent errors.
     * 2000 ~ 2999 is used for host agent process.
     * 2000 ~ 2255 are used for exit codes 0 ~ 255.
     * 2000 means success code.
     */
    CODE_HOST_AGENT_SUCCESS_BEGIN = 2000,
    CODE_HOST_AGENT_UNEXPECTED_ERROR = 2001,
    CODE_HOST_AGENT_INVALID_ENV = 2002,
    CODE_HOST_AGENT_PORT_IN_USE = 2003,
    /** CODE_HOST_AGENT_EXIT_CODE_END - @note reserved for host agent exit code 255. */
    CODE_HOST_AGENT_EXIT_CODE_END = 2255,
    /**
     * CODE_HOST_AGENT_SIGHUP - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGHUP = 2301,
    /**
     * CODE_HOST_AGENT_SIGINT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGINT = 2302,
    /**
     * CODE_HOST_AGENT_SIGQUIT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGQUIT = 2303,
    /**
     * CODE_HOST_AGENT_SIGILL - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGILL = 2304,
    /**
     * CODE_HOST_AGENT_SIGTRAP - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGTRAP = 2305,
    /**
     * CODE_HOST_AGENT_SIGABRT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGABRT = 2306,
    /**
     * CODE_HOST_AGENT_SIGFPE - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGFPE = 2308,
    /**
     * CODE_HOST_AGENT_SIGKILL - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGKILL = 2309,
    /**
     * CODE_HOST_AGENT_SIGSEGV - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGSEGV = 2311,
    /**
     * CODE_HOST_AGENT_SIGPIPE - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGPIPE = 2313,
    /**
     * CODE_HOST_AGENT_SIGALRM - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGALRM = 2314,
    /**
     * CODE_HOST_AGENT_SIGTERM - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_HOST_AGENT_SIGTERM = 2315,
    CODE_HOST_AGENT_DEVICE_REQUEST_FAILED = 2400,
    CODE_HOST_AGENT_INVALID_TOKEN = 2401,
    CODE_HOST_AGENT_CONNECTION_REFUSED = 2402,
    CODE_HOST_AGENT_NOT_RUNNING = 2403,
    CODE_HOST_AGENT_REQUEST_FAILED = 2404,
    /** CODE_HOST_AGENT_END - @note Host Agent errors end. */
    CODE_HOST_AGENT_END = 2999,
    /**
     * CODE_DEVICE_SERVER_SUCCESS_BEGIN - @note Device server errors.
     * 3000 ~ 3999 is used for device server process.
     * 3000 ~ 3255 are used for exit codes 0 ~ 255.
     * 3000 means success code.
     */
    CODE_DEVICE_SERVER_SUCCESS_BEGIN = 3000,
    CODE_DEVICE_SERVER_UNEXPECTED_ERROR = 3001,
    CODE_DEVICE_SERVER_INVALID_ENV = 3002,
    /**
     * CODE_DEVICE_SERVER_PORT_IN_USE - @note Device server port in use.
     * check if the port is in use by other process.
     */
    CODE_DEVICE_SERVER_PORT_IN_USE = 3003,
    /** CODE_DEVICE_SERVER_EXIT_CODE_END - @note reserved for device server exit code 255. */
    CODE_DEVICE_SERVER_EXIT_CODE_END = 3255,
    /**
     * CODE_DEVICE_SERVER_SIGHUP - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGHUP = 3301,
    /**
     * CODE_DEVICE_SERVER_SIGINT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGINT = 3302,
    /**
     * CODE_DEVICE_SERVER_SIGQUIT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGQUIT = 3303,
    /**
     * CODE_DEVICE_SERVER_SIGILL - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGILL = 3304,
    /**
     * CODE_DEVICE_SERVER_SIGTRAP - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGTRAP = 3305,
    /**
     * CODE_DEVICE_SERVER_SIGABRT - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGABRT = 3306,
    /**
     * CODE_DEVICE_SERVER_SIGFPE - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGFPE = 3308,
    /**
     * CODE_DEVICE_SERVER_SIGKILL - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGKILL = 3309,
    /**
     * CODE_DEVICE_SERVER_SIGSEGV - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGSEGV = 3311,
    /**
     * CODE_DEVICE_SERVER_SIGPIPE - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGPIPE = 3313,
    /**
     * CODE_DEVICE_SERVER_SIGALRM - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGALRM = 3314,
    /**
     * CODE_DEVICE_SERVER_SIGTERM - @link https://en.wikipedia.org/wiki/Signal_(IPC)
     * @note reserved for signal to code conversion.
     */
    CODE_DEVICE_SERVER_SIGTERM = 3315,
    CODE_DEVICE_SERVER_DEVICE_NOT_FOUND = 3400,
    CODE_DEVICE_SERVER_APPIUM_CONTEXT_NOT_FOUND = 3401,
    CODE_DEVICE_SERVER_GAMIUM_CONTEXT_NOT_FOUND = 3402,
    CODE_DEVICE_SERVER_APPIUM_CONTEXT_INFO_NOT_FOUND = 3403,
    CODE_DEVICE_SERVER_APPIUM_CAPABILITIES_NOT_FOUND = 3404,
    /** CODE_DEVICE_SERVER_END - @note Device server errors end. */
    CODE_DEVICE_SERVER_END = 3999,
    /**
     * CODE_DEVICE_CONTROLLER_BEGIN - @note Device Controller errors.
     * 4000 ~ 4999 is used for device controller.
     * 4000 means success code.
     */
    CODE_DEVICE_CONTROLLER_BEGIN = 4000,
    CODE_DEVICE_CONTROLLER_INPUT_NOTSUPPORTED = 4001,
    CODE_DEVICE_CONTROLLER_INPUT_PERMISSION_DENIED = 4002,
    CODE_DEVICE_CONTROLLER_INPUT_UNKNOWN = 4003,
    /** CODE_DEVICE_CONTROLLER_END - @note Device Controller errors end. */
    CODE_DEVICE_CONTROLLER_END = 4999,
    /**
     * CODE_ANDROID_DEVICE_AGENT_BEGIN - @note Android Device Agent errors.
     * 5000 ~ 5999 is used for android device agent.
     * 5000 means success code.
     */
    CODE_ANDROID_DEVICE_AGENT_BEGIN = 5000,
    CODE_ANDROID_DEVICE_AGENT_INPUT_UNKNOWN = 5001,
    CODE_ANDROID_DEVICE_AGENT_CLIPBOARD_NOTAVAILABLE = 5002,
    /** CODE_ANDROID_DEVICE_AGENT_END - @note Android Device Agent errors end. */
    CODE_ANDROID_DEVICE_AGENT_END = 5999,
    UNRECOGNIZED = -1
}
export declare function codeFromJSON(object: any): Code;
export declare function codeToJSON(object: Code): string;
export interface ErrorResult {
    code: Code;
    message: string;
    details?: {
        [key: string]: any;
    } | undefined;
}
export declare const ErrorResult: {
    encode(message: ErrorResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ErrorResult;
    fromJSON(object: any): ErrorResult;
    toJSON(message: ErrorResult): unknown;
    fromPartial<I extends {
        code?: Code | undefined;
        message?: string | undefined;
        details?: {
            [x: string]: any;
        } | undefined;
    } & {
        code?: Code | undefined;
        message?: string | undefined;
        details?: ({
            [x: string]: any;
        } & {
            [x: string]: any;
        } & { [K in Exclude<keyof I["details"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ErrorResult>]: never; }>(object: I): ErrorResult;
};
