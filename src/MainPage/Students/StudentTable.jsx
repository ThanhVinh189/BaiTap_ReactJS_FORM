import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, deleteStudent } from "./slice";
import { validateStudent } from "./validation";
import "./style.scss";
import SearchBar from "./SearchBar";

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const StudentTable = () => {
  const students = useSelector((state) => state.students) || [];
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (student) => {
    setEditing(true);
    setCurrentStudent(student);
    setErrors({});
  };

  const handleChange = (e) => {
    setCurrentStudent({ ...currentStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStudent(
      currentStudent,
      students.filter((student) => student.id !== currentStudent.id)
    );
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateStudent(currentStudent));
      setEditing(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(removeVietnameseTones(term));
  };

  const filteredStudents = students.filter((student) => {
    const studentId = removeVietnameseTones(student.id);
    const studentName = removeVietnameseTones(student.name);
    const studentPhone = removeVietnameseTones(student.phone);
    const studentEmail = removeVietnameseTones(student.email);

    return (
      studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} className="search-bar" />
      <table className="table-container">
        <thead className="sticky-header">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(student)}
                >
                  Sửa
                </button>
                <button
                  className="delete-button"
                  onClick={() => dispatch(deleteStudent(student.id))}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <form onSubmit={handleSubmit} className="edit-form">
          <h3>Chỉnh sửa sinh viên</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Mã SV:</label>
              <input
                type="text"
                name="id"
                value={currentStudent.id}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="name"
                value={currentStudent.name}
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
                value={currentStudent.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={currentStudent.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
          </div>
          <button type="submit" className="save-button">
            Lưu
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditing(false)}
          >
            Hủy
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentTable;
