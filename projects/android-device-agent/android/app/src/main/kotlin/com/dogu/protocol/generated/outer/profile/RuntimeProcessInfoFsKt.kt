//Generated by the protocol buffer compiler. DO NOT EDIT!
// source: outer/profile/runtime_process_info.proto

package com.dogu.protocol.generated.outer.profile;

@kotlin.jvm.JvmName("-initializeruntimeProcessInfoFs")
inline fun runtimeProcessInfoFs(block: com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoFsKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs =
  com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoFsKt.Dsl._create(com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs.newBuilder()).apply { block() }._build()
object RuntimeProcessInfoFsKt {
  @kotlin.OptIn(com.google.protobuf.kotlin.OnlyForUseByGeneratedProtoCode::class)
  @com.google.protobuf.kotlin.ProtoDslMarker
  class Dsl private constructor(
    private val _builder: com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs.Builder
  ) {
    companion object {
      @kotlin.jvm.JvmSynthetic
      @kotlin.PublishedApi
      internal fun _create(builder: com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs.Builder): Dsl = Dsl(builder)
    }

    @kotlin.jvm.JvmSynthetic
    @kotlin.PublishedApi
    internal fun _build(): com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs = _builder.build()

    /**
     * <code>string name = 1;</code>
     */
    var name: kotlin.String
      @JvmName("getName")
      get() = _builder.getName()
      @JvmName("setName")
      set(value) {
        _builder.setName(value)
      }
    /**
     * <code>string name = 1;</code>
     */
    fun clearName() {
      _builder.clearName()
    }

    /**
     * <code>fixed64 write_bytes = 2;</code>
     */
    var writeBytes: kotlin.Long
      @JvmName("getWriteBytes")
      get() = _builder.getWriteBytes()
      @JvmName("setWriteBytes")
      set(value) {
        _builder.setWriteBytes(value)
      }
    /**
     * <code>fixed64 write_bytes = 2;</code>
     */
    fun clearWriteBytes() {
      _builder.clearWriteBytes()
    }

    /**
     * <code>fixed64 read_bytes = 3;</code>
     */
    var readBytes: kotlin.Long
      @JvmName("getReadBytes")
      get() = _builder.getReadBytes()
      @JvmName("setReadBytes")
      set(value) {
        _builder.setReadBytes(value)
      }
    /**
     * <code>fixed64 read_bytes = 3;</code>
     */
    fun clearReadBytes() {
      _builder.clearReadBytes()
    }
  }
}
@kotlin.jvm.JvmSynthetic
inline fun com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs.copy(block: com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoFsKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoOuterClass.RuntimeProcessInfoFs =
  com.dogu.protocol.generated.outer.profile.RuntimeProcessInfoFsKt.Dsl._create(this.toBuilder()).apply { block() }._build()

