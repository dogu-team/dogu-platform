// DO NOT EDIT.
// swift-format-ignore-file
//
// Generated by the Swift generator plugin for the protocol buffer compiler.
// Source: outer/errors.proto
//
// For information on using the generated types, please see the documentation:
//   https://github.com/apple/swift-protobuf/

import Foundation
import SwiftProtobuf

// If the compiler emits an error on this type, it is because this file
// was generated by a version of the `protoc` Swift plug-in that is
// incompatible with the version of SwiftProtobuf to which you are linking.
// Please ensure that you are building against the same version of the API
// that was used to generate this file.
fileprivate struct _GeneratedWithProtocGenSwiftVersion: SwiftProtobuf.ProtobufAPIVersionCheck {
  struct _2: SwiftProtobuf.ProtobufAPIVersion_2 {}
  typealias Version = _2
}

///*
/// @note To maintain the uniqueness of error codes, duplicate codes are not
/// allowed.
public enum Outer_Code: SwiftProtobuf.Enum {
  public typealias RawValue = Int

  ///*
  /// @note Common errors.
  /// 0 ~ 999 is used for common errors.
  /// 0 means success code.
  case successCommonBeginUnspecified // = 0

  ///*
  /// @note Unexpected error.
  case unexpectedError // = 1

  ///*
  /// @note Number errors.
  case numberUnderRange // = 2
  case numberOverRange // = 3
  case numberZero // = 4
  case numberNull // = 5

  ///*
  /// @note String errors.
  case stringUnderRange // = 10
  case stringOverRange // = 11
  case stringEmpty // = 12
  case stringNull // = 13
  case stringParseFailed // = 14
  case stringInvalidCharacter // = 15
  case stringEncodingFailed // = 16
  case stringDecodingFailed // = 17
  case stringConversionFailed // = 18
  case stringInvalidSyntax // = 19

  ///*
  /// @note Binary errors.
  case binaryUnderRange // = 20
  case binaryOverRange // = 21
  case binaryEmpty // = 22
  case binaryNull // = 23
  case binaryEncodingFailed // = 24
  case binaryDecodingFailed // = 25
  case binaryConversionFailed // = 26
  case binaryValidationFailed // = 27

  ///*
  /// @note Date errors.
  case dateInvalidYear // = 30
  case dateInvalidMonth // = 31
  case dateInvalidDay // = 32
  case dateInvalidHour // = 33
  case dateInvalidMinite // = 34
  case dateInvalidSecond // = 35

  ///*
  /// @note Time errors.
  case timeInvalidTimezone // = 40

  ///*
  /// @note Array errors.
  case arrayUnderRange // = 50
  case arrayOverRange // = 51
  case arrayEmpty // = 52
  case arrayKeyNotfound // = 53

  ///*
  /// @note Map errors.
  /// map means key-value storage like dictionary.
  case mapKeyNotfound // = 60

  ///*
  /// @note Concurrency errors.
  case concurrencyLockFailed // = 70
  case concurrencyDeadlock // = 71
  case concurrencyRace // = 72

  ///*
  /// @note Filesystem errors.
  case filesystemFileNotfound // = 90
  case filesystemDirectoryNotfound // = 91
  case filesystemFileOpenFailed // = 92
  case filesystemFileCloseFailed // = 93
  case filesystemFileReadFailed // = 94
  case filesystemFileWriteFailed // = 95
  case filesystemDiskFull // = 96

  ///*
  /// @note Network errors.
  case networkConnectionFailed // = 100
  case networkConnectionClosed // = 101
  case networkConnectionTimeout // = 102
  case networkConnectionRefused // = 103
  case networkConnectionAborted // = 104
  case networkConnectionAlreadyConnected // = 105
  case networkConnectionInvalidUri // = 106

  ///*
  /// @note Process errors.
  case processForkFailed // = 110
  case processExecFailed // = 111
  case processWaitFailed // = 112
  case processKillFailed // = 113
  case processSignalFailed // = 114
  case processSignalNotSupported // = 115

  ///*
  /// @note Memory errors.
  case memoryAllocationFailed // = 120
  case memoryReallocationFailed // = 121
  case memoryFreeFailed // = 122
  case memoryOutOfMemory // = 123

  ///*
  /// @note Security errors
  case securityUnauthenticated // = 130
  case securityUnauthorised // = 131
  case securityPermissionDenied // = 132
  case securityInvalidToken // = 133

  ///*
  /// @note Input errors.
  case inputNotready // = 140
  case inputDiscarded // = 141
  case inputUnknown // = 142

  ///*
  /// @note Screen record errors.
  case screenrecordNotready // = 150
  case screenrecordAlreadyRecording // = 151
  case screenrecordNotstarted // = 152
  case screenrecordMultipleRecording // = 153
  case screenrecordNotfound // = 154
  case screenrecordNotsupported // = 155

  ///*
  /// @note WebRTC errors.
  case webrtcPeerconnectionFailed // = 160
  case webrtcCodecNotsupported // = 161

  ///*
  /// @note Device errors.
  case deviceNotfound // = 200

  ///*
  /// @note Common errors end.
  case commonEnd // = 999

