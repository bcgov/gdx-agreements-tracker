import React from "react";
import { mount, shallow } from "enzyme";
import { Table } from "components";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const mockFunction = jest.fn();

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "edit",
    headerName: "edit",
    width: 60,
    editable: true,
    renderCell: () => {
      return (
        <IconButton className="mockButton" onClick={mockFunction}>
          <RemoveRedEyeIcon />
        </IconButton>
      );
    },
  },
];

const rows = [{ id: 1 },{ id: 2 },{ id: 3 }]

describe("Tests different renders of the <Renderer /> component", () => {
  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = ({ loading, allowEdit }: { loading: boolean; allowEdit?: boolean }) => {
    return mount(
      <Table
        rows={rows}
        columns={columns}
        loading={loading}
        allowEdit={allowEdit}
      />
    );
  };

  it("test 1", () => {
    expect(wrapper({ loading: false, allowEdit: true }).html()).toMatchSnapshot();
  });

  it("test 2", () => {
    wrapper({ loading: false, allowEdit: true }).find(".mockButton").hostNodes().at(0).simulate("click");
    expect(mockFunction.mock.calls.length).toEqual(1);
  });
});
