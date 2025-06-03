function AddNew() {
  return (
    <>
      <h1>Add New Entry</h1>
      <div id="wrapper">
        <form id="paper" method="get" action="">
          <div id="margin">
            Title: <input id="title" type="text" name="title" />
          </div>
          <textarea
            placeholder="Enter something funny."
            id="text"
            name="text"
            rows="4"
            style={{
              overflow: "hidden",
              wordWrap: "break-word",
              resize: "none",
              height: "160px",
            }}
          ></textarea>
          <br />
          <input id="button" type="submit" value="Create" />
          <button id="startBtn">Start</button>
          <button id="stopBtn">Stop</button>

          <button id="clearBtn">Clear</button>
          <button id="copyBtn">Copy</button>
        </form>
      </div>
    </>
  );
}
export default AddNew;
