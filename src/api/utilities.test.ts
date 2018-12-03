import { generateOptions } from "./utilities"

const expectedURL = "http://something.org/api/data/12345"

test('Generates properly formatted URI', () => {
    const options = {
        endpoint: "data",
        itemID: "12345"
    }
    const baseURL = "http://something.org/api"
    expect(generateOptions(options, "GET", baseURL).uri).toEqual(expectedURL)
})