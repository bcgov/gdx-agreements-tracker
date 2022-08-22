import { formatTableColumns } from "../../hooks/useFormatTableData";

const testData = {
  data: { data: [{ field: "id", flex: 1, headerName: "Id", id: 3 }] },
};

describe("Testing useFormatTableData Hook", () => {
  test("The retured data should be an array of objects with a type of tableData", () => {
    return formatTableColumns(testData).then((data: unknown) => {
      // You expect that your Array equals,
      expect(data).toEqual(
        // an Array that contains,
        expect.objectContaining({
          // an Object that contains,
          rows: [{ field: "id", flex: 1, headerName: "Id", id: 3 }],
          // an array that contains,
          columns: expect.arrayContaining([
            { field: "field", flex: 1, headerName: "Field", id: 0, hide: false },
            { field: "flex", flex: 1, headerName: "Flex", id: 1, hide: false },
          ]),
        })
      );
    });
  });
});
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
