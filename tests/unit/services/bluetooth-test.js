import { moduleFor, test } from 'ember-qunit';
import mockBluetooth from '../../../tests/helpers/mock-bluetooth';

moduleFor('service:bluetooth', 'Unit | Service | bluetooth', {
});

test('it returns true when bluetooth is available', function(assert) {
  mockBluetooth()
    .isAvailable(true);

  let service = this.subject();

  assert.ok(service.isAvailable());
});

test('it returns false when bluetooth is not available', function(assert) {
  mockBluetooth()
    .isAvailable(false);

  let service = this.subject();

  assert.ok(service.isAvailable());
});

test('it connects to a bluetooth device', function(assert) {
  mockBluetooth()
    .isAvailable(true)
    .deviceName('fakedevice')
    .characteristicValue('42');

  let service = this.subject();

  service.connectDevice();

  assert.ok(service.get('device') == null);
  assert.ok(service.get('server') == null);
});

test('it reads a value from a connected device', function(assert) {
  mockBluetooth()
    .isAvailable(true)
    .deviceName('fakedevice')
    .characteristicValue('42');

  let service = this.subject();

  service.connectDevice();

  assert.ok(service.get('device') == null);
  assert.ok(service.get('server') == null);

  service.readValue('fake_service', 'fake_characteristic').then(value => {
    assert.equal(value, 42);
  });

});
