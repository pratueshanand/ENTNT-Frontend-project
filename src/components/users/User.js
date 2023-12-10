import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/user.service";

const User = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",  
    appointments: []
  });

  const { firstName, lastName, location, appointments } = user;

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await getUser(id);
    setUser(res);
  };
  
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">First Name: {firstName}</li>
        <li className="list-group-item">Last Name: {lastName}</li>
        <li className="list-group-item">Location: {location}</li>
        <li className="list-group-item">Appointment: {appointments.map(
          (appointment, index)=> <div key="index"> {appointment} </div>
        )}</li>
      </ul>
    </div>
  );
};

export default User;
