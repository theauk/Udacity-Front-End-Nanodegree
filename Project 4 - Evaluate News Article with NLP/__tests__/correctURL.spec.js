import { correctURL } from "../src/client/js/correctURL";

describe("Correct URL", () => {
    test("should output true as valid URL", () => {

        const input = "https://www.url1.dev";
        const output = true;

        expect(correctURL(input, "URL")).toBe(output);

    });
    test("should output false as valid URL", () => {

        const input = "url1";
        const output = false;

        expect(correctURL(input, "URL")).toBe(output);

    });
});