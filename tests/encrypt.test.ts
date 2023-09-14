import { describe } from "node:test";
import { readFileSync } from "node:fs";
import { Encrypter, makeHeader, defaultMagic, defaultVersion } from "../src";

describe("Test Encrypt", () => {
	it("should make correct headers", () => {
		const expected = Buffer.from("5250474d56000000" // magic
			+ "000301" // version
			+ "0000000000", "hex");

		expect(expected.length).toBe(16);

		const actual = makeHeader(defaultMagic, defaultVersion);

		expect(expected.equals(actual)).toBeTruthy();
	});

	it("should encrypt correctly", () => {
		const source = readFileSync("tests/VS.png");
		const encrypt = new Encrypter("d41d8cd98f00b204e9800998ecf8427e");
		const actual = encrypt.encrypt(source);
		const expected = readFileSync("tests/VS.rpgmvp");

		expect(actual.equals(expected)).toBeTruthy();
	});
});
