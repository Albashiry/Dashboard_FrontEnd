import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordToggle } from '../sections';
import axios from 'axios';
import { User } from '../context';

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [submited, setSubmited] = useState(false);

  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmited(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      // for (let key of formData.entries()) {console.log(key[0]+': '+key[1])}
      // console.log(formData.get("title"))

      let response = await axios.post("http://127.0.0.1:8000/api/product/create", 
        formData,
        {
          headers:
          {
            Authorization: "Bearer " + token
          }
        });
      if (response.status === 200) {
        nav('/dashboard/product/create');
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setSubmited(false);
    }
  }

  return (
    <>
      <div className="signup">
        <form action="" className="form shadow" style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <span>
            <input
              type="text"
              id="title"
              placeholder="Title..."
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            {submited && title === "" && <p className='error'>title is required</p>}
          </span>

          <label htmlFor="description">Description: </label>
          <span>
            <input
              type="text"
              id="description"
              value={description}
              placeholder="Description..."
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* {submited && errorStatus === 422 && <p className='error'>The email has already been taken.</p>} */}
          </span>

          <label htmlFor="image">Image: </label>
          <span>
            <input
              type="file"
              id="image"
              placeholder="Image..."
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            {/* {submited && !acceptPassword && <p className='error'>must fill a valid password</p>} */}
          </span>


          <span className="register">
            <button type="submit" value="register">
              Create Product
            </button>
          </span>
        </form>
      </div>
    </>
  )
}