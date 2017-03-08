# ember-bluetooth

This is an ongoing effort to build an easy-to-use addon to intereact with
bluetooth devices within ember apps.


## Web Bluetooth API

[Web Bluetooth - Draft Community Group Report](https://webbluetoothcg.github.io/web-bluetooth/)


## Web Bluetooth Samples

[Google Chrome - Bluetooth samples](https://googlechrome.github.io/samples/web-bluetooth/index.html)

## Installation

`ember install ember-bluetooth`

## Usage

### Inject the bluetooth service

```js
import Ember from 'ember';

export default Ember.Component.extend({
  bluetooth: Ember.inject.service(),
  ...
});
```

### Connect a device.

IMPORTANT! This action should be the result of an user intereaction, otherwise the API will block the connection

```html
<button class="btn" {{action "connect"}}><span>Connect!</span></button>
```

```js
import Ember from 'ember';

export default Ember.Component.extend({
  bluetooth: Ember.inject.service(),

  actions: {
    connect() {
      this.get('bluetooth')
      .connectDevice({ filters: [{ services: ['battery_service'] }] })
      .then((device) => {
        console.log(`Connected to device: ${JSON.stringify(device)}`);
      });
    }
  }
});
```

### Request a service/characteristic

This must be done after the connection.

```js
import Ember from 'ember';

export default Ember.Component.extend({
  bluetooth: Ember.inject.service(),

  actions: {
   ...

   readValue() {
    this.get('bluetooth')
      .readValue('battery_service', 'battery_level')
      .then(value => {
       console.log(value);
      });
    }
  }
});
```

### You can also request notification if a characteristic changes

```js
import Ember from 'ember';

export default Ember.Component.extend({
  bluetooth: Ember.inject.service(),

 _handleValueEvent(event) {
    let batteryLevel = event.target.value.getUint8(0);
    console.log(batteryLevel);
  },

  actions: {
   ...

    startNotifications() {
      this.get('bluetooth')
        .startNotifications('battery_service', 'battery_level', (event) => this._handleValueEvent(event));
    }
  }
});
```

### You can stop the notification ( not yet implemented in the Web Bluetooth API)

```js
import Ember from 'ember';

export default Ember.Component.extend({
  bluetooth: Ember.inject.service(),

  actions: {
   ...

     stopNotifications() {
       this.get('bluetooth').stopNotifications();
     }
  }
});
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
