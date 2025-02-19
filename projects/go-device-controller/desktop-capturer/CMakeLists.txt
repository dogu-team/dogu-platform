# CMakeLists.txt
# guide: https://cgold.readthedocs.io/en/latest/
# guide: https://cmake.org/cmake/help/latest/guide/tutorial/index.html


cmake_minimum_required(VERSION 3.20)
set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
set(CMAKE_CXX_STANDARD 17)
if (UNIX)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread")
endif()

project(desktop-capturer)

# set(CMAKE_XCODE_LINK_BUILD_PHASE_MODE "BUILT_ONLY")
message("Os: ${CMAKE_SYSTEM_NAME}")
message("Arch: ${CMAKE_SYSTEM_PROCESSOR}")
message("Compiler: ${CMAKE_CXX_COMPILER_ID} ${CMAKE_CXX_COMPILER_VERSION}")
message("Build type: ${CMAKE_BUILD_TYPE}")
message("CMake version: ${CMAKE_VERSION}")
if (APPLE)
    message("CMAKE_OSX_ARCHITECTURES: ${CMAKE_OSX_ARCHITECTURES}")
endif()

file(GLOB desktop-capturer_source CONFIGURE_DEPENDS  "code/*.cpp")
add_executable(desktop-capturer  ${desktop-capturer_source})

target_include_directories(desktop-capturer PUBLIC externals/webrtc/include)
target_include_directories(desktop-capturer PUBLIC externals/webrtc/include/third_party/abseil-cpp)
target_include_directories(desktop-capturer PUBLIC externals/webrtc/include/third_party/libvpx/source/libvpx)
target_include_directories(desktop-capturer PUBLIC externals/webrtc/include/third_party/libyuv/include)
target_link_directories(desktop-capturer PUBLIC externals/webrtc/lib)

# check operating system
if (WIN32)
    if (CMAKE_SYSTEM_PROCESSOR MATCHES "AMD64")
        target_link_libraries(desktop-capturer PUBLIC win-x64-webrtc.lib)
    else ()
        target_link_libraries(desktop-capturer PUBLIC win-x86-webrtc.lib)
    endif()
elseif (APPLE)
    if ("${CMAKE_OSX_ARCHITECTURES}" STREQUAL "x86_64")
        find_library(desktop-capturer-lib darwin-amd64-webrtc.a PATHS externals/webrtc/lib )
        target_link_libraries(desktop-capturer PUBLIC ${desktop-capturer-lib})
    elseif ("${CMAKE_OSX_ARCHITECTURES}" STREQUAL "arm64")
        find_library(desktop-capturer-lib darwin-arm64-webrtc.a PATHS externals/webrtc/lib )
        target_link_libraries(desktop-capturer PUBLIC ${desktop-capturer-lib})
    else ()
        message(FATAL_ERROR "Unknown CMAKE_OSX_ARCHITECTURES: ${CMAKE_OSX_ARCHITECTURES}")
    endif()

    find_library(appkit-framework AppKit)
    find_library(iosurface-framework IOSurface)
    find_library(coregraphics-framework CoreGraphics)
    find_library(corefoundation-framework CoreFoundation)
    target_link_libraries(desktop-capturer PUBLIC ${appkit-framework})
    target_link_libraries(desktop-capturer PUBLIC ${iosurface-framework})
    target_link_libraries(desktop-capturer PUBLIC ${coregraphics-framework})
    target_link_libraries(desktop-capturer PUBLIC ${corefoundation-framework})
elseif (UNIX)
    find_library(desktop-capturer-lib linux-x86_64-libwebrtc.a PATHS externals/webrtc/lib )
    target_link_libraries(desktop-capturer PUBLIC ${desktop-capturer-lib})
    target_link_libraries(desktop-capturer PUBLIC "-lX11")
    target_link_libraries(desktop-capturer PUBLIC "-lXdamage")
    target_link_libraries(desktop-capturer PUBLIC "-lXfixes")
    target_link_libraries(desktop-capturer PUBLIC "-lXrandr")
    target_link_libraries(desktop-capturer PUBLIC "-lXext")
    target_link_libraries(desktop-capturer PUBLIC "-lXtst")
    target_link_libraries(desktop-capturer PUBLIC "-lXcomposite")
    target_link_libraries(desktop-capturer PUBLIC "-lglib-2.0")
    target_link_libraries(desktop-capturer PUBLIC "-lgio-2.0")
    target_link_libraries(desktop-capturer PUBLIC "-lgobject-2.0")
    target_link_libraries(desktop-capturer PUBLIC "-lgbm")
    target_link_libraries(desktop-capturer PUBLIC "-latomic")
    target_link_libraries(desktop-capturer PUBLIC ${CMAKE_DL_LIBS})
endif()
