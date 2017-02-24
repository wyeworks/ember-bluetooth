import Ember from 'ember';

export default Ember.Service.extend({
  serviceName: null,
  characteristicName: null,
  characteristicValue: null,

  isAvailable() {
    return 'bluetooth' in navigator;
  },

  requestDevice() {
    return this;
  },

  getService(serviceName) {
    this.set('serviceName', serviceName);

    return this;
  },

  getCharacteristic(characteristicName) {
    this.set('characteristicName', characteristicName);

    return this;
  },

  connect() {

    if (this.isAvailable()) {
      let serviceName = this.get('serviceName');
      let characteristicName = this.get('characteristicName');
      let options = { filters: [{ services: [serviceName] }] };

      navigator.bluetooth.requestDevice(options)
      .then(device => device.gatt.connect())
      .then(server => server.getPrimaryService(serviceName))
      .then(service => service.getCharacteristic(characteristicName))
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        console.log(`Battery level is: ${value.getUint8(0)}`);
      })
      .catch(error => { console.log(error); });
    }

  }
});
