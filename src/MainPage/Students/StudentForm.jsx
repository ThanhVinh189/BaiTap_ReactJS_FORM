import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./slice";
import { validateStudent } from "./validation";
import "./style.scss";

const StudentForm = () => {
  const dispatch = useDispatch();
  const [student, setStudent] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStudent(student);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addStudent(student));
      setStudent({ id: "", name: "", phone: "", email: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>Thông tin sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Mã SV:</label>
            <input
              type="text"
              name="id"
              value={student.id}
              onChange={handleChange}
            />
            {errors.id && <p className="error-message">{errors.id}</p>}
          </div>
          <div className="form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <button className="add-button" type="submit">
          Thêm sinh viên
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
