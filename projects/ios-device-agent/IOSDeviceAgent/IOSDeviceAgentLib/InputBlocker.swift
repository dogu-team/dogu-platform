import Combine
import WebDriverAgentLib

class InputBlocker {
  enum Error: Swift.Error {
    case sessionNotFound
  }

  private var config: Config
  private let webDriverClient: WebDriverClient
  private let period: TimeInterval = 1.0 / 2
  private var timer: Cancellable? = nil
  var isAppBlocked: Bool = false

  init(config: Config, webDriverClient: WebDriverClient) {
    self.config = config
    self.webDriverClient = webDriverClient
    self.startTimer()
  }

  func close() throws {
    timer?.cancel()
  }

  private func startTimer() {
    let callGuard = DuplicatedCallGuarder()

    timer = Timer.publish(every: period, on: .main, in: .default)
      .autoconnect()
      .sink { currentTime in
        Task.catchable(
          {
            try await callGuard.guardCall {
              let isBlocked = try await self.blockApp()
              self.isAppBlocked = isBlocked
            }
          },
          catch: {
            Log.shared.debug("handling failed. \($0)")
          })
      }
  }

  @MainActor
  func blockTap(position: CGPoint) async throws -> Bool {
    if !GlobalVariable.IsInputBlockAvailable {
      return false
    }
    
    let apps = XCUIApplication.fb_activeAppsInfo()
    let isSpringboard = apps.contains(where: { app in
      guard let bundleId = app["bundleId"] as? String else {
        return false
      }
      return Constants.SpringboardBundleId == bundleId
    })
    if !isSpringboard {
      return false
    }
    let app = try await webDriverClient.getApplication()
    let addWidget: XCUIElement = app.buttons["Add Widget"]
    if !addWidget.exists {
      return false
    }
    let widgetFrame = addWidget.frame

    if widgetFrame.minX < position.x && position.x < widgetFrame.maxX && widgetFrame.minY < position.y && position.y < widgetFrame.maxY {
      return true
    }
    return false
  }

  @MainActor
  private func blockApp() async throws -> Bool {
    if !GlobalVariable.IsInputBlockAvailable {
      return false
    }
    let apps = XCUIApplication.fb_activeAppsInfo()
    for app in apps {
      guard let bundleId = app["bundleId"] as? String else {
        return false
      }
      if Constants.SpringboardBundleId == bundleId {
        return try await blockOnSpringboard()
      }
      if Constants.BlockAppBundleIds.contains(where: { $0 == bundleId }) {
        let session = try await webDriverClient.getSession()
        session.terminateApplication(withBundleId: bundleId)
        return true
      }
    }

    return false
  }

  @MainActor
  private func blockOnSpringboard() async throws -> Bool {
    let app = try await webDriverClient.getApplication()
    let match =  app.fb_descendants(matching: NSPredicate( format:"name == 'ControlCenterView' or label == 'Delete App' or name == 'Screen Broadcasting'"), shouldReturnAfterFirstMatch:true).first

    if nil != match && match!.exists {
      let cancelButton = match!.buttons["Cancel"]
      if cancelButton.exists {
        cancelButton.tap()
      }
      try await webDriverClient.homescreen()
      try await webDriverClient.homescreen()
      return true
    }

    return false
  }
}
