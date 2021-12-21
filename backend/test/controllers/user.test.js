const { getAll, getUser, addUser, updateUser, deleteUser } = require("../../src/controllers/user");

describe("Testing user controllers", () => {
    it("Gets an array of all users", async () => {
        const result = await getAll();

        expect(Array.isArray(result)).toBe(true);
        result.forEach((userObject) => expect("id" in userObject).toBe(true));
    });

    it("Gets an individual user by ID.", async () => {
        const sampleRequest = { params: { id: 2 } };
        const result = await getUser(sampleRequest);

        expect("id" in result).toBe(true);
        expect("name" in result).toBe(true);
    });

    it("Adds a user", async () => {
        const sampleRequest = { body: { name: "Jimbo Jones"} };
        const result = await addUser(sampleRequest);

        expect("id" in result).toBe(true);
        expect("name" in result).toBe(true);
        expect(result.name).toBe("Jimbo Jones");
    });

    it("Modifies a user", async () => {
        const sampleRequest = { 
            params: {
                id: 2
            }, 
            body: {
                name: "Delroy Lindo"
            }
        };
        const result = await updateUser(sampleRequest);
        
        expect(result.name).toBe("Delroy Lindo");
    });

    it("Deletes a user", async () => {
        const sampleRequest = {
            params: {
                id: 2
            }
        };
        const result = await deleteUser(sampleRequest);

        expect("message" in result).toBe(true);
        expect(result.message).toBe("Deleted user with ID 2");
    });
});