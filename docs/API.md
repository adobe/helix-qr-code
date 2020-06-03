## Functions

<dl>
<dt><a href="#decodeFromBuffer">decodeFromBuffer(buf)</a> ⇒ <code><a href="#DecodeResult">Promise.&lt;DecodeResult&gt;</a></code></dt>
<dd><p>Decodes the QR code included in the specified image.</p>
</dd>
<dt><a href="#decodeFromImageData">decodeFromImageData(img, canOverwriteBuffer)</a> ⇒ <code><a href="#DecodeResult">Promise.&lt;DecodeResult&gt;</a></code></dt>
<dd><p>Decodes the QR code included in the specified image.
The image is passed as an <code>ImageData</code> structure
(see <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">https://developer.mozilla.org/en-US/docs/Web/API/ImageData</a>).</p>
</dd>
<dt><a href="#encodeToDataURL">encodeToDataURL(text, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Encodes a string as a QR Code (Output: Data URL of raw PNG file data).</p>
</dd>
<dt><a href="#encodeToSVG">encodeToSVG(text, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Encodes a string as a QR Code (Output: SVG).</p>
</dd>
<dt><a href="#encodeToBuffer">encodeToBuffer(text, [options])</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Encodes a string as a QR Code (Output: raw PNG file data).</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Point">Point</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Location">Location</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#DecodeResult">DecodeResult</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="decodeFromBuffer"></a>

## decodeFromBuffer(buf) ⇒ [<code>Promise.&lt;DecodeResult&gt;</code>](#DecodeResult)
Decodes the QR code included in the specified image.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;DecodeResult&gt;</code>](#DecodeResult) - the QR code found on the image or `null`
                                 if a QR code couldn't be detected.  
**Throws**:

- <code>TypeError</code> If `buf` is not a Buffer
- <code>Error</code> If another error occurred


| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> | Raw bytes of an image |

<a name="decodeFromImageData"></a>

## decodeFromImageData(img, canOverwriteBuffer) ⇒ [<code>Promise.&lt;DecodeResult&gt;</code>](#DecodeResult)
Decodes the QR code included in the specified image.
The image is passed as an `ImageData` structure
(see https://developer.mozilla.org/en-US/docs/Web/API/ImageData).

**Kind**: global function  
**Returns**: [<code>Promise.&lt;DecodeResult&gt;</code>](#DecodeResult) - the QR code found on the image or `null`
                                 if a QR code couldn't be detected.  
**Throws**:

- <code>TypeError</code> If `buf` is not a Buffer
- <code>Error</code> If another error occurred


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| img | <code>object</code> |  | image data |
| img.data | <code>Buffer</code> \| <code>Uint8Array</code> |  | a one-dimensional array containing                            the data in the RGBA order, with integer values                            between 0 and 255 (inclusive). |
| img.height | <code>number</code> |  | height in pixels |
| img.width | <code>number</code> |  | width in pixels |
| canOverwriteBuffer | <code>boolean</code> | <code>true</code> | Specifies whether the buffer                  can be overwritten for performance improvements |

<a name="encodeToDataURL"></a>

## encodeToDataURL(text, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Encodes a string as a QR Code (Output: Data URL of raw PNG file data).

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - Data URL of raw PNG file data  
**Throws**:

- <code>Error</code> If an error occurred


| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | to be encoded text |
| [options] | <code>object</code> | optional, see https://github.com/soldair/node-qrcode#qr-code-options |

<a name="encodeToSVG"></a>

## encodeToSVG(text, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Encodes a string as a QR Code (Output: SVG).

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - SVG of generated QR Code  
**Throws**:

- <code>Error</code> If an error occurred


| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | to be encoded text |
| [options] | <code>object</code> | optional, see https://github.com/soldair/node-qrcode#qr-code-options |

<a name="encodeToBuffer"></a>

## encodeToBuffer(text, [options]) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Encodes a string as a QR Code (Output: raw PNG file data).

**Kind**: global function  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - raw PNG file data of the generated QR Code  
**Throws**:

- <code>Error</code> If an error occurred


| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | to be encoded text |
| [options] | <code>object</code> | optional, see https://github.com/soldair/node-qrcode#qr-code-options |

<a name="Point"></a>

## Point : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | x coordinate |
| y | <code>number</code> | y coordinate. |

<a name="Location"></a>

## Location : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| topRightCorner | [<code>Point</code>](#Point) | top right corner of QR code image |
| topLeftCorner | [<code>Point</code>](#Point) | top left corner of QR code image |
| bottomRightCorner | [<code>Point</code>](#Point) | bottom right corner of QR code image |
| bottomLeftCorner | [<code>Point</code>](#Point) | bottom left corner of QR code image |

<a name="DecodeResult"></a>

## DecodeResult : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | the decoded QR code. |
| location | [<code>Location</code>](#Location) | location of the QR code within the image |

