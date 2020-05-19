import { newSearch } from "../src/client/js/newSearch"

describe("Test to ensure that the function exists", () => {
    test("Should return true", () => {
        expect(newSearch).toBeDefined();
    });
});