  ///*
  /// @note Dost errors.
  /// 1000 ~ 1999 is used for dost app.
  /// 1000 ~ 1255 are used for exit codes 0 ~ 255.
  /// 1000 means success code.
  case dostSuccessBegin // = 1000

  ///*
  /// @note Dost errors end.
  case dostEnd // = 1999

  ///
  /// @note Host Agent errors.
  /// 2000 ~ 2999 is used for host agent process.
  /// 2000 ~ 2255 are used for exit codes 0 ~ 255.
  /// 2000 means success code.
  case hostAgentSuccessBegin // = 2000
  case hostAgentUnexpectedError // = 2001
  case hostAgentInvalidEnv // = 2002
  case hostAgentPortInUse // = 2003

  ///
  /// @note reserved for host agent exit code 255.
  case hostAgentExitCodeEnd // = 2255

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSighup // = 2301

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigint // = 2302

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigquit // = 2303

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigill // = 2304

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigtrap // = 2305

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigabrt // = 2306

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigfpe // = 2308

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigkill // = 2309

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigsegv // = 2311

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigpipe // = 2313

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigalrm // = 2314

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case hostAgentSigterm // = 2315
  case hostAgentDeviceRequestFailed // = 2400
  case hostAgentInvalidToken // = 2401
  case hostAgentConnectionRefused // = 2402
  case hostAgentNotRunning // = 2403
  case hostAgentRequestFailed // = 2404

  ///*
  /// @note Host Agent errors end.
  case hostAgentEnd // = 2999

  ///
  /// @note Device server errors.
  /// 3000 ~ 3999 is used for device server process.
  /// 3000 ~ 3255 are used for exit codes 0 ~ 255.
  /// 3000 means success code.
  case deviceServerSuccessBegin // = 3000
  case deviceServerUnexpectedError // = 3001
  case deviceServerInvalidEnv // = 3002

  ///*
  /// @note Device server port in use.
  /// check if the port is in use by other process.
  case deviceServerPortInUse // = 3003

  ///
  /// @note reserved for device server exit code 255.
  case deviceServerExitCodeEnd // = 3255

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSighup // = 3301

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigint // = 3302

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigquit // = 3303

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigill // = 3304

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigtrap // = 3305

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigabrt // = 3306

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigfpe // = 3308

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigkill // = 3309

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigsegv // = 3311

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigpipe // = 3313

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigalrm // = 3314

  ///
  /// @link https://en.wikipedia.org/wiki/Signal_(IPC)
  /// @note reserved for signal to code conversion.
  case deviceServerSigterm // = 3315
  case deviceServerDeviceNotFound // = 3400
  case deviceServerAppiumContextNotFound // = 3401
  case deviceServerGamiumContextNotFound // = 3402
  case deviceServerAppiumContextInfoNotFound // = 3403
  case deviceServerAppiumCapabilitiesNotFound // = 3404

  ///*
  /// @note Device server errors end.
  case deviceServerEnd // = 3999

  ///
  /// @note Device Controller errors.
  /// 4000 ~ 4999 is used for device controller.
  /// 4000 means success code.
  case deviceControllerBegin // = 4000
  case deviceControllerInputNotsupported // = 4001
  case deviceControllerInputPermissionDenied // = 4002
  case deviceControllerInputUnknown // = 4003

  ///*
  /// @note Device Controller errors end.
  case deviceControllerEnd // = 4999

  ///
  /// @note Android Device Agent errors.
  /// 5000 ~ 5999 is used for android device agent.
  /// 5000 means success code.
  case androidDeviceAgentBegin // = 5000
  case androidDeviceAgentInputUnknown // = 5001
  case androidDeviceAgentClipboardNotavailable // = 5002

  ///*
  /// @note Android Device Agent errors end.
  case androidDeviceAgentEnd // = 5999
  case UNRECOGNIZED(Int)

  public init() {
    self = .successCommonBeginUnspecified
  }

