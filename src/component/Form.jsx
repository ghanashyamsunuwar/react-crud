import React, { useEffect, useState } from "react";
import "./Form.css";
import Validation from "./Validation";

function Form({ toggle, onUpdateData }) {
  const [allData, setAllData] = useState([]);
  const [country, setCountry] = useState([]);
  const [formData, setFormData] = useState({
    id: Date.now(),
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

  const [errors, setErrors] = useState({});

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

  // Load data from local storage on component mount
  useEffect(() => {
    const newDatas = JSON.parse(localStorage.getItem("allData")) || [];
    setAllData(newDatas);
  }, []);
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

  // Save data to local storage
  const handleSaveData = (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the form submission if there are validation errors
    }

    const newData = [...allData, formData];
    setAllData(newData);
    localStorage.setItem("allData", JSON.stringify(newData));
    setFormData({
      id: Date.now(),
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
    setErrors({});
    onUpdateData();
    toggle();
  };

  return (
    <div className="form-container">
      <div className="overlay">
        <div className="title-space">
          <div>
            <span className="title">Add Data</span>
          </div>
          <div className="close-btn">
            <button onClick={toggle}>X</button>
          </div>
        </div>
        <form className="form" onSubmit={handleSaveData}>
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="required">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="required">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="number"
              placeholder="Please enter your number"
              value={formData.number}
              onChange={handleChange}
              required
            />
            {errors.number && <p className="required">{errors.number}</p>}
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="required">{errors.dob}</p>}
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
                <option value="">--Select Province--</option>
                <option value="Koshi">Koshi Province</option>
                <option value="Madhesh">Madhesh Province</option>
                <option value="Bagmati">Bagmati Province</option>
                <option value="Gandaki">Gandaki Province</option>
                <option value="Lumbini">Lumbini Province</option>
                <option value="Karnali">Karnali Province</option>
                <option value="Sudurpashchim">Sudurpashchim Province</option>
              </select>
              <select style={{maxWidth:'100px'}} 
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">--Select Country--</option>
                {country.map((country) => (
                  <option style={{maxWidth:'100px'}} key={country.name.common} value={country.name.common}>
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

export default Form;
