import Ember from 'ember';

export default Ember.Service.extend({
  isAvailable() {
    return 'bluetooth' in navigator;
  }
});
