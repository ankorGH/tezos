import { defaultText } from "../helpers"

describe("/Utils/Helpers", () => {
    describe("DefaultText", () => {
        test("defaultText should be '--'", () => {
            expect(defaultText).toBe("--")
        })
    })
})