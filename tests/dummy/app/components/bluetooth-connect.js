import Ember from 'ember';
import layout from '../templates/components/bluetooth-connect';

export default Ember.Component.extend({
  layout,

  bluetooth: Ember.inject.service(),

  actions: {
    connect() {
      this.get('bluetooth')
        .requestDevice()
        .getService('battery_service')
        .getCharacteristic('battery_level')
        .connect();
    }
  }
});
