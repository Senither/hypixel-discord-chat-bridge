class CommunicationBridge
{
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

  connect() {
    throw new Error('Communication bridge connection is not implemented yet!')
  }

  onBroadcast(event) {
    throw new Error('Communication bridge broadcast handling is not implemented yet!')
  }
}

module.exports = CommunicationBridge