  public init?(rawValue: Int) {
    switch rawValue {
    case 0: self = .successCommonBeginUnspecified
    case 1: self = .unexpectedError
    case 2: self = .numberUnderRange
    case 3: self = .numberOverRange
    case 4: self = .numberZero
    case 5: self = .numberNull
    case 10: self = .stringUnderRange
    case 11: self = .stringOverRange
    case 12: self = .stringEmpty
    case 13: self = .stringNull
    case 14: self = .stringParseFailed
    case 15: self = .stringInvalidCharacter
    case 16: self = .stringEncodingFailed
    case 17: self = .stringDecodingFailed
    case 18: self = .stringConversionFailed
    case 19: self = .stringInvalidSyntax
    case 20: self = .binaryUnderRange
    case 21: self = .binaryOverRange
    case 22: self = .binaryEmpty
    case 23: self = .binaryNull
    case 24: self = .binaryEncodingFailed
    case 25: self = .binaryDecodingFailed
    case 26: self = .binaryConversionFailed
    case 27: self = .binaryValidationFailed
    case 30: self = .dateInvalidYear
    case 31: self = .dateInvalidMonth
    case 32: self = .dateInvalidDay
    case 33: self = .dateInvalidHour
    case 34: self = .dateInvalidMinite
    case 35: self = .dateInvalidSecond
    case 40: self = .timeInvalidTimezone
    case 50: self = .arrayUnderRange
    case 51: self = .arrayOverRange
    case 52: self = .arrayEmpty
    case 53: self = .arrayKeyNotfound
    case 60: self = .mapKeyNotfound
    case 70: self = .concurrencyLockFailed
    case 71: self = .concurrencyDeadlock
    case 72: self = .concurrencyRace
    case 90: self = .filesystemFileNotfound
    case 91: self = .filesystemDirectoryNotfound
    case 92: self = .filesystemFileOpenFailed
    case 93: self = .filesystemFileCloseFailed
    case 94: self = .filesystemFileReadFailed
    case 95: self = .filesystemFileWriteFailed
    case 96: self = .filesystemDiskFull
    case 100: self = .networkConnectionFailed
    case 101: self = .networkConnectionClosed
    case 102: self = .networkConnectionTimeout
    case 103: self = .networkConnectionRefused
    case 104: self = .networkConnectionAborted
    case 105: self = .networkConnectionAlreadyConnected
    case 106: self = .networkConnectionInvalidUri
    case 110: self = .processForkFailed
    case 111: self = .processExecFailed
    case 112: self = .processWaitFailed
    case 113: self = .processKillFailed
    case 114: self = .processSignalFailed
    case 115: self = .processSignalNotSupported
    case 120: self = .memoryAllocationFailed
    case 121: self = .memoryReallocationFailed
    case 122: self = .memoryFreeFailed
    case 123: self = .memoryOutOfMemory
    case 130: self = .securityUnauthenticated
    case 131: self = .securityUnauthorised
    case 132: self = .securityPermissionDenied
    case 133: self = .securityInvalidToken
    case 140: self = .inputNotready
    case 141: self = .inputDiscarded
    case 142: self = .inputUnknown
    case 150: self = .screenrecordNotready
    case 151: self = .screenrecordAlreadyRecording
    case 152: self = .screenrecordNotstarted
    case 153: self = .screenrecordMultipleRecording
    case 154: self = .screenrecordNotfound
    case 155: self = .screenrecordNotsupported
    case 160: self = .webrtcPeerconnectionFailed
    case 161: self = .webrtcCodecNotsupported
    case 200: self = .deviceNotfound
    case 999: self = .commonEnd
    case 1000: self = .dostSuccessBegin
    case 1999: self = .dostEnd
    case 2000: self = .hostAgentSuccessBegin
    case 2001: self = .hostAgentUnexpectedError
    case 2002: self = .hostAgentInvalidEnv
    case 2003: self = .hostAgentPortInUse
    case 2255: self = .hostAgentExitCodeEnd
    case 2301: self = .hostAgentSighup
    case 2302: self = .hostAgentSigint
    case 2303: self = .hostAgentSigquit
    case 2304: self = .hostAgentSigill
    case 2305: self = .hostAgentSigtrap
    case 2306: self = .hostAgentSigabrt
    case 2308: self = .hostAgentSigfpe
    case 2309: self = .hostAgentSigkill
    case 2311: self = .hostAgentSigsegv
    case 2313: self = .hostAgentSigpipe
    case 2314: self = .hostAgentSigalrm
    case 2315: self = .hostAgentSigterm
    case 2400: self = .hostAgentDeviceRequestFailed
    case 2401: self = .hostAgentInvalidToken
    case 2402: self = .hostAgentConnectionRefused
    case 2403: self = .hostAgentNotRunning
    case 2404: self = .hostAgentRequestFailed
    case 2999: self = .hostAgentEnd
    case 3000: self = .deviceServerSuccessBegin
    case 3001: self = .deviceServerUnexpectedError
    case 3002: self = .deviceServerInvalidEnv
    case 3003: self = .deviceServerPortInUse
    case 3255: self = .deviceServerExitCodeEnd
    case 3301: self = .deviceServerSighup
    case 3302: self = .deviceServerSigint
    case 3303: self = .deviceServerSigquit
    case 3304: self = .deviceServerSigill
    case 3305: self = .deviceServerSigtrap
    case 3306: self = .deviceServerSigabrt
    case 3308: self = .deviceServerSigfpe
    case 3309: self = .deviceServerSigkill
    case 3311: self = .deviceServerSigsegv
    case 3313: self = .deviceServerSigpipe
    case 3314: self = .deviceServerSigalrm
    case 3315: self = .deviceServerSigterm
    case 3400: self = .deviceServerDeviceNotFound
    case 3401: self = .deviceServerAppiumContextNotFound
    case 3402: self = .deviceServerGamiumContextNotFound
    case 3403: self = .deviceServerAppiumContextInfoNotFound
    case 3404: self = .deviceServerAppiumCapabilitiesNotFound
    case 3999: self = .deviceServerEnd
    case 4000: self = .deviceControllerBegin
    case 4001: self = .deviceControllerInputNotsupported
    case 4002: self = .deviceControllerInputPermissionDenied
    case 4003: self = .deviceControllerInputUnknown
    case 4999: self = .deviceControllerEnd
    case 5000: self = .androidDeviceAgentBegin
    case 5001: self = .androidDeviceAgentInputUnknown
    case 5002: self = .androidDeviceAgentClipboardNotavailable
    case 5999: self = .androidDeviceAgentEnd
    default: self = .UNRECOGNIZED(rawValue)
    }
  }

