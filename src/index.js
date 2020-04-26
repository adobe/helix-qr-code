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

'use strict';

const Jimp = require('jimp');
const jsQR = require('jsqr');
const QRCode = require('qrcode');

/**
 * Decodes the QR code included in the specified image.
 *
 * @param {Buffer} buf Raw bytes of an image
 * @param {boolean} canOverwriteBuffer=true Specifies whether the buffer
 *                  can be overwritten for performance improvements
 * @returns {Promise<string>} the decoded QR code found on the image or `null`
 *                            if a QR code couldn't be detected.
 * @throws {TypeError} If `buf` is not a Buffer
 * @throws {Error} If another error occurred
 */
async function decodeFromBuffer(buf, canOverwriteBuffer = true) {
  if (!Buffer.isBuffer(buf)) {
    throw new TypeError('argument must be a Buffer');
  }
  const { bitmap: { data, height, width } } = await Jimp.read(buf);
  return jsQR(data, width, height, {
    inversionAttempts: 'dontInvert',
    canOverwriteImage: canOverwriteBuffer,
  });
}

/**
 * Decodes the QR code included in the specified image.
 * The image is passed as an `ImageData` structure
 * (see https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
 *
 * @param {object} img image data
 * @param {Buffer|Uint8Array} img.data a one-dimensional array containing
 *                            the data in the RGBA order, with integer values
 *                            between 0 and 255 (inclusive).
 * @param {number} img.height height in pixels
 * @param {number} img.width width in pixels
 * @param {boolean} canOverwriteBuffer=true Specifies whether the buffer
 *                  can be overwritten for performance improvements
 * @returns {Promise<string>} the decoded QR code found on the image or `null`
 *                            if a QR code couldn't be detected.
 * @throws {TypeError} If `buf` is not a Buffer
 * @throws {Error} If another error occurred
 */
async function decodeFromImageData(img, canOverwriteBuffer = true) {
  if (typeof img !== 'object') {
    throw new TypeError('argument must be an object with the following properties: data, height, width');
  }
  if (!(Buffer.isBuffer(img.data) || img.data instanceof Uint8Array)) {
    throw new TypeError('.data must be a Buffer or Uint8Array');
  }
  if (typeof img.height !== 'number' || typeof img.width !== 'number') {
    throw new TypeError('.height and .width must be numbers');
  }
  return jsQR(img.data, img.width, img.height, {
    inversionAttempts: 'dontInvert',
    canOverwriteImage: canOverwriteBuffer,
  });
}

function applyDefaultOptions(options, overrides) {
  const opts = options || {};
  const defaults = {
    scale: 2,
    margin: 2,
    errorCorrectionLevel: 'L',
    color: {
      dark: '#000000ff', // black
      light: '#ffffffff', // white
    },
  };
  return { ...defaults, ...opts, ...overrides };
}

/**
 * Encodes a string as a QR Code (Output: Data URL of raw PNG file data).
 *
 * @param {string} text to be encoded text
 * @param {object} [options] optional, see https://github.com/soldair/node-qrcode#qr-code-options
 * @returns {Promise<string>} Data URL of raw PNG file data
 * @throws {Error} If an error occurred
 */
async function encodeToDataURL(text, options) {
  return QRCode.toDataURL(text, applyDefaultOptions(options, { type: 'png' }));
}

/**
 * Encodes a string as a QR Code (Output: SVG).
 *
 * @param {string} text to be encoded text
 * @param {object} [options] optional, see https://github.com/soldair/node-qrcode#qr-code-options
 * @returns {Promise<string>} SVG of generated QR Code
 * @throws {Error} If an error occurred
 */
async function encodeToSVG(text, options) {
  return QRCode.toString(text, applyDefaultOptions(options, { type: 'svg' }));
}

/**
 * Encodes a string as a QR Code (Output: raw PNG file data).
 *
 * @param {string} text to be encoded text
 * @param {object} [options] optional, see https://github.com/soldair/node-qrcode#qr-code-options
 * @returns {Promise<Buffer>} raw PNG file data of the generated QR Code
 * @throws {Error} If an error occurred
 */
async function encodeToBuffer(text, options) {
  return QRCode.toBuffer(text, applyDefaultOptions(options, { type: 'png' }));
}

module.exports = {
  decodeFromBuffer,
  decodeFromImageData,
  encodeToDataURL,
  encodeToSVG,
  encodeToBuffer,
};
