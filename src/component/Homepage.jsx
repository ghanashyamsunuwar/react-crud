import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Form from "./Form";
import Edit from "./Edit";

function Homepage() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [editData, setEditData] = useState();
  const [editModal, setEditModal] = useState(false);

  //for next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const changePage = (id) => {
    setCurrentPage(id);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDelete = (id) => {
    console.log(id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("allData", JSON.stringify(updatedData));
  };
  const handleEdit = (id) => {
    const selectData = data.filter((item) => item.id === id);
    setEditData(selectData);
    setEditModal(true);
  };
  useEffect(() => {
    const firstData = JSON.parse(localStorage.getItem("allData")) || [];
    setData(firstData);
  }, []);

  const fetchData = () => {
    const saveData = JSON.parse(localStorage.getItem("allData")) || [];
    setData(saveData);
    console.log("janam", data);
  };
  useEffect(() => {
    if (updateData) {
      fetchData();
    }
    setUpdateData(false);
  }, [updateData]);

  const handleUpdateData = () => {
    setUpdateData(true);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleEditToggle = () => {
    setEditModal(!editModal);
  };
  return (
    <div className="main-homepage">
      <span style={{fontSize:'20px'}}>CRUD Opeartion on React</span>
      <div className="btn">
        <button onClick={handleToggle}>Add Data</button>
      </div>
      <div>
        {toggle && (
          <Form toggle={handleToggle} onUpdateData={handleUpdateData} />
        )}
      </div>
      <div>
        {editModal && (
          <Edit
            data={editData}
            onUpdateData={handleUpdateData}
            toggle={handleEditToggle}
          />
        )}
      </div>
      <div className="table-head">
        <table>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id}>
                <td>
                  <img className="image" src={item.image} />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  {item.city},{item.district},{item.province},{item.country}
                </td>
                <td>{item.dob}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>edit</button>
                  <button
                    className="action-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        <div className="pagination">
          <span onClick={prevPage}>◀</span>
          {number.map((n, i) => (
            <span
              className={currentPage === n ? "span-color" : ""}
              onClick={() => changePage(n)}
            >
              {n}{" "}
            </span>
          ))}

          <span onClick={nextPage}>▶</span>
        </div>
      }
    </div>
  );
}

export default Homepage;
