import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RiderProfile = ({ riderId }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        adhaharNumber: "",
        panNumber: "",
        age: "",
        gender: "",
        policeCase: "",
        typeOfVan: "",
        nameOfVan: ""
    });

    useEffect(() => {
        // Fetch rider info based on riderId
        axios.get(`/api/riders/${riderId}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            });
    }, [riderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated rider data to the server
        axios.put(`/api/riders/${riderId}`,formData)
            .then(response => {
                console.log('Rider info updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating rider info:', error);
            });
    };

    return (
            <div className="body">
  <div className="center-div">
    <div className="heading">
      <h2>Update  Profile</h2>
    </div>
    <div className="content">
      <div>
        <label className="input-label">
          Name:
          <input
            className="input-field"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Email:
          <input
            className="input-field"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Password:
          <input
            className="input-field"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Phone Number:
          <input
            className="input-field"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          City:
          <input
            className="input-field"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Aadhaar Number:
          <input
            className="input-field"
            type="text"
            name="adhaharNumber"
            value={formData.adhaharNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          PAN Number:
          <input
            className="input-field"
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Age:
          <input
            className="input-field"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="input-label">
          Gender:
          <select
            className="input-field"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div>
        <label className="input-label">
          Police Case:
          <select
            className="input-field"
            name="policeCase"
            value={formData.policeCase}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>
      <div>
        <label className="input-label">
          Type of Van:
          <select
            className="input-field"
            name="typeOfVan"
            value={formData.typeOfVan}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="2 Wheeler">2 Wheeler</option>
            <option value="3 Wheeler">3 Wheeler</option>
            <option value="4 Wheeler">4 Wheeler</option>
          </select>
        </label>
      </div>
      <div>
        <label className="input-label">
          Name of Van:
          <input
            className="input-field"
            type="text"
            name="nameOfVan"
            value={formData.nameOfVan}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button style={{backgroundColor:"#007bff"}} onClick={handleSubmit}>Update</button>
    </div>
  </div>
</div>
    );
};

export default RiderProfile;
