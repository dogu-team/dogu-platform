// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.7
// source: outer/device_server.proto

package outer

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	structpb "google.golang.org/protobuf/types/known/structpb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type DeviceHostUploadFileStartSendValue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	FileName string `protobuf:"bytes,1,opt,name=file_name,json=fileName,proto3" json:"file_name,omitempty"`
	FileSize uint32 `protobuf:"fixed32,2,opt,name=file_size,json=fileSize,proto3" json:"file_size,omitempty"`
}

func (x *DeviceHostUploadFileStartSendValue) Reset() {
	*x = DeviceHostUploadFileStartSendValue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileStartSendValue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileStartSendValue) ProtoMessage() {}

func (x *DeviceHostUploadFileStartSendValue) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileStartSendValue.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileStartSendValue) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{0}
}

func (x *DeviceHostUploadFileStartSendValue) GetFileName() string {
	if x != nil {
		return x.FileName
	}
	return ""
}

func (x *DeviceHostUploadFileStartSendValue) GetFileSize() uint32 {
	if x != nil {
		return x.FileSize
	}
	return 0
}

type DeviceHostUploadFileInProgressSendValue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Chunk []byte `protobuf:"bytes,1,opt,name=chunk,proto3" json:"chunk,omitempty"`
}

func (x *DeviceHostUploadFileInProgressSendValue) Reset() {
	*x = DeviceHostUploadFileInProgressSendValue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileInProgressSendValue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileInProgressSendValue) ProtoMessage() {}

func (x *DeviceHostUploadFileInProgressSendValue) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileInProgressSendValue.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileInProgressSendValue) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{1}
}

func (x *DeviceHostUploadFileInProgressSendValue) GetChunk() []byte {
	if x != nil {
		return x.Chunk
	}
	return nil
}

type DeviceHostUploadFileCompleteSendValue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DeviceHostUploadFileCompleteSendValue) Reset() {
	*x = DeviceHostUploadFileCompleteSendValue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileCompleteSendValue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileCompleteSendValue) ProtoMessage() {}

func (x *DeviceHostUploadFileCompleteSendValue) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileCompleteSendValue.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileCompleteSendValue) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{2}
}

type DeviceHostUploadFileSendMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Value:
	//	*DeviceHostUploadFileSendMessage_Start
	//	*DeviceHostUploadFileSendMessage_InProgress
	//	*DeviceHostUploadFileSendMessage_Complete
	Value isDeviceHostUploadFileSendMessage_Value `protobuf_oneof:"value"`
}

func (x *DeviceHostUploadFileSendMessage) Reset() {
	*x = DeviceHostUploadFileSendMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileSendMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileSendMessage) ProtoMessage() {}

func (x *DeviceHostUploadFileSendMessage) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileSendMessage.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileSendMessage) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{3}
}

func (m *DeviceHostUploadFileSendMessage) GetValue() isDeviceHostUploadFileSendMessage_Value {
	if m != nil {
		return m.Value
	}
	return nil
}

func (x *DeviceHostUploadFileSendMessage) GetStart() *DeviceHostUploadFileStartSendValue {
	if x, ok := x.GetValue().(*DeviceHostUploadFileSendMessage_Start); ok {
		return x.Start
	}
	return nil
}

func (x *DeviceHostUploadFileSendMessage) GetInProgress() *DeviceHostUploadFileInProgressSendValue {
	if x, ok := x.GetValue().(*DeviceHostUploadFileSendMessage_InProgress); ok {
		return x.InProgress
	}
	return nil
}

func (x *DeviceHostUploadFileSendMessage) GetComplete() *DeviceHostUploadFileCompleteSendValue {
	if x, ok := x.GetValue().(*DeviceHostUploadFileSendMessage_Complete); ok {
		return x.Complete
	}
	return nil
}

type isDeviceHostUploadFileSendMessage_Value interface {
	isDeviceHostUploadFileSendMessage_Value()
}

type DeviceHostUploadFileSendMessage_Start struct {
	Start *DeviceHostUploadFileStartSendValue `protobuf:"bytes,1,opt,name=start,proto3,oneof"`
}

type DeviceHostUploadFileSendMessage_InProgress struct {
	InProgress *DeviceHostUploadFileInProgressSendValue `protobuf:"bytes,2,opt,name=in_progress,json=inProgress,proto3,oneof"`
}

