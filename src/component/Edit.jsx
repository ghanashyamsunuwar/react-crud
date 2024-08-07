import React, { useEffect, useState } from "react";
import "./Form.css";

function Edit({ toggle, data, onUpdateData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    district: "",
    province: "",
    country: "",
    dob: "",
    image: "",
  });
  const [allData, setAllData] = useState([]);
  const [country, setCountry] = useState([]);

  // Load data from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("allData")) || [];
    setAllData(storedData);
  }, []);

  // Populate form with existing data when editing
  useEffect(() => {
    if (data) {
      setFormData({
        name: data[0].name,
        email: data[0].email,
        number: data[0].number,
        city: data[0].city,
        district: data[0].district,
        province: data[0].province,
        country: data[0].country,
        dob: data[0].dob,
        image: data[0].image,
      });
    }
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched countries:"); // Log the fetched data
        setCountry(result); // Update state with fetched data
        console.log(country);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData(); // Ensure this is called to initiate the fetch
  }, []);

  console.log("data", formData);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // Save data to local storage
  const handleSaveData = (e) => {
    e.preventDefault();

    // Ensure formData contains the id from the original data
    const updatedData = allData.map((item) =>
      item.id === data[0].id ? { ...formData, id: data[0].id } : item
    );

    setAllData(updatedData);
    localStorage.setItem("allData", JSON.stringify(updatedData));

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      number: "",
      city: "",
      district: "",
      province: "",
      country: "",
      dob: "",
      image: "",
    });

    onUpdateData();
    toggle();
  };

  return (
    <div className="form-container">
      <div className="overlay">
        <div className="title-space">
          <div>
            <span className="title">Edit Data</span>
          </div>
          <div className="close-btn">
            <button onClick={toggle}>X</button>
          </div>
        </div>
        <form className="form" onSubmit={handleSaveData}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="number"
              placeholder="Please enter your number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <div className="address-sub">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="Koshi">Koshi Province</option>
                <option value="Madhesh">Madhesh Province</option>
                <option value="Bagmati">Bagmati Province</option>
                <option value="Gandaki">Gandaki Province</option>
                <option value="Lumbini">Lumbini Province</option>
                <option value="Karnali">Karnali Province</option>
                <option value="Sudurpashchim">Sudurpashchim Province</option>
              </select>
              <select
                style={{ maxWidth: "100px" }}
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">--Select Country--</option>
                {country.map((country) => (
                  <option
                    style={{ maxWidth: "100px" }}
                    key={country.name.common}
                    value={country.name.common}
                  >
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/png"
            />
            {formData.image && (
              <div className="image-preview">
                <img
                  className="image-preview"
                  src={formData.image}
                  alt="Profile Preview"
                />
              </div>
            )}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
