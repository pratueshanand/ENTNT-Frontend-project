import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { getUser, updateUser } from '../../services/user.service';

const AddAppointment = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",  
    appointments: []
  });

  const [date,setDate]  = useState("")
  const [time, setTime]  = useState("")

  useEffect(() => {
    loadUser();
  }, []);

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
    userData={...userData, appointments:[...userData.appointments, `${date} ${time}`]};
    await updateUser(id, userData);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await getUser(id);
    setUser(result);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add An Appointment</h2>
        <form onSubmit={e => onSubmit(e)}>
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
          <button className="btn btn-primary btn-block">Add Appointment</button>
        </form>
      </div>
    </div>
  )
}

export default AddAppointment