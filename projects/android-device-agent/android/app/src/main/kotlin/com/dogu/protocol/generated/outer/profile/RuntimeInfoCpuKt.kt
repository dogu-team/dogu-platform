//Generated by the protocol buffer compiler. DO NOT EDIT!
// source: outer/profile/runtime_info.proto

package com.dogu.protocol.generated.outer.profile;

@kotlin.jvm.JvmName("-initializeruntimeInfoCpu")
inline fun runtimeInfoCpu(block: com.dogu.protocol.generated.outer.profile.RuntimeInfoCpuKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu =
  com.dogu.protocol.generated.outer.profile.RuntimeInfoCpuKt.Dsl._create(com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu.newBuilder()).apply { block() }._build()
object RuntimeInfoCpuKt {
  @kotlin.OptIn(com.google.protobuf.kotlin.OnlyForUseByGeneratedProtoCode::class)
  @com.google.protobuf.kotlin.ProtoDslMarker
  class Dsl private constructor(
    private val _builder: com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu.Builder
  ) {
    companion object {
      @kotlin.jvm.JvmSynthetic
      @kotlin.PublishedApi
      internal fun _create(builder: com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu.Builder): Dsl = Dsl(builder)
    }

    @kotlin.jvm.JvmSynthetic
    @kotlin.PublishedApi
    internal fun _build(): com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu = _builder.build()

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
     * <code>fixed64 current_load = 2;</code>
     */
    var currentLoad: kotlin.Long
      @JvmName("getCurrentLoad")
      get() = _builder.getCurrentLoad()
      @JvmName("setCurrentLoad")
      set(value) {
        _builder.setCurrentLoad(value)
      }
    /**
     * <code>fixed64 current_load = 2;</code>
     */
    fun clearCurrentLoad() {
      _builder.clearCurrentLoad()
    }

    /**
     * <code>fixed64 current_load_user = 3;</code>
     */
    var currentLoadUser: kotlin.Long
      @JvmName("getCurrentLoadUser")
      get() = _builder.getCurrentLoadUser()
      @JvmName("setCurrentLoadUser")
      set(value) {
        _builder.setCurrentLoadUser(value)
      }
    /**
     * <code>fixed64 current_load_user = 3;</code>
     */
    fun clearCurrentLoadUser() {
      _builder.clearCurrentLoadUser()
    }

    /**
     * <code>fixed64 current_load_system = 4;</code>
     */
    var currentLoadSystem: kotlin.Long
      @JvmName("getCurrentLoadSystem")
      get() = _builder.getCurrentLoadSystem()
      @JvmName("setCurrentLoadSystem")
      set(value) {
        _builder.setCurrentLoadSystem(value)
      }
    /**
     * <code>fixed64 current_load_system = 4;</code>
     */
    fun clearCurrentLoadSystem() {
      _builder.clearCurrentLoadSystem()
    }

    /**
     * <code>fixed64 current_load_nice = 5;</code>
     */
    var currentLoadNice: kotlin.Long
      @JvmName("getCurrentLoadNice")
      get() = _builder.getCurrentLoadNice()
      @JvmName("setCurrentLoadNice")
      set(value) {
        _builder.setCurrentLoadNice(value)
      }
    /**
     * <code>fixed64 current_load_nice = 5;</code>
     */
    fun clearCurrentLoadNice() {
      _builder.clearCurrentLoadNice()
    }

    /**
     * <code>fixed64 current_load_idle = 6;</code>
     */
    var currentLoadIdle: kotlin.Long
      @JvmName("getCurrentLoadIdle")
      get() = _builder.getCurrentLoadIdle()
      @JvmName("setCurrentLoadIdle")
      set(value) {
        _builder.setCurrentLoadIdle(value)
      }
    /**
     * <code>fixed64 current_load_idle = 6;</code>
     */
    fun clearCurrentLoadIdle() {
      _builder.clearCurrentLoadIdle()
    }

    /**
     * <code>fixed64 current_load_irq = 7;</code>
     */
    var currentLoadIrq: kotlin.Long
      @JvmName("getCurrentLoadIrq")
      get() = _builder.getCurrentLoadIrq()
      @JvmName("setCurrentLoadIrq")
      set(value) {
        _builder.setCurrentLoadIrq(value)
      }
    /**
     * <code>fixed64 current_load_irq = 7;</code>
     */
    fun clearCurrentLoadIrq() {
      _builder.clearCurrentLoadIrq()
    }

    /**
     * <code>fixed64 current_load_cpu = 8;</code>
     */
    var currentLoadCpu: kotlin.Long
      @JvmName("getCurrentLoadCpu")
      get() = _builder.getCurrentLoadCpu()
      @JvmName("setCurrentLoadCpu")
      set(value) {
        _builder.setCurrentLoadCpu(value)
      }
    /**
     * <code>fixed64 current_load_cpu = 8;</code>
     */
    fun clearCurrentLoadCpu() {
      _builder.clearCurrentLoadCpu()
    }
  }
}
@kotlin.jvm.JvmSynthetic
inline fun com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu.copy(block: com.dogu.protocol.generated.outer.profile.RuntimeInfoCpuKt.Dsl.() -> kotlin.Unit): com.dogu.protocol.generated.outer.profile.RuntimeInfoOuterClass.RuntimeInfoCpu =
  com.dogu.protocol.generated.outer.profile.RuntimeInfoCpuKt.Dsl._create(this.toBuilder()).apply { block() }._build()

