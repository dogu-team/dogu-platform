//Generated by the protocol buffer compiler. DO NOT EDIT!
// source: outer/streaming/streaming.proto

package com.dogu.protocol.generated.outer.streaming;

@kotlin.jvm.JvmName("-initializestreamingAnswer")
inline fun streamingAnswer(block: com.dogu.protocol.generated.outer.streaming.StreamingAnswerKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer =
  com.dogu.protocol.generated.outer.streaming.StreamingAnswerKt.Dsl._create(com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer.newBuilder()).apply { block() }._build()
object StreamingAnswerKt {
  @kotlin.OptIn(com.google.protobuf.kotlin.OnlyForUseByGeneratedProtoCode::class)
  @com.google.protobuf.kotlin.ProtoDslMarker
  class Dsl private constructor(
    private val _builder: com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer.Builder
  ) {
    companion object {
      @kotlin.jvm.JvmSynthetic
      @kotlin.PublishedApi
      internal fun _create(builder: com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer.Builder): Dsl = Dsl(builder)
    }

    @kotlin.jvm.JvmSynthetic
    @kotlin.PublishedApi
    internal fun _build(): com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer = _builder.build()

    /**
     * <code>.outer.streaming.ProtoRTCPeerDescription peer_description = 1;</code>
     */
    var peerDescription: com.dogu.protocol.generated.outer.streaming.Webrtc.ProtoRTCPeerDescription
      @JvmName("getPeerDescription")
      get() = _builder.getPeerDescription()
      @JvmName("setPeerDescription")
      set(value) {
        _builder.setPeerDescription(value)
      }
    /**
     * <code>.outer.streaming.ProtoRTCPeerDescription peer_description = 1;</code>
     */
    fun clearPeerDescription() {
      _builder.clearPeerDescription()
    }
    /**
     * <code>.outer.streaming.ProtoRTCPeerDescription peer_description = 1;</code>
     * @return Whether the peerDescription field is set.
     */
    fun hasPeerDescription(): kotlin.Boolean {
      return _builder.hasPeerDescription()
    }

    /**
     * <code>.outer.streaming.ProtoRTCIceCandidateInit ice_candidate = 2;</code>
     */
    var iceCandidate: com.dogu.protocol.generated.outer.streaming.Webrtc.ProtoRTCIceCandidateInit
      @JvmName("getIceCandidate")
      get() = _builder.getIceCandidate()
      @JvmName("setIceCandidate")
      set(value) {
        _builder.setIceCandidate(value)
      }
    /**
     * <code>.outer.streaming.ProtoRTCIceCandidateInit ice_candidate = 2;</code>
     */
    fun clearIceCandidate() {
      _builder.clearIceCandidate()
    }
    /**
     * <code>.outer.streaming.ProtoRTCIceCandidateInit ice_candidate = 2;</code>
     * @return Whether the iceCandidate field is set.
     */
    fun hasIceCandidate(): kotlin.Boolean {
      return _builder.hasIceCandidate()
    }

    /**
     * <code>.outer.ErrorResult error_result = 3;</code>
     */
    var errorResult: com.dogu.protocol.generated.outer.Errors.ErrorResult
      @JvmName("getErrorResult")
      get() = _builder.getErrorResult()
      @JvmName("setErrorResult")
      set(value) {
        _builder.setErrorResult(value)
      }
    /**
     * <code>.outer.ErrorResult error_result = 3;</code>
     */
    fun clearErrorResult() {
      _builder.clearErrorResult()
    }
    /**
     * <code>.outer.ErrorResult error_result = 3;</code>
     * @return Whether the errorResult field is set.
     */
    fun hasErrorResult(): kotlin.Boolean {
      return _builder.hasErrorResult()
    }

    /**
     * <code>.outer.DeviceServerToken device_server_token = 4;</code>
     */
    var deviceServerToken: com.dogu.protocol.generated.outer.DeviceAuth.DeviceServerToken
      @JvmName("getDeviceServerToken")
      get() = _builder.getDeviceServerToken()
      @JvmName("setDeviceServerToken")
      set(value) {
        _builder.setDeviceServerToken(value)
      }
    /**
     * <code>.outer.DeviceServerToken device_server_token = 4;</code>
     */
    fun clearDeviceServerToken() {
      _builder.clearDeviceServerToken()
    }
    /**
     * <code>.outer.DeviceServerToken device_server_token = 4;</code>
     * @return Whether the deviceServerToken field is set.
     */
    fun hasDeviceServerToken(): kotlin.Boolean {
      return _builder.hasDeviceServerToken()
    }
    val valueCase: com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer.ValueCase
      @JvmName("getValueCase")
      get() = _builder.getValueCase()

    fun clearValue() {
      _builder.clearValue()
    }
  }
}
@kotlin.jvm.JvmSynthetic
inline fun com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer.copy(block: com.dogu.protocol.generated.outer.streaming.StreamingAnswerKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswer =
  com.dogu.protocol.generated.outer.streaming.StreamingAnswerKt.Dsl._create(this.toBuilder()).apply { block() }._build()

val com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswerOrBuilder.peerDescriptionOrNull: com.dogu.protocol.generated.outer.streaming.Webrtc.ProtoRTCPeerDescription?
  get() = if (hasPeerDescription()) getPeerDescription() else null

val com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswerOrBuilder.iceCandidateOrNull: com.dogu.protocol.generated.outer.streaming.Webrtc.ProtoRTCIceCandidateInit?
  get() = if (hasIceCandidate()) getIceCandidate() else null

val com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswerOrBuilder.errorResultOrNull: com.dogu.protocol.generated.outer.Errors.ErrorResult?
  get() = if (hasErrorResult()) getErrorResult() else null

val com.dogu.protocol.generated.outer.streaming.Streaming.StreamingAnswerOrBuilder.deviceServerTokenOrNull: com.dogu.protocol.generated.outer.DeviceAuth.DeviceServerToken?
  get() = if (hasDeviceServerToken()) getDeviceServerToken() else null

