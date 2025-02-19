package device

import (
	"go-device-controller/types/protocol/generated/proto/inner/types"
	"go-device-controller/types/protocol/generated/proto/outer"

	"go-device-controller/internal/pkg/device/datachannel"
	"go-device-controller/internal/pkg/device/robot"
	"go-device-controller/internal/pkg/device/surface"
	"go-device-controller/internal/pkg/structs"
)

type linuxDevice struct {
	context            *types.DcGdcDeviceContext
	surfaces           surface.Surfaces
	datachannelDemuxer datachannel.ControlDatachannelDemuxer
}

var _ld device = &linuxDevice{}

func newLinuxDevice(context *types.DcGdcDeviceContext) (device, error) {
	d := linuxDevice{}
	d.context = context

	surfaceSourceFactory := func() surface.SurfaceSource {
		return surface.NewDesktopLibwebrtcSurfaceSource()
	}
	surfaceFactory := func(conn *surface.Surface, surfaceType surface.SurfaceType, screenId surface.ScreenId, pid surface.Pid) {
		surface.NewSurface(conn, context.Serial, outer.Platform_PLATFORM_LINUX, surfaceType, screenId, pid, surfaceSourceFactory)
	}
	surface.NewSurfaces(&d.surfaces, context.Serial, outer.Platform_PLATFORM_LINUX, surfaceFactory)

	datachannel.NewDatachannelDemuxer(&d.datachannelDemuxer,
		[]datachannel.DatachannelHandler{
			robot.NewDesktopControlHandler(outer.Platform_PLATFORM_LINUX),
		}, true)

	return &d, nil
}

func (d *linuxDevice) Context() *types.DcGdcDeviceContext {
	return d.context
}

func (d *linuxDevice) UpdateUrl(screenUrl string, inputUrl string) {
}

func (d *linuxDevice) Surfaces() *surface.Surfaces {
	return &d.surfaces
}

func (d *linuxDevice) OnDataChannel(ctx *structs.DatachannelContext) error {
	return d.datachannelDemuxer.OnDataChannel(ctx)
}

func (d *linuxDevice) ReconnectControlSession() error {
	return d.datachannelDemuxer.Reconnect()
}

func (d *linuxDevice) OnMessageFromPeer(data []byte) error {
	return d.datachannelDemuxer.OnMessage(data)
}
