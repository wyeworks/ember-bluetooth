import Ember from 'ember';
import layout from '../templates/components/bluetooth-connect';

export default Ember.Component.extend({
  layout,

  bluetooth: Ember.inject.service(),

  actions: {
    connect() {
      this.get('bluetooth')
          .connectDevice({ filters: [{ services: ['battery_service'] }] });
    },

    readValue() {
      this.get('bluetooth')
        .readValue('battery_service', 'battery_level')
        .then(value => {
          console.log(`Battery level is: ${value}`);
        });
    }
  }
});
