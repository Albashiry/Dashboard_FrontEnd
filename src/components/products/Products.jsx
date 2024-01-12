import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../context";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [runEffect, setRunEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/product/show', {
        headers: {
          Accept: 'Application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, [runEffect]);

  async function deleteProduct(id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      
      response.status === 200 && setRunEffect(prev => prev + 1);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="users shadow">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                <Link to={`${product.id}`}>
                  <i className="edit fa-solid fa-pen-to-square"></i>
                </Link>
                <i className="delete fa-solid fa-trash" onClick={() => deleteProduct(product.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}