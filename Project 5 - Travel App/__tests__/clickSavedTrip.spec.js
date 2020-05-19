import { clickSavedTrip } from "../src/client/js/clickSavedTrip"

describe("Test to ensure that the function exists", () => {
    test("Should return true", () => {
        expect(clickSavedTrip).toBeDefined();
    });
});