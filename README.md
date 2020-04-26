# Helix QR Code utilities

> A library for generating and decoding QR codes

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-qr-code.svg)](https://codecov.io/gh/adobe/helix-qr-code)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-qr-code.svg)](https://circleci.com/gh/adobe/helix-qr-code)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-qr-code.svg)](https://github.com/adobe/helix-qr-code/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-qr-code.svg)](https://github.com/adobe/helix-qr-code/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-qr-code.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-qr-code)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install @adobe/helix-qr-code
```

## Usage

Decode a QR code from the raw image file data:

```js
const fs = require('fs');
const qr = require('@adobe/helix-qr-code');

const bytes = fs.readFileSync('image_with_qr_code.jpg');
qr.decodeFromBuffer(bytes).then((decoded) => console.log(decoded));
```

Encode text as a QR code (raw PNG file data output):

```js
const fs = require('fs');
const qr = require('@adobe/helix-qr-code');

qr.encodeToBuffer('text to be encoded').then((buf) => fs.writeFileSync('qr_code.png', buf)));
```

Encode text as a QR code (SVG output):

```js
const qr = require('@adobe/helix-qr-code');

qr.encodeToSVG('text to be encoded').then((svg) => console.log(svg)));
```

Encode text as a QR code (Data URL output):

```js
const qr = require('@adobe/helix-qr-code');

qr.encodeToDataURL('text to be encoded').then((dataURL) => console.log(dataURL)));
```

See the [API documentation](docs/API.md) for more information.

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
