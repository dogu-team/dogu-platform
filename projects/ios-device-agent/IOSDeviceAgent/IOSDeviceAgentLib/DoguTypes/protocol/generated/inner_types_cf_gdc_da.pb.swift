// DO NOT EDIT.
// swift-format-ignore-file
//
// Generated by the Swift generator plugin for the protocol buffer compiler.
// Source: inner/types/cf_gdc_da.proto
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

public struct Inner_Types_DataChannelProtocolDefault {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Inner_Types_DataChannelProtocolRelayTcp {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var port: UInt32 = 0

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Inner_Types_DataChannelProtocolDeviceHttp {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Inner_Types_DataChannelProtocolDeviceWebSocket {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Inner_Types_DataChannelLabel {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var name: String = String()

  public var `protocol`: Inner_Types_DataChannelLabel.OneOf_Protocol? = nil

  public var `default`: Inner_Types_DataChannelProtocolDefault {
    get {
      if case .default(let v)? = `protocol` {return v}
      return Inner_Types_DataChannelProtocolDefault()
    }
    set {`protocol` = .default(newValue)}
  }

  public var relayTcp: Inner_Types_DataChannelProtocolRelayTcp {
    get {
      if case .relayTcp(let v)? = `protocol` {return v}
      return Inner_Types_DataChannelProtocolRelayTcp()
    }
    set {`protocol` = .relayTcp(newValue)}
  }

  public var deviceHTTP: Inner_Types_DataChannelProtocolDeviceHttp {
    get {
      if case .deviceHTTP(let v)? = `protocol` {return v}
      return Inner_Types_DataChannelProtocolDeviceHttp()
    }
    set {`protocol` = .deviceHTTP(newValue)}
  }

  public var deviceWebSocket: Inner_Types_DataChannelProtocolDeviceWebSocket {
    get {
      if case .deviceWebSocket(let v)? = `protocol` {return v}
      return Inner_Types_DataChannelProtocolDeviceWebSocket()
    }
    set {`protocol` = .deviceWebSocket(newValue)}
  }

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public enum OneOf_Protocol: Equatable {
    case `default`(Inner_Types_DataChannelProtocolDefault)
    case relayTcp(Inner_Types_DataChannelProtocolRelayTcp)
    case deviceHTTP(Inner_Types_DataChannelProtocolDeviceHttp)
    case deviceWebSocket(Inner_Types_DataChannelProtocolDeviceWebSocket)

  #if !swift(>=4.1)
    public static func ==(lhs: Inner_Types_DataChannelLabel.OneOf_Protocol, rhs: Inner_Types_DataChannelLabel.OneOf_Protocol) -> Bool {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch (lhs, rhs) {
      case (.default, .default): return {
        guard case .default(let l) = lhs, case .default(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      case (.relayTcp, .relayTcp): return {
        guard case .relayTcp(let l) = lhs, case .relayTcp(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      case (.deviceHTTP, .deviceHTTP): return {
        guard case .deviceHTTP(let l) = lhs, case .deviceHTTP(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      case (.deviceWebSocket, .deviceWebSocket): return {
        guard case .deviceWebSocket(let l) = lhs, case .deviceWebSocket(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      default: return false
      }
    }
  #endif
  }

  public init() {}
}

public struct Inner_Types_CfGdcDaControlParam {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var control: Inner_Types_DeviceControl {
    get {return _control ?? Inner_Types_DeviceControl()}
    set {_control = newValue}
  }
  /// Returns true if `control` has been explicitly set.
  public var hasControl: Bool {return self._control != nil}
  /// Clears the value of `control`. Subsequent reads from it will return its default value.
  public mutating func clearControl() {self._control = nil}

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}

  fileprivate var _control: Inner_Types_DeviceControl? = nil
}

public struct Inner_Types_CfGdcDaControlResult {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var error: Outer_ErrorResult {
    get {return _error ?? Outer_ErrorResult()}
    set {_error = newValue}
  }
  /// Returns true if `error` has been explicitly set.
  public var hasError: Bool {return self._error != nil}
  /// Clears the value of `error`. Subsequent reads from it will return its default value.
  public mutating func clearError() {self._error = nil}

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}

  fileprivate var _error: Outer_ErrorResult? = nil
}

#if swift(>=5.5) && canImport(_Concurrency)
extension Inner_Types_DataChannelProtocolDefault: @unchecked Sendable {}
extension Inner_Types_DataChannelProtocolRelayTcp: @unchecked Sendable {}
extension Inner_Types_DataChannelProtocolDeviceHttp: @unchecked Sendable {}
extension Inner_Types_DataChannelProtocolDeviceWebSocket: @unchecked Sendable {}
extension Inner_Types_DataChannelLabel: @unchecked Sendable {}
extension Inner_Types_DataChannelLabel.OneOf_Protocol: @unchecked Sendable {}
extension Inner_Types_CfGdcDaControlParam: @unchecked Sendable {}
extension Inner_Types_CfGdcDaControlResult: @unchecked Sendable {}
#endif  // swift(>=5.5) && canImport(_Concurrency)

// MARK: - Code below here is support for the SwiftProtobuf runtime.

fileprivate let _protobuf_package = "inner.types"

extension Inner_Types_DataChannelProtocolDefault: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".DataChannelProtocolDefault"
  public static let _protobuf_nameMap = SwiftProtobuf._NameMap()

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let _ = try decoder.nextFieldNumber() {
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_DataChannelProtocolDefault, rhs: Inner_Types_DataChannelProtocolDefault) -> Bool {
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_DataChannelProtocolRelayTcp: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".DataChannelProtocolRelayTcp"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "port"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularUInt32Field(value: &self.port) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if self.port != 0 {
      try visitor.visitSingularUInt32Field(value: self.port, fieldNumber: 1)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_DataChannelProtocolRelayTcp, rhs: Inner_Types_DataChannelProtocolRelayTcp) -> Bool {
    if lhs.port != rhs.port {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_DataChannelProtocolDeviceHttp: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".DataChannelProtocolDeviceHttp"
  public static let _protobuf_nameMap = SwiftProtobuf._NameMap()

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let _ = try decoder.nextFieldNumber() {
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_DataChannelProtocolDeviceHttp, rhs: Inner_Types_DataChannelProtocolDeviceHttp) -> Bool {
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_DataChannelProtocolDeviceWebSocket: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".DataChannelProtocolDeviceWebSocket"
  public static let _protobuf_nameMap = SwiftProtobuf._NameMap()

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let _ = try decoder.nextFieldNumber() {
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_DataChannelProtocolDeviceWebSocket, rhs: Inner_Types_DataChannelProtocolDeviceWebSocket) -> Bool {
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_DataChannelLabel: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".DataChannelLabel"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "name"),
    2: .same(proto: "default"),
    3: .standard(proto: "relay_tcp"),
    4: .standard(proto: "device_http"),
    5: .standard(proto: "device_web_socket"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularStringField(value: &self.name) }()
      case 2: try {
        var v: Inner_Types_DataChannelProtocolDefault?
        var hadOneofValue = false
        if let current = self.`protocol` {
          hadOneofValue = true
          if case .default(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.`protocol` = .default(v)
        }
      }()
      case 3: try {
        var v: Inner_Types_DataChannelProtocolRelayTcp?
        var hadOneofValue = false
        if let current = self.`protocol` {
          hadOneofValue = true
          if case .relayTcp(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.`protocol` = .relayTcp(v)
        }
      }()
      case 4: try {
        var v: Inner_Types_DataChannelProtocolDeviceHttp?
        var hadOneofValue = false
        if let current = self.`protocol` {
          hadOneofValue = true
          if case .deviceHTTP(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.`protocol` = .deviceHTTP(v)
        }
      }()
      case 5: try {
        var v: Inner_Types_DataChannelProtocolDeviceWebSocket?
        var hadOneofValue = false
        if let current = self.`protocol` {
          hadOneofValue = true
          if case .deviceWebSocket(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.`protocol` = .deviceWebSocket(v)
        }
      }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    // The use of inline closures is to circumvent an issue where the compiler
    // allocates stack space for every if/case branch local when no optimizations
    // are enabled. https://github.com/apple/swift-protobuf/issues/1034 and
    // https://github.com/apple/swift-protobuf/issues/1182
    if !self.name.isEmpty {
      try visitor.visitSingularStringField(value: self.name, fieldNumber: 1)
    }
    switch self.`protocol` {
    case .default?: try {
      guard case .default(let v)? = self.`protocol` else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 2)
    }()
    case .relayTcp?: try {
      guard case .relayTcp(let v)? = self.`protocol` else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 3)
    }()
    case .deviceHTTP?: try {
      guard case .deviceHTTP(let v)? = self.`protocol` else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 4)
    }()
    case .deviceWebSocket?: try {
      guard case .deviceWebSocket(let v)? = self.`protocol` else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 5)
    }()
    case nil: break
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_DataChannelLabel, rhs: Inner_Types_DataChannelLabel) -> Bool {
    if lhs.name != rhs.name {return false}
    if lhs.`protocol` != rhs.`protocol` {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_CfGdcDaControlParam: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".CfGdcDaControlParam"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "control"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularMessageField(value: &self._control) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    // The use of inline closures is to circumvent an issue where the compiler
    // allocates stack space for every if/case branch local when no optimizations
    // are enabled. https://github.com/apple/swift-protobuf/issues/1034 and
    // https://github.com/apple/swift-protobuf/issues/1182
    try { if let v = self._control {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 1)
    } }()
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_CfGdcDaControlParam, rhs: Inner_Types_CfGdcDaControlParam) -> Bool {
    if lhs._control != rhs._control {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Inner_Types_CfGdcDaControlResult: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".CfGdcDaControlResult"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "error"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularMessageField(value: &self._error) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    // The use of inline closures is to circumvent an issue where the compiler
    // allocates stack space for every if/case branch local when no optimizations
    // are enabled. https://github.com/apple/swift-protobuf/issues/1034 and
    // https://github.com/apple/swift-protobuf/issues/1182
    try { if let v = self._error {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 1)
    } }()
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Inner_Types_CfGdcDaControlResult, rhs: Inner_Types_CfGdcDaControlResult) -> Bool {
    if lhs._error != rhs._error {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}
