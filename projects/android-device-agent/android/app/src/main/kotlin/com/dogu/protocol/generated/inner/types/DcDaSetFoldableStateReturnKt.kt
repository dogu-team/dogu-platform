//Generated by the protocol buffer compiler. DO NOT EDIT!
// source: inner/types/dc_da.proto

package com.dogu.protocol.generated.inner.types;

@kotlin.jvm.JvmName("-initializedcDaSetFoldableStateReturn")
inline fun dcDaSetFoldableStateReturn(block: com.dogu.protocol.generated.inner.types.DcDaSetFoldableStateReturnKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn =
  com.dogu.protocol.generated.inner.types.DcDaSetFoldableStateReturnKt.Dsl._create(com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn.newBuilder()).apply { block() }._build()
object DcDaSetFoldableStateReturnKt {
  @kotlin.OptIn(com.google.protobuf.kotlin.OnlyForUseByGeneratedProtoCode::class)
  @com.google.protobuf.kotlin.ProtoDslMarker
  class Dsl private constructor(
    private val _builder: com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn.Builder
  ) {
    companion object {
      @kotlin.jvm.JvmSynthetic
      @kotlin.PublishedApi
      internal fun _create(builder: com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn.Builder): Dsl = Dsl(builder)
    }

    @kotlin.jvm.JvmSynthetic
    @kotlin.PublishedApi
    internal fun _build(): com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn = _builder.build()

    /**
     * <code>.outer.ErrorResult error = 1;</code>
     */
    var error: com.dogu.protocol.generated.outer.Errors.ErrorResult
      @JvmName("getError")
      get() = _builder.getError()
      @JvmName("setError")
      set(value) {
        _builder.setError(value)
      }
    /**
     * <code>.outer.ErrorResult error = 1;</code>
     */
    fun clearError() {
      _builder.clearError()
    }
    /**
     * <code>.outer.ErrorResult error = 1;</code>
     * @return Whether the error field is set.
     */
    fun hasError(): kotlin.Boolean {
      return _builder.hasError()
    }
  }
}
@kotlin.jvm.JvmSynthetic
inline fun com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn.copy(block: com.dogu.protocol.generated.inner.types.DcDaSetFoldableStateReturnKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturn =
  com.dogu.protocol.generated.inner.types.DcDaSetFoldableStateReturnKt.Dsl._create(this.toBuilder()).apply { block() }._build()

val com.dogu.protocol.generated.inner.types.DcDa.DcDaSetFoldableStateReturnOrBuilder.errorOrNull: com.dogu.protocol.generated.outer.Errors.ErrorResult?
  get() = if (hasError()) getError() else null

