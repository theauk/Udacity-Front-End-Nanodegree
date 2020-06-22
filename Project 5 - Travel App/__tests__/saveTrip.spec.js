import { saveTrip } from "../src/client/js/saveTrip"

describe("Test to ensure that the function exists", () => {
    test("Should return true", () => {
        expect(saveTrip).toBeDefined();
    });
});