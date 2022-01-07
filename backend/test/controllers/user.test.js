const { getAll, getOne, addOne, updateOne, deleteOne } = require("../../src/controllers/users");
const userModel = require("../../src/models/users.js");
// Mock user DB methods.
jest.mock("../../src/models/users");

describe("Testing user controllers", () => {
    it("Gets an array of all users", async () => {
        userModel.findAllUsers.mockResolvedValue([{ id: 1, name: 'Jimbo' }]);
        const result = await getAll();

        expect(Array.isArray(result)).toBe(true);
        result.forEach((userObject) => expect("id" in userObject).toBe(true));
    });

    it("Gets an individual user by ID.", async () => {
        userModel.findUserById.mockResolvedValue([{ id: 2, name: 'Jimbo' }]);
        const sampleRequest = { params: { id: 2 } };
        const result = await getOne(sampleRequest);

        expect("id" in result).toBe(true);
        expect("name" in result).toBe(true);
    });

    it("Adds a user", async () => {
        userModel.addUser.mockResolvedValue({ id: 2, name: 'Jimbo Jones' });
        const sampleRequest = { body: { name: "Jimbo Jones"} };
        const result = await addOne(sampleRequest);

        expect("id" in result).toBe(true);
        expect("name" in result).toBe(true);
        expect(result.name).toBe("Jimbo Jones");
    });

    it("Modifies a user", async () => {
        userModel.updateUser.mockResolvedValue({ id: 2, name: 'Delroy Lindo' });
        const sampleRequest = { 
            params: {
                id: 2
            }, 
            body: {
                name: "Delroy Lindo"
            }
        };
        const result = await updateOne(sampleRequest);
        
        expect(result.name).toBe("Delroy Lindo");
    });

    it("Deletes a user", async () => {
        userModel.removeUser.mockResolvedValue({ id: 2, name: 'Delroy Lindo' });
        const sampleRequest = {
            params: {
                id: 2
            }
        };
        const result = await deleteOne(sampleRequest);

        expect("message" in result).toBe(true);
        expect(result.message).toBe("Deleted user with id 2");
    });
});
