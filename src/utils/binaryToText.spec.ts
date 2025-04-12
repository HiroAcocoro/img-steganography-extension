import binaryToText from "./binaryToText";

describe("binaryToText", () => {
  it("should convert binary to text", () => {
    const text = "Hello";
    const binary = text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
    const result = binaryToText(binary);
    expect(result).toBe(text);
  });
});