  public var rawValue: Int {
    switch self {
    case .successCommonBeginUnspecified: return 0
    case .unexpectedError: return 1
    case .numberUnderRange: return 2
    case .numberOverRange: return 3
    case .numberZero: return 4
    case .numberNull: return 5
    case .stringUnderRange: return 10
    case .stringOverRange: return 11
    case .stringEmpty: return 12
    case .stringNull: return 13
    case .stringParseFailed: return 14
    case .stringInvalidCharacter: return 15
    case .stringEncodingFailed: return 16
    case .stringDecodingFailed: return 17
    case .stringConversionFailed: return 18
    case .stringInvalidSyntax: return 19
    case .binaryUnderRange: return 20
    case .binaryOverRange: return 21
    case .binaryEmpty: return 22
    case .binaryNull: return 23
    case .binaryEncodingFailed: return 24
    case .binaryDecodingFailed: return 25
    case .binaryConversionFailed: return 26
    case .binaryValidationFailed: return 27
    case .dateInvalidYear: return 30
    case .dateInvalidMonth: return 31
    case .dateInvalidDay: return 32
    case .dateInvalidHour: return 33
    case .dateInvalidMinite: return 34
    case .dateInvalidSecond: return 35
    case .timeInvalidTimezone: return 40
    case .arrayUnderRange: return 50
    case .arrayOverRange: return 51
    case .arrayEmpty: return 52
    case .arrayKeyNotfound: return 53
    case .mapKeyNotfound: return 60
    case .concurrencyLockFailed: return 70
    case .concurrencyDeadlock: return 71
    case .concurrencyRace: return 72
    case .filesystemFileNotfound: return 90
    case .filesystemDirectoryNotfound: return 91
    case .filesystemFileOpenFailed: return 92
    case .filesystemFileCloseFailed: return 93
    case .filesystemFileReadFailed: return 94
    case .filesystemFileWriteFailed: return 95
    case .filesystemDiskFull: return 96
    case .networkConnectionFailed: return 100
    case .networkConnectionClosed: return 101
    case .networkConnectionTimeout: return 102
    case .networkConnectionRefused: return 103
    case .networkConnectionAborted: return 104
    case .networkConnectionAlreadyConnected: return 105
    case .networkConnectionInvalidUri: return 106
    case .processForkFailed: return 110
    case .processExecFailed: return 111
    case .processWaitFailed: return 112
    case .processKillFailed: return 113
    case .processSignalFailed: return 114
    case .processSignalNotSupported: return 115
    case .memoryAllocationFailed: return 120
    case .memoryReallocationFailed: return 121
    case .memoryFreeFailed: return 122
    case .memoryOutOfMemory: return 123
    case .securityUnauthenticated: return 130
    case .securityUnauthorised: return 131
    case .securityPermissionDenied: return 132
    case .securityInvalidToken: return 133
    case .inputNotready: return 140
    case .inputDiscarded: return 141
    case .inputUnknown: return 142
    case .screenrecordNotready: return 150
    case .screenrecordAlreadyRecording: return 151
    case .screenrecordNotstarted: return 152
    case .screenrecordMultipleRecording: return 153
    case .screenrecordNotfound: return 154
    case .screenrecordNotsupported: return 155
    case .webrtcPeerconnectionFailed: return 160
    case .webrtcCodecNotsupported: return 161
    case .deviceNotfound: return 200
    case .commonEnd: return 999
    case .dostSuccessBegin: return 1000
    case .dostEnd: return 1999
    case .hostAgentSuccessBegin: return 2000
    case .hostAgentUnexpectedError: return 2001
    case .hostAgentInvalidEnv: return 2002
    case .hostAgentPortInUse: return 2003
    case .hostAgentExitCodeEnd: return 2255
    case .hostAgentSighup: return 2301
    case .hostAgentSigint: return 2302
    case .hostAgentSigquit: return 2303
    case .hostAgentSigill: return 2304
    case .hostAgentSigtrap: return 2305
    case .hostAgentSigabrt: return 2306
    case .hostAgentSigfpe: return 2308
    case .hostAgentSigkill: return 2309
    case .hostAgentSigsegv: return 2311
    case .hostAgentSigpipe: return 2313
    case .hostAgentSigalrm: return 2314
    case .hostAgentSigterm: return 2315
    case .hostAgentDeviceRequestFailed: return 2400
    case .hostAgentInvalidToken: return 2401
    case .hostAgentConnectionRefused: return 2402
    case .hostAgentNotRunning: return 2403
    case .hostAgentRequestFailed: return 2404
    case .hostAgentEnd: return 2999
    case .deviceServerSuccessBegin: return 3000
    case .deviceServerUnexpectedError: return 3001
    case .deviceServerInvalidEnv: return 3002
    case .deviceServerPortInUse: return 3003
    case .deviceServerExitCodeEnd: return 3255
    case .deviceServerSighup: return 3301
    case .deviceServerSigint: return 3302
    case .deviceServerSigquit: return 3303
    case .deviceServerSigill: return 3304
    case .deviceServerSigtrap: return 3305
    case .deviceServerSigabrt: return 3306
    case .deviceServerSigfpe: return 3308
    case .deviceServerSigkill: return 3309
    case .deviceServerSigsegv: return 3311
    case .deviceServerSigpipe: return 3313
    case .deviceServerSigalrm: return 3314
    case .deviceServerSigterm: return 3315
    case .deviceServerDeviceNotFound: return 3400
    case .deviceServerAppiumContextNotFound: return 3401
    case .deviceServerGamiumContextNotFound: return 3402
    case .deviceServerAppiumContextInfoNotFound: return 3403
    case .deviceServerAppiumCapabilitiesNotFound: return 3404
    case .deviceServerEnd: return 3999
    case .deviceControllerBegin: return 4000
    case .deviceControllerInputNotsupported: return 4001
    case .deviceControllerInputPermissionDenied: return 4002
    case .deviceControllerInputUnknown: return 4003
    case .deviceControllerEnd: return 4999
    case .androidDeviceAgentBegin: return 5000
    case .androidDeviceAgentInputUnknown: return 5001
    case .androidDeviceAgentClipboardNotavailable: return 5002
    case .androidDeviceAgentEnd: return 5999
    case .UNRECOGNIZED(let i): return i
    }
  }

}

