import { Buffer } from "node:buffer";

const defaultFakeHeaderLength = 16;

/**
 * 
 * @param key A (usually 16 bytes) key
 * @param buffer A buffer that will be xor'ed in-place at [0; key.length]
 */
const xorBytes = (key: Buffer, buffer: Buffer) => {
	for (let i = 0; i < key.length; i++) {
		buffer[i] = buffer[i] ^ key[i];
	}
};

class Decrypter {
	key: Buffer;

	constructor(key: string | Buffer) {
		if (typeof key === "string") {
			this.key = Buffer.from(key, "hex");
		} else {
			this.key = key;
		}
	}

	decrypt(buffer: Buffer, hasHeader: boolean = true): Buffer {
		if (hasHeader) {
			buffer = buffer.subarray(defaultFakeHeaderLength);
		}

		xorBytes(this.key, buffer);

		return buffer;
	}
}

export { Decrypter, xorBytes, defaultFakeHeaderLength };