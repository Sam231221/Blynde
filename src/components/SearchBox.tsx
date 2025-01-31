import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let redirect = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      redirect(`/?keyword=${keyword}&page=1`);
    } else {
      redirect(window.location.pathname);
      //redirect(-1) go back one page
    }
  };
  return (
    <Form onSubmit={submitHandler} className="form-inline">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
