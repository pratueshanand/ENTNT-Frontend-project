import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../services/user.service";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",  
    appointments: []
  });

  const { firstName, lastName, location } = user;
  const [date,setDate]  = useState("")
  const [time, setTime]  = useState("")

  const onInputChange = e => {
    if(e.target.name==="date"){
      setDate(e.target.value);
      return 
    }
    if(e.target.name==="time"){
      setTime(e.target.value);
      return
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    var userData = user;
    userData={...userData, appointments:[`${date} ${time}`]};
    await createUser(userData);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Client</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your firstName"
              name="firstName"
              value={firstName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your lastName"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your location"
              name="location"
              value={location}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter the Date"
              name="date"
              value={date}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="time"
              className="form-control form-control-lg"
              placeholder="Enter the Time"
              name="time"
              value={time}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
