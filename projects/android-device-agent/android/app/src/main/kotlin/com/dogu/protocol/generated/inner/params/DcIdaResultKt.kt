//Generated by the protocol buffer compiler. DO NOT EDIT!
// source: inner/params/dc_ida.proto

package com.dogu.protocol.generated.inner.params;

@kotlin.jvm.JvmName("-initializedcIdaResult")
inline fun dcIdaResult(block: com.dogu.protocol.generated.inner.params.DcIdaResultKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult =
  com.dogu.protocol.generated.inner.params.DcIdaResultKt.Dsl._create(com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult.newBuilder()).apply { block() }._build()
object DcIdaResultKt {
  @kotlin.OptIn(com.google.protobuf.kotlin.OnlyForUseByGeneratedProtoCode::class)
  @com.google.protobuf.kotlin.ProtoDslMarker
  class Dsl private constructor(
    private val _builder: com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult.Builder
  ) {
    companion object {
      @kotlin.jvm.JvmSynthetic
      @kotlin.PublishedApi
      internal fun _create(builder: com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult.Builder): Dsl = Dsl(builder)
    }

    @kotlin.jvm.JvmSynthetic
    @kotlin.PublishedApi
    internal fun _build(): com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult = _builder.build()

    /**
     * <code>fixed32 seq = 1;</code>
     */
    var seq: kotlin.Int
      @JvmName("getSeq")
      get() = _builder.getSeq()
      @JvmName("setSeq")
      set(value) {
        _builder.setSeq(value)
      }
    /**
     * <code>fixed32 seq = 1;</code>
     */
    fun clearSeq() {
      _builder.clearSeq()
    }

    /**
     * <code>optional .outer.ErrorResult error = 2;</code>
     */
    var error: com.dogu.protocol.generated.outer.Errors.ErrorResult
      @JvmName("getError")
      get() = _builder.getError()
      @JvmName("setError")
      set(value) {
        _builder.setError(value)
      }
    /**
     * <code>optional .outer.ErrorResult error = 2;</code>
     */
    fun clearError() {
      _builder.clearError()
    }
    /**
     * <code>optional .outer.ErrorResult error = 2;</code>
     * @return Whether the error field is set.
     */
    fun hasError(): kotlin.Boolean {
      return _builder.hasError()
    }
    val DcIdaResultKt.Dsl.errorOrNull: com.dogu.protocol.generated.outer.Errors.ErrorResult?
      get() = _builder.errorOrNull

    /**
     * <code>.inner.types.DcIdaRunAppResult dc_ida_runapp_result = 10;</code>
     */
    var dcIdaRunappResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaRunAppResult
      @JvmName("getDcIdaRunappResult")
      get() = _builder.getDcIdaRunappResult()
      @JvmName("setDcIdaRunappResult")
      set(value) {
        _builder.setDcIdaRunappResult(value)
      }
    /**
     * <code>.inner.types.DcIdaRunAppResult dc_ida_runapp_result = 10;</code>
     */
    fun clearDcIdaRunappResult() {
      _builder.clearDcIdaRunappResult()
    }
    /**
     * <code>.inner.types.DcIdaRunAppResult dc_ida_runapp_result = 10;</code>
     * @return Whether the dcIdaRunappResult field is set.
     */
    fun hasDcIdaRunappResult(): kotlin.Boolean {
      return _builder.hasDcIdaRunappResult()
    }

    /**
     * <code>.inner.types.DcIdaGetSystemInfoResult dc_ida_get_system_info_result = 11;</code>
     */
    var dcIdaGetSystemInfoResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaGetSystemInfoResult
      @JvmName("getDcIdaGetSystemInfoResult")
      get() = _builder.getDcIdaGetSystemInfoResult()
      @JvmName("setDcIdaGetSystemInfoResult")
      set(value) {
        _builder.setDcIdaGetSystemInfoResult(value)
      }
    /**
     * <code>.inner.types.DcIdaGetSystemInfoResult dc_ida_get_system_info_result = 11;</code>
     */
    fun clearDcIdaGetSystemInfoResult() {
      _builder.clearDcIdaGetSystemInfoResult()
    }
    /**
     * <code>.inner.types.DcIdaGetSystemInfoResult dc_ida_get_system_info_result = 11;</code>
     * @return Whether the dcIdaGetSystemInfoResult field is set.
     */
    fun hasDcIdaGetSystemInfoResult(): kotlin.Boolean {
      return _builder.hasDcIdaGetSystemInfoResult()
    }

    /**
     * <code>.inner.types.DcIdaIsPortListeningResult dc_ida_is_port_listening_result = 12;</code>
     */
    var dcIdaIsPortListeningResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaIsPortListeningResult
      @JvmName("getDcIdaIsPortListeningResult")
      get() = _builder.getDcIdaIsPortListeningResult()
      @JvmName("setDcIdaIsPortListeningResult")
      set(value) {
        _builder.setDcIdaIsPortListeningResult(value)
      }
    /**
     * <code>.inner.types.DcIdaIsPortListeningResult dc_ida_is_port_listening_result = 12;</code>
     */
    fun clearDcIdaIsPortListeningResult() {
      _builder.clearDcIdaIsPortListeningResult()
    }
    /**
     * <code>.inner.types.DcIdaIsPortListeningResult dc_ida_is_port_listening_result = 12;</code>
     * @return Whether the dcIdaIsPortListeningResult field is set.
     */
    fun hasDcIdaIsPortListeningResult(): kotlin.Boolean {
      return _builder.hasDcIdaIsPortListeningResult()
    }

    /**
     * <code>.inner.types.DcIdaQueryProfileResult dc_ida_query_profile_result = 13;</code>
     */
    var dcIdaQueryProfileResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaQueryProfileResult
      @JvmName("getDcIdaQueryProfileResult")
      get() = _builder.getDcIdaQueryProfileResult()
      @JvmName("setDcIdaQueryProfileResult")
      set(value) {
        _builder.setDcIdaQueryProfileResult(value)
      }
    /**
     * <code>.inner.types.DcIdaQueryProfileResult dc_ida_query_profile_result = 13;</code>
     */
    fun clearDcIdaQueryProfileResult() {
      _builder.clearDcIdaQueryProfileResult()
    }
    /**
     * <code>.inner.types.DcIdaQueryProfileResult dc_ida_query_profile_result = 13;</code>
     * @return Whether the dcIdaQueryProfileResult field is set.
     */
    fun hasDcIdaQueryProfileResult(): kotlin.Boolean {
      return _builder.hasDcIdaQueryProfileResult()
    }

    /**
     * <code>.inner.types.CfGdcDaControlResult dc_gdc_da_control_result = 14;</code>
     */
    var dcGdcDaControlResult: com.dogu.protocol.generated.inner.types.CfGdcDa.CfGdcDaControlResult
      @JvmName("getDcGdcDaControlResult")
      get() = _builder.getDcGdcDaControlResult()
      @JvmName("setDcGdcDaControlResult")
      set(value) {
        _builder.setDcGdcDaControlResult(value)
      }
    /**
     * <code>.inner.types.CfGdcDaControlResult dc_gdc_da_control_result = 14;</code>
     */
    fun clearDcGdcDaControlResult() {
      _builder.clearDcGdcDaControlResult()
    }
    /**
     * <code>.inner.types.CfGdcDaControlResult dc_gdc_da_control_result = 14;</code>
     * @return Whether the dcGdcDaControlResult field is set.
     */
    fun hasDcGdcDaControlResult(): kotlin.Boolean {
      return _builder.hasDcGdcDaControlResult()
    }

    /**
     * <code>.inner.types.DcIdaSwitchInputBlockResult dc_ida_switch_input_block_result = 15;</code>
     */
    var dcIdaSwitchInputBlockResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaSwitchInputBlockResult
      @JvmName("getDcIdaSwitchInputBlockResult")
      get() = _builder.getDcIdaSwitchInputBlockResult()
      @JvmName("setDcIdaSwitchInputBlockResult")
      set(value) {
        _builder.setDcIdaSwitchInputBlockResult(value)
      }
    /**
     * <code>.inner.types.DcIdaSwitchInputBlockResult dc_ida_switch_input_block_result = 15;</code>
     */
    fun clearDcIdaSwitchInputBlockResult() {
      _builder.clearDcIdaSwitchInputBlockResult()
    }
    /**
     * <code>.inner.types.DcIdaSwitchInputBlockResult dc_ida_switch_input_block_result = 15;</code>
     * @return Whether the dcIdaSwitchInputBlockResult field is set.
     */
    fun hasDcIdaSwitchInputBlockResult(): kotlin.Boolean {
      return _builder.hasDcIdaSwitchInputBlockResult()
    }

    /**
     * <code>.inner.types.DcIdaQueryAlertResult dc_ida_query_alert_result = 16;</code>
     */
    var dcIdaQueryAlertResult: com.dogu.protocol.generated.inner.types.DcIda.DcIdaQueryAlertResult
      @JvmName("getDcIdaQueryAlertResult")
      get() = _builder.getDcIdaQueryAlertResult()
      @JvmName("setDcIdaQueryAlertResult")
      set(value) {
        _builder.setDcIdaQueryAlertResult(value)
      }
    /**
     * <code>.inner.types.DcIdaQueryAlertResult dc_ida_query_alert_result = 16;</code>
     */
    fun clearDcIdaQueryAlertResult() {
      _builder.clearDcIdaQueryAlertResult()
    }
    /**
     * <code>.inner.types.DcIdaQueryAlertResult dc_ida_query_alert_result = 16;</code>
     * @return Whether the dcIdaQueryAlertResult field is set.
     */
    fun hasDcIdaQueryAlertResult(): kotlin.Boolean {
      return _builder.hasDcIdaQueryAlertResult()
    }
    val valueCase: com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult.ValueCase
      @JvmName("getValueCase")
      get() = _builder.getValueCase()

    fun clearValue() {
      _builder.clearValue()
    }
  }
}
@kotlin.jvm.JvmSynthetic
inline fun com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult.copy(block: com.dogu.protocol.generated.inner.params.DcIdaResultKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.inner.params.DcIda.DcIdaResult =
  com.dogu.protocol.generated.inner.params.DcIdaResultKt.Dsl._create(this.toBuilder()).apply { block() }._build()

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.errorOrNull: com.dogu.protocol.generated.outer.Errors.ErrorResult?
  get() = if (hasError()) getError() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaRunappResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaRunAppResult?
  get() = if (hasDcIdaRunappResult()) getDcIdaRunappResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaGetSystemInfoResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaGetSystemInfoResult?
  get() = if (hasDcIdaGetSystemInfoResult()) getDcIdaGetSystemInfoResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaIsPortListeningResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaIsPortListeningResult?
  get() = if (hasDcIdaIsPortListeningResult()) getDcIdaIsPortListeningResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaQueryProfileResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaQueryProfileResult?
  get() = if (hasDcIdaQueryProfileResult()) getDcIdaQueryProfileResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcGdcDaControlResultOrNull: com.dogu.protocol.generated.inner.types.CfGdcDa.CfGdcDaControlResult?
  get() = if (hasDcGdcDaControlResult()) getDcGdcDaControlResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaSwitchInputBlockResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaSwitchInputBlockResult?
  get() = if (hasDcIdaSwitchInputBlockResult()) getDcIdaSwitchInputBlockResult() else null

val com.dogu.protocol.generated.inner.params.DcIda.DcIdaResultOrBuilder.dcIdaQueryAlertResultOrNull: com.dogu.protocol.generated.inner.types.DcIda.DcIdaQueryAlertResult?
  get() = if (hasDcIdaQueryAlertResult()) getDcIdaQueryAlertResult() else null

