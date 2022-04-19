import React from "react";
import { Sidebar } from "../../components";
import { shallow } from "enzyme";
import { useFormatTableData } from "../../hooks";
import { formatTableColumns } from "../../hooks/useFormatTableData";

const testData = {
  data: [
    {
      id: 1,
      name: "ITI",
      signing_authority: "Lara",
      financial_contact: "Executive",
      province_state: "CA",
    },
  ],
};

describe("Testing useFormatTableData Hook", () => {
  test("The retured data should be an array of objects with a type of tableData", () => {
    return formatTableColumns(testData).then((data: unknown) => {
      console.log("data", data);
      // You expect that your Array equals,
      expect(data).toEqual(
        // an Array that contains,
        expect.arrayContaining([
          // an Object that contains,
          expect.objectContaining({
            // the following properties
            field: "id",
            headerName: "Id",
            width: 200,
            id: 0,
          }),
        ])
      );
    });
  });
});
