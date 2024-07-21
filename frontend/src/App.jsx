// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ShowBooks } from "./pages/ShowBooks";
import { DeleteBook } from "./pages/DeleteBook";
import { EditBook } from "./pages/EditBook";
import { CreateBook } from "./pages/CreateBook";

const App = () => {
  return (
    <Routes>
      <Route path='/' element= {<Home />} />
      <Route path='/books/create' element= {<CreateBook />} />
      <Route path='/books/details/:id' element= { <ShowBooks />} />
      <Route path='/books/edit/:id' element= {<EditBook />} />
      <Route path='/books/delete/:id' element= {<DeleteBook />} />
    </Routes>
  );
}

export default App