type DeviceHostUploadFileSendMessage_Complete struct {
	Complete *DeviceHostUploadFileCompleteSendValue `protobuf:"bytes,3,opt,name=complete,proto3,oneof"`
}

func (*DeviceHostUploadFileSendMessage_Start) isDeviceHostUploadFileSendMessage_Value() {}

func (*DeviceHostUploadFileSendMessage_InProgress) isDeviceHostUploadFileSendMessage_Value() {}

func (*DeviceHostUploadFileSendMessage_Complete) isDeviceHostUploadFileSendMessage_Value() {}

type DeviceHostUploadFileInProgressReceiveValue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Offset uint32 `protobuf:"fixed32,1,opt,name=offset,proto3" json:"offset,omitempty"`
}

func (x *DeviceHostUploadFileInProgressReceiveValue) Reset() {
	*x = DeviceHostUploadFileInProgressReceiveValue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileInProgressReceiveValue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileInProgressReceiveValue) ProtoMessage() {}

func (x *DeviceHostUploadFileInProgressReceiveValue) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileInProgressReceiveValue.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileInProgressReceiveValue) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{4}
}

func (x *DeviceHostUploadFileInProgressReceiveValue) GetOffset() uint32 {
	if x != nil {
		return x.Offset
	}
	return 0
}

type DeviceHostUploadFileCompleteReceiveValue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	FilePath string `protobuf:"bytes,1,opt,name=file_path,json=filePath,proto3" json:"file_path,omitempty"`
}

func (x *DeviceHostUploadFileCompleteReceiveValue) Reset() {
	*x = DeviceHostUploadFileCompleteReceiveValue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileCompleteReceiveValue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileCompleteReceiveValue) ProtoMessage() {}

func (x *DeviceHostUploadFileCompleteReceiveValue) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileCompleteReceiveValue.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileCompleteReceiveValue) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{5}
}

func (x *DeviceHostUploadFileCompleteReceiveValue) GetFilePath() string {
	if x != nil {
		return x.FilePath
	}
	return ""
}

type DeviceHostUploadFileReceiveMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Value:
	//	*DeviceHostUploadFileReceiveMessage_InProgress
	//	*DeviceHostUploadFileReceiveMessage_Complete
	Value isDeviceHostUploadFileReceiveMessage_Value `protobuf_oneof:"value"`
}

func (x *DeviceHostUploadFileReceiveMessage) Reset() {
	*x = DeviceHostUploadFileReceiveMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceHostUploadFileReceiveMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceHostUploadFileReceiveMessage) ProtoMessage() {}

func (x *DeviceHostUploadFileReceiveMessage) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceHostUploadFileReceiveMessage.ProtoReflect.Descriptor instead.
func (*DeviceHostUploadFileReceiveMessage) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{6}
}

func (m *DeviceHostUploadFileReceiveMessage) GetValue() isDeviceHostUploadFileReceiveMessage_Value {
	if m != nil {
		return m.Value
	}
	return nil
}

func (x *DeviceHostUploadFileReceiveMessage) GetInProgress() *DeviceHostUploadFileInProgressReceiveValue {
	if x, ok := x.GetValue().(*DeviceHostUploadFileReceiveMessage_InProgress); ok {
		return x.InProgress
	}
	return nil
}

func (x *DeviceHostUploadFileReceiveMessage) GetComplete() *DeviceHostUploadFileCompleteReceiveValue {
	if x, ok := x.GetValue().(*DeviceHostUploadFileReceiveMessage_Complete); ok {
		return x.Complete
	}
	return nil
}

type isDeviceHostUploadFileReceiveMessage_Value interface {
	isDeviceHostUploadFileReceiveMessage_Value()
}

type DeviceHostUploadFileReceiveMessage_InProgress struct {
	InProgress *DeviceHostUploadFileInProgressReceiveValue `protobuf:"bytes,1,opt,name=in_progress,json=inProgress,proto3,oneof"`
}

type DeviceHostUploadFileReceiveMessage_Complete struct {
	Complete *DeviceHostUploadFileCompleteReceiveValue `protobuf:"bytes,2,opt,name=complete,proto3,oneof"`
}

func (*DeviceHostUploadFileReceiveMessage_InProgress) isDeviceHostUploadFileReceiveMessage_Value() {}

