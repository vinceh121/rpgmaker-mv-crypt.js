/// <reference types="node" />
import { Buffer } from "node:buffer";
declare const defaultFakeHeaderLength = 16;
declare const defaultMagic: Buffer;
declare const defaultVersion: Buffer;
/**
 * @param key A (usually 16 bytes) key
 * @param buffer A buffer that will be xor'ed in-place at [0; key.length]
 */
declare const xorBytes: (key: Buffer, buffer: Buffer) => void;
declare const makeHeader: (magicNumber: Buffer, version: Buffer) => Buffer;
declare class Decrypter {
    key: Buffer;
    constructor(key: string | Buffer);
    decrypt(buffer: Buffer, hasHeader?: boolean): Buffer;
}
declare class Encrypter {
    key: Buffer;
    constructor(key: string | Buffer);
    encrypt(buffer: Buffer, prependHeader?: boolean, magic?: Buffer, version?: Buffer): Buffer;
}
export { Decrypter, Encrypter, xorBytes, makeHeader, defaultFakeHeaderLength, defaultMagic, defaultVersion };
