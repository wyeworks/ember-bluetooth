import Ember from 'ember';
import layout from '../templates/components/bluetooth-connect';

export default Ember.Component.extend({
  layout,

  bluetooth: Ember.inject.service(),

  _handleValueEvent(event) {
    let batteryLevel = event.target.value.getUint8(0);
    console.log('> Battery Level is ' + batteryLevel + '%');
  },

  actions: {
    connect() {
      this.get('bluetooth')
      .connectDevice({ filters: [{ services: ['battery_service'] }] })
      .then((device) => {
        console.log(`Connected to device: ${JSON.stringify(device)}`);
      });
    },

    readValue() {
      this.get('bluetooth')
        .readValue('battery_service', 'battery_level')
        .then(value => {
          console.log(`Battery level is: ${value}`);
        });
    },

    listenValue() {
      this.get('bluetooth')
        .listenValue('battery_service', 'battery_level', this._handleValueEvent);
    }
  }
});
