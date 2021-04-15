class CommunicationBridge {
  constructor() {
    this.bridge = null
  }

  getBridge() {
    return this.bridge
  }

  setBridge(bridge) {
    this.bridge = bridge
  }

  broadcastMessage(event) {
    return this.bridge.onBroadcast(event)
  }

  broadcastLogin(event) {
    return this.bridge.onLogin(event)
  }

  broadcastLogout(event) {
    return this.bridge.onLogout(event)
  }

  connect() {
    throw new Error('Communication bridge connection is not implemented yet!')
  }

  onBroadcast(event) {
    throw new Error('Communication bridge broadcast handling is not implemented yet!')
  }
}

module.exports = CommunicationBridge
