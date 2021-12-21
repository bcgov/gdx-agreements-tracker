# GDX Agreements Tracker API

## Description


## Testing

### Run

Test runner: [Jest](https://jestjs.io/)

Test utilities:
- [light-my-request](https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject)

To run tests, simply run `npm test`.

To debug, run `npm run test:debug`.

To get a test coverage report, run `npm run test:coverage`.

### Write
Many of the codebase's functions are asynchronous. In order to test them, you'll need to pass an "async" function as the second argument to `it()`. Within that function, you'll need to "await" the function you're testing. For example:

```
it("tests an asynchronous function", async () => {
    const result = await functionToTest();
});
```