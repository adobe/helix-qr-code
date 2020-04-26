/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */

'use strict';

const assert = require('assert');
const path = require('path');

const Jimp = require('jimp');
const fse = require('fs-extra');

const {
  decodeFromBuffer,
  decodeFromImageData,
  encodeToBuffer,
  encodeToSVG,
  encodeToDataURL,
} = require('../src/index.js');

describe('QR code de- & encoding Tests', () => {
  it('decodeFromBuffer decodes QR Code from buffer', async () => {
    const EXPECTED = 'https://www.youtube.com/watch?v=85UKLsvQEIA';

    const buf = await fse.readFile(path.resolve(__dirname, 'fixtures', 'youtube_qr.jpg'));
    const result = await decodeFromBuffer(buf);
    assert.equal(result.data, EXPECTED);
  });

  it('decodeFromBuffer returns null if no QR code is detected', async () => {
    const buf = await fse.readFile(path.resolve(__dirname, 'fixtures', 'youtube_no_qr.jpg'));
    const result = await decodeFromBuffer(buf);
    assert.equal(result, null);
  });

  it('decodeFromBuffer rejects with a TypeError if argument is not a Buffer', () => {
    assert.rejects(() => decodeFromBuffer('/some/path'), TypeError);
  });

  it('decodeFromBuffer rejects with an Error if buffer doesn\'t contain image data', async () => {
    const buf = await fse.readFile(__filename);
    assert.rejects(() => decodeFromBuffer(buf), Error);
  });

  it('decodeFromBuffer rejects with an Error if buffer is empty', () => {
    assert.rejects(() => decodeFromBuffer(Buffer.alloc(0)), Error);
  });

  it('decodeFromImageData decodes QR Code from ImageData', async () => {
    const EXPECTED = 'https://www.youtube.com/watch?v=85UKLsvQEIA';

    const img = await Jimp.read(path.resolve(__dirname, 'fixtures', 'youtube_qr.jpg'));
    const result = await decodeFromImageData(img.bitmap);
    assert.equal(result.data, EXPECTED);
  });

  it('decodeFromImageData rejects with a TypeError if argument is not a ImageData object', () => {
    assert.rejects(() => decodeFromImageData('/some/path'), TypeError);
    assert.rejects(() => decodeFromImageData({
      data: new Uint8Array(),
      height: true,
      with: 0,
    }), TypeError);
    assert.rejects(() => decodeFromImageData({ data: 'blah' }), TypeError);
  });

  it('encodeToBuffer/decodeFromBuffer roundtrip works', async () => {
    const TEXT = 'https://www.youtube.com/watch?v=85UKLsvQEIA';
    const buf = await encodeToBuffer(TEXT);
    const result = await decodeFromBuffer(buf);
    assert.equal(result.data, TEXT);
  });

  it('encodeToDataURL/decodeFromBuffer roundtrip works', async () => {
    const TEXT = 'https://www.youtube.com/watch?v=85UKLsvQEIA';
    const dataURL = await encodeToDataURL(TEXT);
    assert(typeof dataURL === 'string');
    const match = dataURL.match(/^data:(.+\/[a-z0-9]+)?(;base64)?,(.*)/);
    assert(match);
    assert.equal(match[1], 'image/png');
    assert.equal(match[2], ';base64');
    const buf = Buffer.from(match[3], 'base64');
    const result = await decodeFromBuffer(buf);
    assert.equal(result.data, TEXT);
  });

  it('encodeToSVG works', async () => {
    const TEXT = 'https://www.youtube.com/watch?v=85UKLsvQEIA';
    const svg = await encodeToSVG(TEXT);
    assert(typeof svg === 'string');
    assert(svg.match(/(^<svg)([^>]*)>.*<\/svg>/));
  });
});
