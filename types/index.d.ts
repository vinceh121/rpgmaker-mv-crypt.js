/// <reference types="node" />
import { Buffer } from "node:buffer";
declare const defaultFakeHeaderLength = 16;
/**
 *
 * @param key A (usually 16 bytes) key
 * @param buffer A buffer that will be xor'ed in-place at [0; key.length]
 */
declare const xorBytes: (key: Buffer, buffer: Buffer) => void;
declare class Decrypter {
    key: Buffer;
    constructor(key: string | Buffer);
    decrypt(buffer: Buffer, hasHeader?: boolean): Buffer;
}
export { Decrypter, xorBytes, defaultFakeHeaderLength };
