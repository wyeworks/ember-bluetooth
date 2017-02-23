/* global navigator*/

import Ember from 'ember';

const Mock = Ember.Object.extend({
  isAvailable(value) {
    navigator.__defineGetter__('bluetooth', function(){
      return value ? {} : undefined;
    });

    return this;
  }
});

export default function mockBluetooth() {
  let instance = Mock.create();

  return instance;
}
