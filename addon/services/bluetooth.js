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

    console.log(`Connected to bluetooth device: ${device.name}`);

    this.set('device', device);
    this.set('server', server);
  },

  async readValue(serviceName, characteristicName) {
    let service = await this.get('server').getPrimaryService(serviceName);
    let characteristic = await service.getCharacteristic(characteristicName);
    let value = await characteristic.readValue();

    return value.getUint8(0);
  }
});
