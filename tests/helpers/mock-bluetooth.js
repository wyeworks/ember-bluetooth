/* global navigator*/

import Ember from 'ember';

const Mock = Ember.Object.extend({
  available: true,
  name: null,
  value: null,

  isAvailable(value) {
    return this._setAndMock('available', value);
  },

  deviceName(deviceName) {
    return this._setAndMock('name', deviceName);
  },

  characteristicValue(value) {
    return this._setAndMock('value', value);
  },

  _setAndMock(key, value) {
    this.set(key, value);

    this._mock();

    return this;
  },

  _mock() {
    let isAvailable = this.get('available');
    let deviceName = this.get('name');
    let characteristicValue = this.get('value');

    let bluetooth;

    if (isAvailable) {
      bluetooth = {
        requestDevice: function() {
          return Promise.resolve({
            name: deviceName,
            gatt: function() {
              return Promise.resolve({
                getPrimaryService: function() {
                  return Promise.resolve({
                    getCharacteristic: function() {
                      return Promise.resolve({
                        readValue: function() {
                          return Promise.resolve({
                            getUint8: function() {
                              return characteristicValue;
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      };
    }

    this._createGetter(bluetooth);
  },

  _createGetter(value) {
    navigator.__defineGetter__('bluetooth', function(){
      return value;
    });
  }
});

export default function mockBluetooth() {
  let instance = Mock.create();

  return instance;
}
