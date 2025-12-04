import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8081/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleEdit = (student, index) => {
    setEditIndex(index);
    setEditData(student);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditData({});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:8081/student/${id}`, editData);
      fetchStudents(); // reload table
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/student/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student List <button
        className="btn btn-success"
        onClick={() => navigate("/create")}
      >
        ✔Register Student
      </button></h2>


      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Location</th>
            <th>Actions<button
              className="btn btn-primary btn-sm ms-3"
              onClick={fetchStudents}
            >
              🔄 Refresh
            </button></th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu, index) => (
            <tr key={stu.id}>
              {editIndex === index ? (
                <>
                  {/* Editable Row */}
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.firstName}
                      onChange={(e) =>
                        setEditData({ ...editData, firstName: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="email"
                      className="form-control"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSave(stu.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {/* Normal Display Row */}
                  <td>{stu.firstName}</td>
                  <td>{stu.email}</td>
                  <td>{stu.age}</td>
                  <td>{stu.location}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(stu, index)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(stu.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
