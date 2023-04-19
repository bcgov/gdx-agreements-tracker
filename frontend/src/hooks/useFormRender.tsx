/**
 * This is a TypeScript React function that returns a renderForm function based on editMode and
 * currentUser values.
 *
 * @param                 editForm    - a JSX element that represents the form to be displayed in edit mode.
 * @param                 readForm    - JSX element representing the form in read-only mode. This means that the form
 *                                    cannot be edited and is only meant for viewing purposes.
 * @param   {boolean}     editMode    - A boolean value that indicates whether the form is in edit mode or not.
 *                                    If it is true, then the editForm will be rendered, otherwise the readForm will be rendered.
 * @param   {boolean}     currentUser - The `currentUser` parameter is a boolean value that indicates whether
 *                                    the current user is the owner of the form or not. It is used in the `renderForm` function to
 *                                    determine whether to display the `editForm` or `readForm`. If `currentUser` is true, the `editForm
 * @returns {JSX.Element}             Returns either an Edit form or Read form, which form returned is determined the renderForm condition.
 */
const useFormRender = (
  editForm: JSX.Element,
  readForm: JSX.Element,
  editMode: boolean,
  currentUser: boolean
) => {
  const renderForm = () => {
    if (editMode || currentUser) {
      return editForm;
    } else {
      return readForm;
    }
  };

  return [renderForm];
};

export default useFormRender;
