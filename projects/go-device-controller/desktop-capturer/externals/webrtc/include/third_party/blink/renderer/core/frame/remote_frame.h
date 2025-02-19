// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef THIRD_PARTY_BLINK_RENDERER_CORE_FRAME_REMOTE_FRAME_H_
#define THIRD_PARTY_BLINK_RENDERER_CORE_FRAME_REMOTE_FRAME_H_

#include "components/viz/common/surfaces/parent_local_surface_id_allocator.h"
#include "mojo/public/cpp/bindings/associated_receiver.h"
#include "mojo/public/cpp/bindings/associated_remote.h"
#include "services/network/public/mojom/web_sandbox_flags.mojom-blink-forward.h"
#include "third_party/blink/public/common/frame/frame_visual_properties.h"
#include "third_party/blink/public/mojom/frame/frame.mojom-blink.h"
#include "third_party/blink/public/mojom/frame/frame_owner_properties.mojom-blink-forward.h"
#include "third_party/blink/public/mojom/input/focus_type.mojom-blink-forward.h"
#include "third_party/blink/public/mojom/scroll/scroll_into_view_params.mojom-blink.h"
#include "third_party/blink/public/mojom/security_context/insecure_request_policy.mojom-blink-forward.h"
#include "third_party/blink/renderer/core/core_export.h"
#include "third_party/blink/renderer/core/execution_context/remote_security_context.h"
#include "third_party/blink/renderer/core/frame/child_frame_compositor.h"
#include "third_party/blink/renderer/core/frame/frame.h"
#include "third_party/blink/renderer/core/frame/remote_frame_view.h"
#include "third_party/blink/renderer/platform/wtf/casting.h"

namespace cc {
class Layer;
}

namespace viz {
class FrameSinkId;
}

