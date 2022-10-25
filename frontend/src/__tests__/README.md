# Code Tesing Readme


## Definitions

### **describe():**
This function allows for you to wrap multiple tests into what is called a test suite


### **mount.debug():** 
Shows the compiled JSX(HTML). This helps to see what is rendered from your component and makes it easier to see what to test for.

### **shallow():**
Used to render a component but not its children

### **mount():**
If you need to test a component as a whole with its children use mount()



### Enzyme Definitions:

### [shallow](https://enzymejs.github.io/enzyme/docs/api/shallow.html)

### [mount](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/mount.html)




### **Simple example:**

```
describe("a description of your test suite", () => {


  it("renders the ReadForm component", () => {
    expect(shallow(<div>Example text<div/>).html()).toMatchSnapshot();
  });

}
```

### **Advanced example:**

```
describe("a description of your test suite", () => {

  const fields = [
    {
      width: "full",
      title: "Mock Title",
      value: "Mock Value",
    },
    {
      width: "half",
      title: "Mock Title 2",
      value: 2,
    },
  ];

  const wrapper = shallow(<ReadForm fields={fields} />);
  const readFieldComponent = wrapper.find(ReadField);

  it("Tries to match the ReadField title prop", () => {
     expect(readFieldComponent.props().width).toEqual("full");
  });

}
```

### **Very advanced example:**

```
const mockFunction = jest.fn();  //This is a mock function https://jestjs.io/docs/mock-functions

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

```

<br />

