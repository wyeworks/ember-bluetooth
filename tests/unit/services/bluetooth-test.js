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
