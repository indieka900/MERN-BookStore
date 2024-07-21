/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export const EditBook = () => {
  const [formField, setFormFields] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5500/api/books/${id}`)
      .then((res) => {
        setFormFields({
          author: res.data.author,
          title: res.data.title,
          publishYear: res.data.publishYear,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSaveBook = () => {
    const data = {
      title: formField.title,
      author: formField.author,
      publishYear: formField.publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5500/api/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occured");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gay-500">Title</label>
          <input
            type="text"
            value={formField.title}
            onChange={(e) =>
              setFormFields((current) => ({
                ...current,
                title: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gay-500">Author</label>
          <input
            type="text"
            value={formField.author}
            onChange={(e) =>
              setFormFields((current) => ({
                ...current,
                author: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gay-500">Publish Year</label>
          <input
            type="text"
            value={formField.publishYear}
            onChange={(e) =>
              setFormFields((current) => ({
                ...current,
                publishYear: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};
