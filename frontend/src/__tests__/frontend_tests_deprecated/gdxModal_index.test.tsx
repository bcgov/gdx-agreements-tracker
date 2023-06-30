import React from "react";
import { mount } from "enzyme";
import { GDXModal } from "components/GDXModal";

const editMode = false;
const allowEdit = false;
const allowDelete = false;

const handleEditMode = () => {
  jest.fn();
};
const handleClose = () => {
  jest.fn();
};
const handleDelete = () => {
  jest.fn();
};
const handleFormType = () => {
  jest.fn();
};

describe("Tests different renders of the <Renderer /> component", () => {
  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = ({ open }: { open: boolean }) => {
    return mount(
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={"test title"}
        handleEditMode={handleEditMode}
        editMode={editMode}
        allowEdit={allowEdit}
        allowDelete={allowDelete}
        handleDelete={handleDelete}
        handleFormType={handleFormType}
      >
        <div>Mock Div</div>
      </GDXModal>
    );
  };

  it("snapshot test for modal open", () => {
    expect(wrapper({ open: true }).html()).toMatchSnapshot();
  });

  it("snapshot test for modal closed", () => {
    expect(wrapper({ open: false }).html()).toMatchSnapshot();
  });
});
