import { formatTableColumns } from "../../hooks/useFormatTableData";

const testData = {
  data: [{ field: "id", flex: 1, headerName: "Id", id: 3 }],
};

describe("Testing useFormatTableData Hook", () => {
  test("The retured data should be an array of objects with a type of tableData", () => {
    return formatTableColumns(testData).then((data: unknown) => {
      // You expect that your Array equals,
      expect(data).toEqual(
        // an Array that contains,
        expect.arrayContaining([
          // an Object that contains,
          expect.objectContaining({ field: "id", flex: 1 }),
        ])
      );
    });
  });
});
