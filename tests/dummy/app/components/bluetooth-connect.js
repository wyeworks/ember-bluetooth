import Ember from 'ember';
import layout from '../templates/components/bluetooth-connect';

export default Ember.Component.extend({
  classNames: ['bluetooth-connect'],
  layout,

  bluetooth: Ember.inject.service(),

  batteryLevel: 0,

  _handleValueEvent(event) {
    let batteryLevel = event.target.value.getUint8(0);
    this.set('batteryLevel', batteryLevel);
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
          this.set('batteryLevel', value);
        });
    },

    startNotifications() {
      this.get('bluetooth')
        .startNotifications('battery_service', 'battery_level', (event) => this._handleValueEvent(event));
    },

    stopNotifications() {
      this.get('bluetooth').stopNotifications();
    }
  }
});