#if swift(>=4.2)

extension Outer_Code: CaseIterable {
  // The compiler won't synthesize support with the UNRECOGNIZED case.
  public static var allCases: [Outer_Code] = [
    .successCommonBeginUnspecified,
    .unexpectedError,
    .numberUnderRange,
    .numberOverRange,
    .numberZero,
    .numberNull,
    .stringUnderRange,
    .stringOverRange,
    .stringEmpty,
    .stringNull,
    .stringParseFailed,
    .stringInvalidCharacter,
    .stringEncodingFailed,
    .stringDecodingFailed,
    .stringConversionFailed,
    .stringInvalidSyntax,
    .binaryUnderRange,
    .binaryOverRange,
    .binaryEmpty,
    .binaryNull,
    .binaryEncodingFailed,
    .binaryDecodingFailed,
    .binaryConversionFailed,
    .binaryValidationFailed,
    .dateInvalidYear,
    .dateInvalidMonth,
    .dateInvalidDay,
    .dateInvalidHour,
    .dateInvalidMinite,
    .dateInvalidSecond,
    .timeInvalidTimezone,
    .arrayUnderRange,
    .arrayOverRange,
    .arrayEmpty,
    .arrayKeyNotfound,
    .mapKeyNotfound,
    .concurrencyLockFailed,
    .concurrencyDeadlock,
    .concurrencyRace,
    .filesystemFileNotfound,
    .filesystemDirectoryNotfound,
    .filesystemFileOpenFailed,
    .filesystemFileCloseFailed,
    .filesystemFileReadFailed,
    .filesystemFileWriteFailed,
    .filesystemDiskFull,
    .networkConnectionFailed,
    .networkConnectionClosed,
    .networkConnectionTimeout,
    .networkConnectionRefused,
    .networkConnectionAborted,
    .networkConnectionAlreadyConnected,
    .networkConnectionInvalidUri,
    .processForkFailed,
    .processExecFailed,
    .processWaitFailed,
    .processKillFailed,
    .processSignalFailed,
    .processSignalNotSupported,
    .memoryAllocationFailed,
    .memoryReallocationFailed,
    .memoryFreeFailed,
    .memoryOutOfMemory,
    .securityUnauthenticated,
    .securityUnauthorised,
    .securityPermissionDenied,
    .securityInvalidToken,
    .inputNotready,
    .inputDiscarded,
    .inputUnknown,
    .screenrecordNotready,
    .screenrecordAlreadyRecording,
    .screenrecordNotstarted,
    .screenrecordMultipleRecording,
    .screenrecordNotfound,
    .screenrecordNotsupported,
    .webrtcPeerconnectionFailed,
    .webrtcCodecNotsupported,
    .deviceNotfound,
    .commonEnd,
    .dostSuccessBegin,
    .dostEnd,
    .hostAgentSuccessBegin,
    .hostAgentUnexpectedError,
    .hostAgentInvalidEnv,
    .hostAgentPortInUse,
    .hostAgentExitCodeEnd,
    .hostAgentSighup,
    .hostAgentSigint,
    .hostAgentSigquit,
    .hostAgentSigill,
    .hostAgentSigtrap,
    .hostAgentSigabrt,
    .hostAgentSigfpe,
    .hostAgentSigkill,
    .hostAgentSigsegv,
    .hostAgentSigpipe,
    .hostAgentSigalrm,
    .hostAgentSigterm,
    .hostAgentDeviceRequestFailed,
    .hostAgentInvalidToken,
    .hostAgentConnectionRefused,
    .hostAgentNotRunning,
    .hostAgentRequestFailed,
    .hostAgentEnd,
    .deviceServerSuccessBegin,
    .deviceServerUnexpectedError,
    .deviceServerInvalidEnv,
    .deviceServerPortInUse,
    .deviceServerExitCodeEnd,
    .deviceServerSighup,
    .deviceServerSigint,
    .deviceServerSigquit,
    .deviceServerSigill,
    .deviceServerSigtrap,
    .deviceServerSigabrt,
    .deviceServerSigfpe,
    .deviceServerSigkill,
    .deviceServerSigsegv,
    .deviceServerSigpipe,
    .deviceServerSigalrm,
    .deviceServerSigterm,
    .deviceServerDeviceNotFound,
    .deviceServerAppiumContextNotFound,
    .deviceServerGamiumContextNotFound,
    .deviceServerAppiumContextInfoNotFound,
    .deviceServerAppiumCapabilitiesNotFound,
    .deviceServerEnd,
    .deviceControllerBegin,
    .deviceControllerInputNotsupported,
    .deviceControllerInputPermissionDenied,
    .deviceControllerInputUnknown,
    .deviceControllerEnd,
    .androidDeviceAgentBegin,
    .androidDeviceAgentInputUnknown,
    .androidDeviceAgentClipboardNotavailable,
    .androidDeviceAgentEnd,
  ]
}

