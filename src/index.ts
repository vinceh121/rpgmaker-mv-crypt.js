import { Buffer } from "node:buffer";

const defaultFakeHeaderLength = 16;

const defaultMagic = Buffer.from("5250474d56000000", "hex");
const defaultVersion = Buffer.from("000301", "hex");

/**
 * @param key A (usually 16 bytes) key
 * @param buffer A buffer that will be xor'ed in-place at [0; key.length]
 */
const xorBytes = (key: Buffer, buffer: Buffer) => {
	for (let i = 0; i < key.length; i++) {
		buffer[i] = buffer[i] ^ key[i];
	}
};

const makeHeader = (magicNumber: Buffer, version: Buffer): Buffer => {
	const buf = Buffer.alloc(16);
	buf.fill(magicNumber, 0, magicNumber.length);
	buf.fill(version, magicNumber.length, magicNumber.length + version.length);
	return buf;
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

class Encrypter {
	key: Buffer;

	constructor(key: string | Buffer) {
		if (typeof key === "string") {
			this.key = Buffer.from(key, "hex");
		} else {
			this.key = key;
		}
	}

	encrypt(buffer: Buffer, prependHeader: boolean = true, magic: Buffer = defaultMagic, version: Buffer = defaultVersion): Buffer {
		xorBytes(this.key, buffer);

		if (prependHeader) {
			const encBuf = Buffer.alloc(buffer.length + defaultFakeHeaderLength);

			const header = makeHeader(magic, version);

			encBuf.fill(header, 0, header.length);
			encBuf.fill(buffer, header.length, header.length + buffer.length);

			return encBuf;
		} else {
			return buffer;
		}
	}
}

export { Decrypter, Encrypter, xorBytes, makeHeader, defaultFakeHeaderLength, defaultMagic, defaultVersion };
