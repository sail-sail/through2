// deno-lint-ignore-file no-explicit-any
// Type definitions for through2 v 2.0
// Project: https://github.com/rvagg/through2
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>,
//                 jedmao <https://github.com/jedmao>,
//                 Georgios Valotasios <https://github.com/valotas>,
//                 Ben Chauvette < https://github.com/bdchauvette>,
//                 TeamworkGuy2 <https://github.com/TeamworkGuy2>,
//                 Alorel <https://github.com/Alorel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type {
    Transform,
} from "https://deno.land/std@0.140.0/node/stream.ts";
import type { BufferEncoding } from "https://deno.land/std@0.140.0/node/_global.d.ts";
import type { DuplexOptions } from "https://deno.land/std@0.140.0/node/_stream.d.ts";

declare function through2(transform?: through2.TransformFunction, flush?: through2.FlushCallback): Transform;
declare function through2(opts?: DuplexOptions, transform?: through2.TransformFunction, flush?: through2.FlushCallback): Transform;

declare namespace through2 {
    interface Through2Constructor extends Transform {
        new (opts?: DuplexOptions): Transform;
        (opts?: DuplexOptions): Transform;
    }

    type TransformCallback = (err?: any, data?: any) => void;
    type TransformFunction = (this: Transform, chunk: any, enc: BufferEncoding, callback: TransformCallback) => void;
    type FlushCallback = (this: Transform, flushCallback: () => void) => void;

    /**
     * Convenvience method for creating object streams
     */
    function obj(transform?: TransformFunction, flush?: FlushCallback): Transform;

    /**
     * Creates a constructor for a custom Transform. This is useful when you
     * want to use the same transform logic in multiple instances.
     */
    function ctor(transform?: TransformFunction, flush?: FlushCallback): Through2Constructor;
    function ctor(opts?: DuplexOptions, transform?: TransformFunction, flush?: FlushCallback): Through2Constructor;
}
export { through2 as make };
