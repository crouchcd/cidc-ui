import { generateOptions } from "./utilities"

const expectedURL = "http://something.org/api/data/12345"

/**
 * Test that the option generator works
 */
test('Generates properly formatted URI', () => {
    const options = {
        endpoint: "data",
        itemID: "12345",
        token: "token"
    }
    const baseURL = "http://something.org/api"
    // const expectedOptions = {
    //     endpoint: "data",
    //     headers: {
    //         Authorization: "Bearer token"
    //     }
    // }
    expect(generateOptions(options, "GET", baseURL).uri).toEqual(expectedURL)
})
