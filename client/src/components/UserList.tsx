import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const UserList = () => {
  const getUsers = async () => {
    const res = await axios.get("/api/users");

    return res.data;
  };

  const { data, isLoading } = useQuery("users", getUsers, {
    staleTime: 15000,
  });

  return (
    <div className="form__wrapper">
      <div className="users__container">
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.data.length > 0 ? (
          <table className="users__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((_: any, index: any) => (
                <tr key={index}>
                  <td>{_.name}</td>
                  <td>{_.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found!</p>
        )}
        <div className="register__link">
          <Link to="/">Back to register</Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
