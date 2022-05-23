import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import { make as through2 } from "./mod.ts";
import { Buffer } from "https://deno.land/std@0.140.0/node/buffer.ts";
import { BufferListStream } from "https://raw.githubusercontent.com/sail-sail/buffer_list/main/mod.ts";

function randomBytes (len) {
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = Math.floor(Math.random() * 0xff)
  }
  return bytes
}

Deno.test("through2", function() {
  const th2 = through2(function (chunk, _enc, callback) {
    if (!this._i) {
      this._i = 97;
    } else {
      this._i++;
    }
    const b = Buffer.alloc(chunk.length)
    for (let i = 0; i < chunk.length; i++) {
      b[i] = this._i;
    }
    this.push(b);
    callback();
  });

  th2.pipe(new BufferListStream((err, b) => {
    if (err) {
      throw err;
    }
    const s = b.toString('ascii');
    assertEquals(s, "aaaaaaaaaabbbbbcccccccccc");
  }));

  th2.write(randomBytes(10));
  th2.write(randomBytes(5));
  th2.write(randomBytes(10));
  th2.end();
});
