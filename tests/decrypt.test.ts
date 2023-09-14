import { describe } from "node:test";
import { readFileSync } from "node:fs";
import { Decrypter } from "../src";

describe("Test Decrypt", () => {
	it("should decrypt correctly", () => {
		const source = readFileSync("tests/VS.rpgmvp");
		const decrypt = new Decrypter("d41d8cd98f00b204e9800998ecf8427e");
		const actual = decrypt.decrypt(source);
		const expected = readFileSync("tests/VS.png");

		expect(actual.equals(expected)).toBeTruthy();
	});
});