#endif  // swift(>=4.2)

public struct Outer_ErrorResult {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var code: Outer_Code = .successCommonBeginUnspecified

  public var message: String = String()

  public var details: SwiftProtobuf.Google_Protobuf_Struct {
    get {return _details ?? SwiftProtobuf.Google_Protobuf_Struct()}
    set {_details = newValue}
  }
  /// Returns true if `details` has been explicitly set.
  public var hasDetails: Bool {return self._details != nil}
  /// Clears the value of `details`. Subsequent reads from it will return its default value.
  public mutating func clearDetails() {self._details = nil}

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}

  fileprivate var _details: SwiftProtobuf.Google_Protobuf_Struct? = nil
}

#if swift(>=5.5) && canImport(_Concurrency)
extension Outer_Code: @unchecked Sendable {}
extension Outer_ErrorResult: @unchecked Sendable {}
#endif  // swift(>=5.5) && canImport(_Concurrency)

// MARK: - Code below here is support for the SwiftProtobuf runtime.

fileprivate let _protobuf_package = "outer"

extension Outer_Code: SwiftProtobuf._ProtoNameProviding {
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "CODE_SUCCESS_COMMON_BEGIN_UNSPECIFIED"),
    1: .same(proto: "CODE_UNEXPECTED_ERROR"),
    2: .same(proto: "CODE_NUMBER_UNDER_RANGE"),
    3: .same(proto: "CODE_NUMBER_OVER_RANGE"),
    4: .same(proto: "CODE_NUMBER_ZERO"),
    5: .same(proto: "CODE_NUMBER_NULL"),
    10: .same(proto: "CODE_STRING_UNDER_RANGE"),
    11: .same(proto: "CODE_STRING_OVER_RANGE"),
    12: .same(proto: "CODE_STRING_EMPTY"),
    13: .same(proto: "CODE_STRING_NULL"),
    14: .same(proto: "CODE_STRING_PARSE_FAILED"),
    15: .same(proto: "CODE_STRING_INVALID_CHARACTER"),
    16: .same(proto: "CODE_STRING_ENCODING_FAILED"),
    17: .same(proto: "CODE_STRING_DECODING_FAILED"),
    18: .same(proto: "CODE_STRING_CONVERSION_FAILED"),
    19: .same(proto: "CODE_STRING_INVALID_SYNTAX"),
    20: .same(proto: "CODE_BINARY_UNDER_RANGE"),
    21: .same(proto: "CODE_BINARY_OVER_RANGE"),
    22: .same(proto: "CODE_BINARY_EMPTY"),
    23: .same(proto: "CODE_BINARY_NULL"),
    24: .same(proto: "CODE_BINARY_ENCODING_FAILED"),
    25: .same(proto: "CODE_BINARY_DECODING_FAILED"),
    26: .same(proto: "CODE_BINARY_CONVERSION_FAILED"),
    27: .same(proto: "CODE_BINARY_VALIDATION_FAILED"),
    30: .same(proto: "CODE_DATE_INVALID_YEAR"),
    31: .same(proto: "CODE_DATE_INVALID_MONTH"),
    32: .same(proto: "CODE_DATE_INVALID_DAY"),
    33: .same(proto: "CODE_DATE_INVALID_HOUR"),
    34: .same(proto: "CODE_DATE_INVALID_MINITE"),
    35: .same(proto: "CODE_DATE_INVALID_SECOND"),
    40: .same(proto: "CODE_TIME_INVALID_TIMEZONE"),
    50: .same(proto: "CODE_ARRAY_UNDER_RANGE"),
    51: .same(proto: "CODE_ARRAY_OVER_RANGE"),
    52: .same(proto: "CODE_ARRAY_EMPTY"),
    53: .same(proto: "CODE_ARRAY_KEY_NOTFOUND"),
    60: .same(proto: "CODE_MAP_KEY_NOTFOUND"),
    70: .same(proto: "CODE_CONCURRENCY_LOCK_FAILED"),
    71: .same(proto: "CODE_CONCURRENCY_DEADLOCK"),
    72: .same(proto: "CODE_CONCURRENCY_RACE"),
    90: .same(proto: "CODE_FILESYSTEM_FILE_NOTFOUND"),
    91: .same(proto: "CODE_FILESYSTEM_DIRECTORY_NOTFOUND"),
    92: .same(proto: "CODE_FILESYSTEM_FILE_OPEN_FAILED"),
    93: .same(proto: "CODE_FILESYSTEM_FILE_CLOSE_FAILED"),
    94: .same(proto: "CODE_FILESYSTEM_FILE_READ_FAILED"),
    95: .same(proto: "CODE_FILESYSTEM_FILE_WRITE_FAILED"),
    96: .same(proto: "CODE_FILESYSTEM_DISK_FULL"),
    100: .same(proto: "CODE_NETWORK_CONNECTION_FAILED"),
    101: .same(proto: "CODE_NETWORK_CONNECTION_CLOSED"),
    102: .same(proto: "CODE_NETWORK_CONNECTION_TIMEOUT"),
    103: .same(proto: "CODE_NETWORK_CONNECTION_REFUSED"),
    104: .same(proto: "CODE_NETWORK_CONNECTION_ABORTED"),
    105: .same(proto: "CODE_NETWORK_CONNECTION_ALREADY_CONNECTED"),
    106: .same(proto: "CODE_NETWORK_CONNECTION_INVALID_URI"),
    110: .same(proto: "CODE_PROCESS_FORK_FAILED"),
    111: .same(proto: "CODE_PROCESS_EXEC_FAILED"),
    112: .same(proto: "CODE_PROCESS_WAIT_FAILED"),
    113: .same(proto: "CODE_PROCESS_KILL_FAILED"),
    114: .same(proto: "CODE_PROCESS_SIGNAL_FAILED"),
    115: .same(proto: "CODE_PROCESS_SIGNAL_NOT_SUPPORTED"),
    120: .same(proto: "CODE_MEMORY_ALLOCATION_FAILED"),
    121: .same(proto: "CODE_MEMORY_REALLOCATION_FAILED"),
    122: .same(proto: "CODE_MEMORY_FREE_FAILED"),
    123: .same(proto: "CODE_MEMORY_OUT_OF_MEMORY"),
    130: .same(proto: "CODE_SECURITY_UNAUTHENTICATED"),
    131: .same(proto: "CODE_SECURITY_UNAUTHORISED"),
    132: .same(proto: "CODE_SECURITY_PERMISSION_DENIED"),
    133: .same(proto: "CODE_SECURITY_INVALID_TOKEN"),
    140: .same(proto: "CODE_INPUT_NOTREADY"),
    141: .same(proto: "CODE_INPUT_DISCARDED"),
    142: .same(proto: "CODE_INPUT_UNKNOWN"),
    150: .same(proto: "CODE_SCREENRECORD_NOTREADY"),
    151: .same(proto: "CODE_SCREENRECORD_ALREADY_RECORDING"),
    152: .same(proto: "CODE_SCREENRECORD_NOTSTARTED"),
    153: .same(proto: "CODE_SCREENRECORD_MULTIPLE_RECORDING"),
    154: .same(proto: "CODE_SCREENRECORD_NOTFOUND"),
    155: .same(proto: "CODE_SCREENRECORD_NOTSUPPORTED"),
    160: .same(proto: "CODE_WEBRTC_PEERCONNECTION_FAILED"),
    161: .same(proto: "CODE_WEBRTC_CODEC_NOTSUPPORTED"),
    200: .same(proto: "CODE_DEVICE_NOTFOUND"),
    999: .same(proto: "CODE_COMMON_END"),
    1000: .same(proto: "CODE_DOST_SUCCESS_BEGIN"),
    1999: .same(proto: "CODE_DOST_END"),
    2000: .same(proto: "CODE_HOST_AGENT_SUCCESS_BEGIN"),
    2001: .same(proto: "CODE_HOST_AGENT_UNEXPECTED_ERROR"),
    2002: .same(proto: "CODE_HOST_AGENT_INVALID_ENV"),
    2003: .same(proto: "CODE_HOST_AGENT_PORT_IN_USE"),
    2255: .same(proto: "CODE_HOST_AGENT_EXIT_CODE_END"),
    2301: .same(proto: "CODE_HOST_AGENT_SIGHUP"),
    2302: .same(proto: "CODE_HOST_AGENT_SIGINT"),
    2303: .same(proto: "CODE_HOST_AGENT_SIGQUIT"),
    2304: .same(proto: "CODE_HOST_AGENT_SIGILL"),
    2305: .same(proto: "CODE_HOST_AGENT_SIGTRAP"),
    2306: .same(proto: "CODE_HOST_AGENT_SIGABRT"),
    2308: .same(proto: "CODE_HOST_AGENT_SIGFPE"),
    2309: .same(proto: "CODE_HOST_AGENT_SIGKILL"),
    2311: .same(proto: "CODE_HOST_AGENT_SIGSEGV"),
    2313: .same(proto: "CODE_HOST_AGENT_SIGPIPE"),
    2314: .same(proto: "CODE_HOST_AGENT_SIGALRM"),
    2315: .same(proto: "CODE_HOST_AGENT_SIGTERM"),
    2400: .same(proto: "CODE_HOST_AGENT_DEVICE_REQUEST_FAILED"),
    2401: .same(proto: "CODE_HOST_AGENT_INVALID_TOKEN"),
    2402: .same(proto: "CODE_HOST_AGENT_CONNECTION_REFUSED"),
    2403: .same(proto: "CODE_HOST_AGENT_NOT_RUNNING"),
    2404: .same(proto: "CODE_HOST_AGENT_REQUEST_FAILED"),
    2999: .same(proto: "CODE_HOST_AGENT_END"),
    3000: .same(proto: "CODE_DEVICE_SERVER_SUCCESS_BEGIN"),
    3001: .same(proto: "CODE_DEVICE_SERVER_UNEXPECTED_ERROR"),
    3002: .same(proto: "CODE_DEVICE_SERVER_INVALID_ENV"),
    3003: .same(proto: "CODE_DEVICE_SERVER_PORT_IN_USE"),
    3255: .same(proto: "CODE_DEVICE_SERVER_EXIT_CODE_END"),
    3301: .same(proto: "CODE_DEVICE_SERVER_SIGHUP"),
    3302: .same(proto: "CODE_DEVICE_SERVER_SIGINT"),
    3303: .same(proto: "CODE_DEVICE_SERVER_SIGQUIT"),
    3304: .same(proto: "CODE_DEVICE_SERVER_SIGILL"),
    3305: .same(proto: "CODE_DEVICE_SERVER_SIGTRAP"),
    3306: .same(proto: "CODE_DEVICE_SERVER_SIGABRT"),
    3308: .same(proto: "CODE_DEVICE_SERVER_SIGFPE"),
    3309: .same(proto: "CODE_DEVICE_SERVER_SIGKILL"),
    3311: .same(proto: "CODE_DEVICE_SERVER_SIGSEGV"),
    3313: .same(proto: "CODE_DEVICE_SERVER_SIGPIPE"),
    3314: .same(proto: "CODE_DEVICE_SERVER_SIGALRM"),
    3315: .same(proto: "CODE_DEVICE_SERVER_SIGTERM"),
    3400: .same(proto: "CODE_DEVICE_SERVER_DEVICE_NOT_FOUND"),
    3401: .same(proto: "CODE_DEVICE_SERVER_APPIUM_CONTEXT_NOT_FOUND"),
    3402: .same(proto: "CODE_DEVICE_SERVER_GAMIUM_CONTEXT_NOT_FOUND"),
    3403: .same(proto: "CODE_DEVICE_SERVER_APPIUM_CONTEXT_INFO_NOT_FOUND"),
    3404: .same(proto: "CODE_DEVICE_SERVER_APPIUM_CAPABILITIES_NOT_FOUND"),
    3999: .same(proto: "CODE_DEVICE_SERVER_END"),
    4000: .same(proto: "CODE_DEVICE_CONTROLLER_BEGIN"),
    4001: .same(proto: "CODE_DEVICE_CONTROLLER_INPUT_NOTSUPPORTED"),
    4002: .same(proto: "CODE_DEVICE_CONTROLLER_INPUT_PERMISSION_DENIED"),
    4003: .same(proto: "CODE_DEVICE_CONTROLLER_INPUT_UNKNOWN"),
    4999: .same(proto: "CODE_DEVICE_CONTROLLER_END"),
    5000: .same(proto: "CODE_ANDROID_DEVICE_AGENT_BEGIN"),
    5001: .same(proto: "CODE_ANDROID_DEVICE_AGENT_INPUT_UNKNOWN"),
    5002: .same(proto: "CODE_ANDROID_DEVICE_AGENT_CLIPBOARD_NOTAVAILABLE"),
    5999: .same(proto: "CODE_ANDROID_DEVICE_AGENT_END"),
  ]
}

extension Outer_ErrorResult: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".ErrorResult"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "code"),
    2: .same(proto: "message"),
    3: .same(proto: "details"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularEnumField(value: &self.code) }()
      case 2: try { try decoder.decodeSingularStringField(value: &self.message) }()
      case 3: try { try decoder.decodeSingularMessageField(value: &self._details) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    // The use of inline closures is to circumvent an issue where the compiler
    // allocates stack space for every if/case branch local when no optimizations
    // are enabled. https://github.com/apple/swift-protobuf/issues/1034 and
    // https://github.com/apple/swift-protobuf/issues/1182
    if self.code != .successCommonBeginUnspecified {
      try visitor.visitSingularEnumField(value: self.code, fieldNumber: 1)
    }
    if !self.message.isEmpty {
      try visitor.visitSingularStringField(value: self.message, fieldNumber: 2)
    }
    try { if let v = self._details {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 3)
    } }()
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Outer_ErrorResult, rhs: Outer_ErrorResult) -> Bool {
    if lhs.code != rhs.code {return false}
    if lhs.message != rhs.message {return false}
    if lhs._details != rhs._details {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}
