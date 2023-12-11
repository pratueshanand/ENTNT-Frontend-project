import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  eraseUser,
  getAllUsers,
  updateUser,
} from "../../services/user.service";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await getAllUsers();
    setUser(result.reverse());
  };

  const deleteUser = async (id) => {
    await eraseUser(id);
    alert("Client Deleted Successfully!");
    loadUsers();
  };

  const editAppointment = async (user) => {
    await updateUser(user.id, user);
    loadUsers();
  };

  const deleteAppointment = async (user, appointment) => {
    user.appointments = user.appointments.filter((app) => app !== appointment);
    await updateUser(user.id, user);
    alert("Appointment Deleted Successfully!")
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>All Clients</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Location</th>
              <th scope="col">Appointments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th
                  scope="row"
                  align="center"
                  style={{ verticalAlign: "center" }}
                  className=" text-center"
                >
                  {index + 1}
                </th>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.location}</td>
                <td>
                  {user?.appointments?.map((appointment, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center bg-light shadow-sm rounded-lg py-1 m-2 px-2"
                    >
                      <div>{appointment}</div>
                      <div className="d-flex">
                        <button
                          onClick={() => editAppointment(user)}
                          type="button"
                          className="btn btn-outline-secondary mr-2 w-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pen"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteAppointment(user, appointment)}
                          type="button"
                          className="btn btn-outline-danger "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  <div className="d-flex mb-2" style={{ gap: "10px" }}>
                    <Link
                      className="btn btn-primary w-50"
                      to={`/users/${user.id}`}
                    >
                      View Client Details
                    </Link>
                    <Link
                      className="btn btn-outline-primary w-50"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit Client Details
                    </Link>
                  </div>
                  <div className="d-flex mb-2" style={{ gap: "10px" }}>
                    <Link
                      className="btn btn-outline-dark w-50"
                      to={`/add-appointment/${user.id}`}
                    >
                      New appointment
                    </Link>
                    <Link
                      className="btn btn-danger w-50"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete Client
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