namespace blink {

class AssociatedInterfaceProvider;
class ChildFrameCompositingHelper;
class InterfaceRegistry;
class LocalFrame;
class RemoteFrameClient;
class WebFrameWidget;

struct BlinkTransferableMessage;
struct FrameLoadRequest;

// A RemoteFrame is a frame that is possibly hosted outside this process.
class CORE_EXPORT RemoteFrame final : public Frame,
                                      public ChildFrameCompositor,
                                      public mojom::blink::RemoteMainFrame,
                                      public mojom::blink::RemoteFrame {
 public:
  // Returns the RemoteFrame for the given |frame_token|.
  static RemoteFrame* FromFrameToken(const RemoteFrameToken& frame_token);

  // For a description of |inheriting_agent_factory| go see the comment on the
  // Frame constructor.
  RemoteFrame(RemoteFrameClient*,
              Page&,
              FrameOwner*,
              Frame* parent,
              Frame* previous_sibling,
              FrameInsertType insert_type,
              const RemoteFrameToken& frame_token,
              WindowAgentFactory* inheriting_agent_factory,
              InterfaceRegistry*,
              AssociatedInterfaceProvider*,
              WebFrameWidget* ancestor_widget,
              const base::UnguessableToken& devtools_frame_token);
  ~RemoteFrame() override;

  // Frame overrides:
  void Trace(Visitor*) const override;
  void Navigate(FrameLoadRequest&, WebFrameLoadType) override;
  const RemoteSecurityContext* GetSecurityContext() const override;
  bool DetachDocument() override;
  void CheckCompleted() override;
  bool ShouldClose() override;
  void HookBackForwardCacheEviction() override {}
  void RemoveBackForwardCacheEviction() override {}
  void SetTextDirection(base::i18n::TextDirection) override {}
  void SetIsInert(bool) override;
  void SetInheritedEffectiveTouchAction(TouchAction) override;
  bool BubbleLogicalScrollFromChildFrame(
      mojom::blink::ScrollDirection direction,
      ui::ScrollGranularity granularity,
      Frame* child) override;
  void DidFocus() override;
  void AddResourceTimingFromChild(
      mojom::blink::ResourceTimingInfoPtr timing) override;
  bool IsAdSubframe() const override;

  // ChildFrameCompositor:
  const scoped_refptr<cc::Layer>& GetCcLayer() override;

  void AdvanceFocus(mojom::blink::FocusType, LocalFrame* source);

  void SetView(RemoteFrameView*);
  void CreateView();

  void ForwardPostMessage(
      BlinkTransferableMessage,
      LocalFrame* source_frame,
      scoped_refptr<const SecurityOrigin> source_security_origin,
      scoped_refptr<const SecurityOrigin> target_security_origin);

  mojom::blink::RemoteFrameHost& GetRemoteFrameHostRemote();

  RemoteFrameView* View() const override;

  RemoteFrameClient* Client() const;

  bool IsIgnoredForHitTest() const;

  void DidChangeVisibleToHitTesting() override;

  void SetReplicatedPermissionsPolicyHeader(
      const ParsedPermissionsPolicy& parsed_header);

  void SetReplicatedSandboxFlags(network::mojom::blink::WebSandboxFlags);
  void SetInsecureRequestPolicy(mojom::blink::InsecureRequestPolicy);
  void SetInsecureNavigationsSet(const WebVector<unsigned>&);
  void FrameRectsChanged(const gfx::Rect& local_frame_rect,
                         const gfx::Rect& screen_space_rect);
  void InitializeFrameVisualProperties(const FrameVisualProperties& properties);
  // If 'propagate' is true, updated properties will be sent to the browser.
  // Returns true if visual properties have changed.
  bool SynchronizeVisualProperties(bool propagate = true);
  void ResendVisualProperties();
  void SetViewportIntersection(const mojom::blink::ViewportIntersectionState&);
  void UpdateCompositedLayerBounds();

  // Called when the local root's screen infos change.
  void DidChangeScreenInfos(const display::ScreenInfos& screen_info);
  // Called when the main frame's zoom level is changed and should be propagated
  // to the remote's associated view.
  void ZoomLevelChanged(double zoom_level);
  // Called when the local root's window segments change.
  void DidChangeRootWindowSegments(
      const std::vector<gfx::Rect>& root_widget_window_segments);
  // Called when the local page scale factor changed.
  void PageScaleFactorChanged(float page_scale_factor,
                              bool is_pinch_gesture_active);
  // Called when the local root's visible viewport changes size.
  void DidChangeVisibleViewportSize(const gfx::Size& visible_viewport_size);
  // Called when the local root's capture sequence number has changed.
  void UpdateCaptureSequenceNumber(uint32_t sequence_number);

  const String& UniqueName() const { return unique_name_; }
  const FrameVisualProperties& GetPendingVisualPropertiesForTesting() const {
    return pending_visual_properties_;
  }

  // blink::mojom::RemoteFrame overrides:
  void WillEnterFullscreen(mojom::blink::FullscreenOptionsPtr) override;
  void EnforceInsecureNavigationsSet(const WTF::Vector<uint32_t>& set) override;
  void SetFrameOwnerProperties(
      mojom::blink::FrameOwnerPropertiesPtr properties) override;
  void EnforceInsecureRequestPolicy(
      mojom::blink::InsecureRequestPolicy policy) override;
  void SetReplicatedOrigin(
      const scoped_refptr<const SecurityOrigin>& origin,
      bool is_potentially_trustworthy_unique_origin) override;
  void SetReplicatedIsAdSubframe(bool is_ad_subframe) override;
  void SetReplicatedName(const String& name,
                         const String& unique_name) override;
  void DispatchLoadEventForFrameOwner() override;
  void Collapse(bool collapsed) final;
  void Focus() override;
  void SetHadStickyUserActivationBeforeNavigation(bool value) override;
  void SetNeedsOcclusionTracking(bool needs_tracking) override;
  void BubbleLogicalScroll(mojom::blink::ScrollDirection direction,
                           ui::ScrollGranularity granularity) override;
  void UpdateUserActivationState(
      mojom::blink::UserActivationUpdateType update_type,
      mojom::blink::UserActivationNotificationType notification_type) override;
  void SetEmbeddingToken(
      const base::UnguessableToken& embedding_token) override;
  void SetPageFocus(bool is_focused) override;
  void RenderFallbackContent() override;
  void RenderFallbackContentWithResourceTiming(
      mojom::blink::ResourceTimingInfoPtr timing,
      const String& server_timing_values) final;
  void ScrollRectToVisible(
      const gfx::Rect& rect_to_scroll,
      mojom::blink::ScrollIntoViewParamsPtr params) override;
  void DidStartLoading() override;
  void DidStopLoading() override;
  void IntrinsicSizingInfoOfChildChanged(
      mojom::blink::IntrinsicSizingInfoPtr sizing_info) override;
  void DidSetFramePolicyHeaders(
      network::mojom::blink::WebSandboxFlags,
      const WTF::Vector<ParsedPermissionsPolicyDeclaration>&) override;
  // Updates the snapshotted policy attributes (sandbox flags and permissions
  // policy container policy) in the frame's FrameOwner. This is used when this
  // frame's parent is in another process and it dynamically updates this
  // frame's sandbox flags or container policy. The new policy won't take effect
  // until the next navigation.
  void DidUpdateFramePolicy(const FramePolicy& frame_policy) override;
  void UpdateOpener(
      const absl::optional<blink::FrameToken>& opener_frame_token) override;
  void DetachAndDispose() override;
  void EnableAutoResize(const gfx::Size& min_size,
                        const gfx::Size& max_size) override;
  void DisableAutoResize() override;
  void DidUpdateVisualProperties(
      const cc::RenderFrameMetadata& metadata) override;
  void SetFrameSinkId(const viz::FrameSinkId& frame_sink_id) override;
  void ChildProcessGone() override;

  // Called only when this frame has a local frame owner.
  gfx::Size GetMainFrameViewportSize() const override;
  gfx::Point GetMainFrameScrollOffset() const override;

  void SetOpener(Frame* opener) override;

  // blink::mojom::RemoteMainFrame overrides:
  //
  // Use to transfer TextAutosizer state from the local main frame renderer to
  // remote main frame renderers.
  void UpdateTextAutosizerPageInfo(
      mojom::blink::TextAutosizerPageInfoPtr page_info) override;

  // Indicate that this frame was attached as a MainFrame.
  void WasAttachedAsRemoteMainFrame(
      mojo::PendingAssociatedReceiver<mojom::blink::RemoteMainFrame>
          main_frame);

  RemoteFrameToken GetRemoteFrameToken() const {
    return GetFrameToken().GetAs<RemoteFrameToken>();
  }

  const viz::LocalSurfaceId& GetLocalSurfaceId() const;

  viz::FrameSinkId GetFrameSinkId();

  void SetCcLayerForTesting(scoped_refptr<cc::Layer>, bool is_surface_layer);

  // Whether a navigation should replace the current history entry or not.
  bool NavigationShouldReplaceCurrentHistoryEntry(
      WebFrameLoadType frame_load_type) const;

 private:
  // Frame protected overrides:
  bool DetachImpl(FrameDetachType type) override;

  // ChildFrameCompositor:
  void SetCcLayer(scoped_refptr<cc::Layer> layer,
                  bool is_surface_layer) override;
  SkBitmap* GetSadPageBitmap() override;

  // Intentionally private to prevent redundant checks when the type is
  // already RemoteFrame.
  bool IsLocalFrame() const override { return false; }
  bool IsRemoteFrame() const override { return true; }

  // Returns false if detaching child frames reentrantly detached `this`.
  bool DetachChildren();
  void ApplyReplicatedPermissionsPolicyHeader();
  void RecordSentVisualProperties();

  static void BindToReceiver(
      RemoteFrame* frame,
      mojo::PendingAssociatedReceiver<mojom::blink::RemoteFrame> receiver);

  Member<RemoteFrameView> view_;
  RemoteSecurityContext security_context_;
  absl::optional<blink::FrameVisualProperties> sent_visual_properties_;
  blink::FrameVisualProperties pending_visual_properties_;
  scoped_refptr<cc::Layer> cc_layer_;
  bool is_surface_layer_ = false;
  ParsedPermissionsPolicy permissions_policy_header_;
  String unique_name_;

  viz::FrameSinkId frame_sink_id_;
  std::unique_ptr<viz::ParentLocalSurfaceIdAllocator>
      parent_local_surface_id_allocator_;

  // The WebFrameWidget of the nearest ancestor local root. If the proxy has no
  // local root ancestor (eg it is a proxy of the root frame) then the pointer
  // is null.
  WebFrameWidget* ancestor_widget_;

  InterfaceRegistry* const interface_registry_;

  // True when the process rendering the child's frame contents has terminated
  // and ChildProcessGone() is called.
  bool remote_process_gone_ = false;

  // Will be nullptr when this RemoteFrame's parent is not a LocalFrame.
  std::unique_ptr<ChildFrameCompositingHelper> compositing_helper_;

  // Whether the frame is considered to be an ad subframe by Ad Tagging.
  bool is_ad_subframe_;

  mojo::AssociatedRemote<mojom::blink::RemoteFrameHost>
      remote_frame_host_remote_;
  mojo::AssociatedReceiver<mojom::blink::RemoteFrame> receiver_{this};
  mojo::AssociatedReceiver<mojom::blink::RemoteMainFrame> main_frame_receiver_{
      this};
  scoped_refptr<base::SingleThreadTaskRunner> task_runner_;
};

inline RemoteFrameView* RemoteFrame::View() const {
  return view_.Get();
}

template <>
struct DowncastTraits<RemoteFrame> {
  static bool AllowFrom(const Frame& frame) { return frame.IsRemoteFrame(); }
};

}  // namespace blink

#endif  // THIRD_PARTY_BLINK_RENDERER_CORE_FRAME_REMOTE_FRAME_H_
