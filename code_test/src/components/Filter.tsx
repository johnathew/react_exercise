const Filter = (props: any) => {
  return (
    <div>
      <label>Filter results by language</label>
      <select name={props.filter} onChange={props.filterHandler}>
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="Ruby">Ruby</option>
        <option value="C++">C/C++</option>
      </select>
      <button type="submit">Filter</button>
    </div>
  );
};

export default Filter;
{
  /* <button onClick={props.tsFilter}>Javascript</button>
<button onClick={props.tsFilter}>Typescript </button>
<button onClick={props.cFilter}>C/ C++</button>
    
<button onClick={props.javaFilter}>Java</button> */
}
