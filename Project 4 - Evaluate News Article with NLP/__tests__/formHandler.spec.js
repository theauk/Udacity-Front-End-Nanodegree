import { handleSubmit } from "../src/client/js/formHandler";

describe("Form handler", () => {
    test("Function should be defined", () => {
        expect(handleSubmit).toBeDefined;
    });
});