func (*DeviceHostUploadFileReceiveMessage_Complete) isDeviceHostUploadFileReceiveMessage_Value() {}

type DeviceServerResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Value:
	//	*DeviceServerResponse_Error
	//	*DeviceServerResponse_Data
	Value isDeviceServerResponse_Value `protobuf_oneof:"value"`
}

func (x *DeviceServerResponse) Reset() {
	*x = DeviceServerResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_outer_device_server_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceServerResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceServerResponse) ProtoMessage() {}

func (x *DeviceServerResponse) ProtoReflect() protoreflect.Message {
	mi := &file_outer_device_server_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceServerResponse.ProtoReflect.Descriptor instead.
func (*DeviceServerResponse) Descriptor() ([]byte, []int) {
	return file_outer_device_server_proto_rawDescGZIP(), []int{7}
}

func (m *DeviceServerResponse) GetValue() isDeviceServerResponse_Value {
	if m != nil {
		return m.Value
	}
	return nil
}

func (x *DeviceServerResponse) GetError() *ErrorResult {
	if x, ok := x.GetValue().(*DeviceServerResponse_Error); ok {
		return x.Error
	}
	return nil
}

func (x *DeviceServerResponse) GetData() *structpb.Struct {
	if x, ok := x.GetValue().(*DeviceServerResponse_Data); ok {
		return x.Data
	}
	return nil
}

type isDeviceServerResponse_Value interface {
	isDeviceServerResponse_Value()
}

type DeviceServerResponse_Error struct {
	Error *ErrorResult `protobuf:"bytes,1,opt,name=error,proto3,oneof"`
}

type DeviceServerResponse_Data struct {
	Data *structpb.Struct `protobuf:"bytes,2,opt,name=data,proto3,oneof"`
}

func (*DeviceServerResponse_Error) isDeviceServerResponse_Value() {}

func (*DeviceServerResponse_Data) isDeviceServerResponse_Value() {}

var File_outer_device_server_proto protoreflect.FileDescriptor

var file_outer_device_server_proto_rawDesc = []byte{
	0x0a, 0x19, 0x6f, 0x75, 0x74, 0x65, 0x72, 0x2f, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x5f, 0x73,
	0x65, 0x72, 0x76, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x6f, 0x75, 0x74,
	0x65, 0x72, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2f, 0x73, 0x74, 0x72, 0x75, 0x63, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x12, 0x6f, 0x75, 0x74, 0x65, 0x72, 0x2f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x73, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0x5e, 0x0a, 0x22, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f,
	0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x53, 0x74, 0x61, 0x72,
	0x74, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x66, 0x69,
	0x6c, 0x65, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x66,
	0x69, 0x6c, 0x65, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x66, 0x69, 0x6c, 0x65, 0x5f,
	0x73, 0x69, 0x7a, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x07, 0x52, 0x08, 0x66, 0x69, 0x6c, 0x65,
	0x53, 0x69, 0x7a, 0x65, 0x22, 0x3f, 0x0a, 0x27, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f,
	0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x49, 0x6e, 0x50, 0x72,
	0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12,
	0x14, 0x0a, 0x05, 0x63, 0x68, 0x75, 0x6e, 0x6b, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x05,
	0x63, 0x68, 0x75, 0x6e, 0x6b, 0x22, 0x27, 0x0a, 0x25, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48,
	0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x43, 0x6f, 0x6d,
	0x70, 0x6c, 0x65, 0x74, 0x65, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x8c,
	0x02, 0x0a, 0x1f, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c,
	0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x12, 0x41, 0x0a, 0x05, 0x73, 0x74, 0x61, 0x72, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x29, 0x2e, 0x6f, 0x75, 0x74, 0x65, 0x72, 0x2e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65,
	0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x53, 0x74,
	0x61, 0x72, 0x74, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x05,
	0x73, 0x74, 0x61, 0x72, 0x74, 0x12, 0x51, 0x0a, 0x0b, 0x69, 0x6e, 0x5f, 0x70, 0x72, 0x6f, 0x67,
	0x72, 0x65, 0x73, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x2e, 0x2e, 0x6f, 0x75, 0x74,
	0x65, 0x72, 0x2e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c,
	0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x49, 0x6e, 0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73,
	0x73, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x69, 0x6e,
	0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x12, 0x4a, 0x0a, 0x08, 0x63, 0x6f, 0x6d, 0x70,
	0x6c, 0x65, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x2c, 0x2e, 0x6f, 0x75, 0x74,
	0x65, 0x72, 0x2e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c,
	0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x43, 0x6f, 0x6d, 0x70, 0x6c, 0x65, 0x74, 0x65, 0x53,
	0x65, 0x6e, 0x64, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x08, 0x63, 0x6f, 0x6d, 0x70,
	0x6c, 0x65, 0x74, 0x65, 0x42, 0x07, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x44, 0x0a,
	0x2a, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61,
	0x64, 0x46, 0x69, 0x6c, 0x65, 0x49, 0x6e, 0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x6f,
	0x66, 0x66, 0x73, 0x65, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x07, 0x52, 0x06, 0x6f, 0x66, 0x66,
	0x73, 0x65, 0x74, 0x22, 0x47, 0x0a, 0x28, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73,
	0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x43, 0x6f, 0x6d, 0x70, 0x6c,
	0x65, 0x74, 0x65, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12,
	0x1b, 0x0a, 0x09, 0x66, 0x69, 0x6c, 0x65, 0x5f, 0x70, 0x61, 0x74, 0x68, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x08, 0x66, 0x69, 0x6c, 0x65, 0x50, 0x61, 0x74, 0x68, 0x22, 0xd2, 0x01, 0x0a,
	0x22, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61,
	0x64, 0x46, 0x69, 0x6c, 0x65, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x12, 0x54, 0x0a, 0x0b, 0x69, 0x6e, 0x5f, 0x70, 0x72, 0x6f, 0x67, 0x72, 0x65,
	0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x31, 0x2e, 0x6f, 0x75, 0x74, 0x65, 0x72,
	0x2e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61,
	0x64, 0x46, 0x69, 0x6c, 0x65, 0x49, 0x6e, 0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x69,
	0x6e, 0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x12, 0x4d, 0x0a, 0x08, 0x63, 0x6f, 0x6d,
	0x70, 0x6c, 0x65, 0x74, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x2f, 0x2e, 0x6f, 0x75,
	0x74, 0x65, 0x72, 0x2e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x48, 0x6f, 0x73, 0x74, 0x55, 0x70,
	0x6c, 0x6f, 0x61, 0x64, 0x46, 0x69, 0x6c, 0x65, 0x43, 0x6f, 0x6d, 0x70, 0x6c, 0x65, 0x74, 0x65,
	0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x08,
	0x63, 0x6f, 0x6d, 0x70, 0x6c, 0x65, 0x74, 0x65, 0x42, 0x07, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x22, 0x7a, 0x0a, 0x14, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x53, 0x65, 0x72, 0x76, 0x65,
	0x72, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2a, 0x0a, 0x05, 0x65, 0x72, 0x72,
	0x6f, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x6f, 0x75, 0x74, 0x65, 0x72,
	0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x48, 0x00, 0x52, 0x05,
	0x65, 0x72, 0x72, 0x6f, 0x72, 0x12, 0x2d, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x53, 0x74, 0x72, 0x75, 0x63, 0x74, 0x48, 0x00, 0x52, 0x04,
	0x64, 0x61, 0x74, 0x61, 0x42, 0x07, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x42, 0x5e, 0x0a,
	0x21, 0x63, 0x6f, 0x6d, 0x2e, 0x64, 0x6f, 0x67, 0x75, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63,
	0x6f, 0x6c, 0x2e, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x2e, 0x6f, 0x75, 0x74,
	0x65, 0x72, 0x5a, 0x39, 0x67, 0x6f, 0x2d, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x2d, 0x63, 0x6f,
	0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x6c, 0x65, 0x72, 0x2f, 0x74, 0x79, 0x70, 0x65, 0x73, 0x2f, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x2f, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65,
	0x64, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6f, 0x75, 0x74, 0x65, 0x72, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_outer_device_server_proto_rawDescOnce sync.Once
	file_outer_device_server_proto_rawDescData = file_outer_device_server_proto_rawDesc
)

func file_outer_device_server_proto_rawDescGZIP() []byte {
	file_outer_device_server_proto_rawDescOnce.Do(func() {
		file_outer_device_server_proto_rawDescData = protoimpl.X.CompressGZIP(file_outer_device_server_proto_rawDescData)
	})
	return file_outer_device_server_proto_rawDescData
}

var file_outer_device_server_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_outer_device_server_proto_goTypes = []interface{}{
	(*DeviceHostUploadFileStartSendValue)(nil),         // 0: outer.DeviceHostUploadFileStartSendValue
	(*DeviceHostUploadFileInProgressSendValue)(nil),    // 1: outer.DeviceHostUploadFileInProgressSendValue
	(*DeviceHostUploadFileCompleteSendValue)(nil),      // 2: outer.DeviceHostUploadFileCompleteSendValue
	(*DeviceHostUploadFileSendMessage)(nil),            // 3: outer.DeviceHostUploadFileSendMessage
	(*DeviceHostUploadFileInProgressReceiveValue)(nil), // 4: outer.DeviceHostUploadFileInProgressReceiveValue
	(*DeviceHostUploadFileCompleteReceiveValue)(nil),   // 5: outer.DeviceHostUploadFileCompleteReceiveValue
	(*DeviceHostUploadFileReceiveMessage)(nil),         // 6: outer.DeviceHostUploadFileReceiveMessage
	(*DeviceServerResponse)(nil),                       // 7: outer.DeviceServerResponse
	(*ErrorResult)(nil),                                // 8: outer.ErrorResult
	(*structpb.Struct)(nil),                            // 9: google.protobuf.Struct
}
var file_outer_device_server_proto_depIdxs = []int32{
	0, // 0: outer.DeviceHostUploadFileSendMessage.start:type_name -> outer.DeviceHostUploadFileStartSendValue
	1, // 1: outer.DeviceHostUploadFileSendMessage.in_progress:type_name -> outer.DeviceHostUploadFileInProgressSendValue
	2, // 2: outer.DeviceHostUploadFileSendMessage.complete:type_name -> outer.DeviceHostUploadFileCompleteSendValue
	4, // 3: outer.DeviceHostUploadFileReceiveMessage.in_progress:type_name -> outer.DeviceHostUploadFileInProgressReceiveValue
	5, // 4: outer.DeviceHostUploadFileReceiveMessage.complete:type_name -> outer.DeviceHostUploadFileCompleteReceiveValue
	8, // 5: outer.DeviceServerResponse.error:type_name -> outer.ErrorResult
	9, // 6: outer.DeviceServerResponse.data:type_name -> google.protobuf.Struct
	7, // [7:7] is the sub-list for method output_type
	7, // [7:7] is the sub-list for method input_type
	7, // [7:7] is the sub-list for extension type_name
	7, // [7:7] is the sub-list for extension extendee
	0, // [0:7] is the sub-list for field type_name
}

func init() { file_outer_device_server_proto_init() }
func file_outer_device_server_proto_init() {
	if File_outer_device_server_proto != nil {
		return
	}
	file_outer_errors_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_outer_device_server_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileStartSendValue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileInProgressSendValue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileCompleteSendValue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileSendMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileInProgressReceiveValue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileCompleteReceiveValue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceHostUploadFileReceiveMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_outer_device_server_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceServerResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_outer_device_server_proto_msgTypes[3].OneofWrappers = []interface{}{
		(*DeviceHostUploadFileSendMessage_Start)(nil),
		(*DeviceHostUploadFileSendMessage_InProgress)(nil),
		(*DeviceHostUploadFileSendMessage_Complete)(nil),
	}
	file_outer_device_server_proto_msgTypes[6].OneofWrappers = []interface{}{
		(*DeviceHostUploadFileReceiveMessage_InProgress)(nil),
		(*DeviceHostUploadFileReceiveMessage_Complete)(nil),
	}
	file_outer_device_server_proto_msgTypes[7].OneofWrappers = []interface{}{
		(*DeviceServerResponse_Error)(nil),
		(*DeviceServerResponse_Data)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_outer_device_server_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_outer_device_server_proto_goTypes,
		DependencyIndexes: file_outer_device_server_proto_depIdxs,
		MessageInfos:      file_outer_device_server_proto_msgTypes,
	}.Build()
	File_outer_device_server_proto = out.File
	file_outer_device_server_proto_rawDesc = nil
	file_outer_device_server_proto_goTypes = nil
	file_outer_device_server_proto_depIdxs = nil
}
