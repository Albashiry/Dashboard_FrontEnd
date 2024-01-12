import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../context";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runEffect, setRunEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/user/show', {
        headers: {
          Accept: 'Application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, [runEffect]);

  async function deleteUser(id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      response.status === 200 && setRunEffect(prev => prev + 1);
    } catch (error) {
      console.log(error.response.status);
    }
  }

  return (
    <div className="users shadow">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`${user.id}`}>
                  <i className="edit fa-solid fa-pen-to-square"></i>
                </Link>
                <i className="delete fa-solid fa-trash" onClick={() => deleteUser(user.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}