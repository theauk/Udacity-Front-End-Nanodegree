import { validateInput } from "../src/client/js/validateInput";

// To handle window alerts
window.alert = jest.fn();

describe("Validate input", () => {
    test("should output true as valid input", () => {

        const input = ("location", "2020-05-18", "2020-05-19");
        const output = true;

        expect(validateInput(input, "input")).toBe(output);

    });
    test("should output false as invalid input", () => {

        window.alert.mockClear();

        const input = ("", "", "");
        const output = false;

        expect(validateInput(input, "input")).toBe(output);

    });
});