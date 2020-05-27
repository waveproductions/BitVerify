# hastebin.js

A NPM package to post data to hastebin.

## Example Usage

```js
const hastebin = require('hastebin.js');
const haste = new hastebin({ /* url: 'hastebin.com */ });

const link = haste.post('Helllo from hastebin.js!').then(link => console.log(link));
// Will return a link such as https://hastebin.com/sofomuqifo.js

const raw = haste.get('rejocivu').then(raw => console.log(raw));
// Will return the contents of the haste you provide.
```

## Documentation

* [Hastebin](#Hastebin)
  * _instance_
    * [.post(code, extension)](#Hastebin+post) ⇒ `{Promise<Pending>}`
    * [.get(key)](#Hastebin+get) => `{Promise<Pending>}`

<a name="Hastebin+post"></a>

### Hastebin.post

| Param | Type | Description
| --- | --- | --- |
| code | <code>string</code> | Required. The string that you want to post to Hastebin.
| extension | <code>string</code> | The extension that you'd like the file to upload as. If not provided, defaults to <code>js</code>

<a name="Hastebin+get"></a>

### Hastebin.get

| Param | Type | Description
| --- | --- | --- |
| key | <code>string</code> | Required. The file you'd like to get from Hastebin.