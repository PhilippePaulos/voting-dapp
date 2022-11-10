/**
 * Display a component if condition is true
 * @param {*} param0 
 * @returns 
 */
 function OptionalComponent({ children, condition, disableHr }) {

    const component =
      <>
        {children}
      </>
    return (
      <>
        {condition ? component : null}
      </>
    )
  }

  export default OptionalComponent;