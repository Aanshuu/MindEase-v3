"use client";
import React from "react";

export default function Todo() {
  const [text, setText] = React.useState("");
  const [submittedText, setSubmittedText] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(text);
    if (text.trim() !== "") {
      setSubmittedText((prevState) => [...prevState, text]);
      setText("");
    }
  }
  function update(event) {
    setText(event.target.value);
  }
  function handleDelete(index) {
    setSubmittedText((prevState) =>
        prevState.filter((_,i)=> i !== index) 
    )
  }
  return (
    <div className="justify-center items-center flex h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            id="text"
            type="text"
            placeholder="list"
            value={text}
            onChange={update}
            className="flex"
          />
          <button type="submit">Submit</button>
          {submittedText.length > 0 && (
            <div>
              {submittedText.map((item, index) => (
                <ul className="flex">
                  <li key={index}>{item}</li>
                  <button onClick={() => handleDelete(index)}className="ml-4">delete</button>
                </ul>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
