import Ember from 'ember';

export default Ember.Service.extend({
  device: null,
  server: null,
  service: null,
  characteristic: null,

  isAvailable() {
    return 'bluetooth' in navigator;
  },

  async connectDevice(options) {
    let device = await navigator.bluetooth.requestDevice(options);
    let server = await device.gatt.connect();

    this.set('device', device);
    this.set('server', server);

    return Ember.RSVP.Promise.resolve({ id: device.id, name: device.name });
  },

  async readValue(serviceName, characteristicName) {
    let characteristic = await this._getCharacteristic(serviceName, characteristicName);
    let value = await characteristic.readValue();

    return value.getUint8(0);
  },

  async listenValue(serviceName, characteristicName, cb) {
    let characteristic = await this._getCharacteristic(serviceName, characteristicName);
    characteristic.addEventListener('characteristicvaluechanged', cb);
  },


  async _getCharacteristic(serviceName, characteristicName) {
    let service = await this.get('server').getPrimaryService(serviceName);
    let characteristic = await service.getCharacteristic(characteristicName);

    return characteristic;
  }
});
