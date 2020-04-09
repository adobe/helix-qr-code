## Functions

<dl>
<dt><a href="#decodeFromBuffer">decodeFromBuffer(buf, canOverwriteBuffer)</a> ⇒ <code>string</code></dt>
<dd><p>Decodes the QR code included in the specified image.</p>
</dd>
<dt><a href="#decodeFromImageData">decodeFromImageData(img, canOverwriteBuffer)</a> ⇒ <code>string</code></dt>
<dd><p>Decodes the QR code included in the specified image.
The image is passed as an <code>ImageData</code> structure
(see <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">https://developer.mozilla.org/en-US/docs/Web/API/ImageData</a>).</p>
</dd>
</dl>

<a name="decodeFromBuffer"></a>

## decodeFromBuffer(buf, canOverwriteBuffer) ⇒ <code>string</code>
Decodes the QR code included in the specified image.

**Kind**: global function  
**Returns**: <code>string</code> - the decoded QR code found on the image or `null`
                  if a QR code couldn't be detected.  
**Throws**:

- <code>TypeError</code> If `buf` is not a Buffer
- <code>Error</code> If another error occurred


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buf | <code>Buffer</code> |  | Raw bytes of an image |
| canOverwriteBuffer | <code>boolean</code> | <code>true</code> | Specifies whether the buffer                  can be overwritten for performance improvements |

<a name="decodeFromImageData"></a>

## decodeFromImageData(img, canOverwriteBuffer) ⇒ <code>string</code>
Decodes the QR code included in the specified image.
The image is passed as an `ImageData` structure
(see https://developer.mozilla.org/en-US/docs/Web/API/ImageData).

**Kind**: global function  
**Returns**: <code>string</code> - the decoded QR code found on the image or `null`
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

