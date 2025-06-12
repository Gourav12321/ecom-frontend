import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaPhoneAlt, FaHome, FaMapMarkerAlt, FaCity, FaGlobe, FaEdit, FaTrash } from 'react-icons/fa';
import {  toast } from 'react-toastify';
const AddressDisplay = ({ address, onEdit, onDelete, onCancel, isEditing, onSave }) => {
  const [editedAddress, setEditedAddress] = useState(address);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(editedAddress.countryCode);
  const cities = City.getCitiesOfState(editedAddress.countryCode, editedAddress.stateCode);

  const handleChange = (e) => {
    setEditedAddress({
      ...editedAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      country: selectedOption.label,
      countryCode: selectedOption.value,
      state: '',
      stateCode: '',
      city: '',
    });
  };

  const handleStateChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      state: selectedOption.label,
      stateCode: selectedOption.value,
      city: '',
    });
  };

  const handleCityChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      city: selectedOption.label,
    });
  };

  const handleSave = () => {
    onEdit(editedAddress);
    onSave(editedAddress);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {isEditing ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Edit Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={editedAddress.phoneNumber}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">House No</label>
              <input
                type="text"
                name="houseNo"
                value={editedAddress.houseNo}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Street</label>
              <input
                type="text"
                name="street"
                value={editedAddress.street}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={editedAddress.landmark}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">District</label>
              <input
                type="text"
                name="district"
                value={editedAddress.district}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Country</label>
              <Select
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.isoCode,
                }))}
                onChange={handleCountryChange}
                value={{
                  label: editedAddress.country,
                  value: editedAddress.countryCode,
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">State</label>
              <Select
                options={states.map((state) => ({
                  label: state.name,
                  value: state.isoCode,
                }))}
                onChange={handleStateChange}
                value={{
                  label: editedAddress.state,
                  value: editedAddress.stateCode,
                }}
                isDisabled={!editedAddress.countryCode}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <Select
                options={cities.map((city) => ({
                  label: city.name,
                  value: city.name,
                }))}
                onChange={handleCityChange}
                value={{ label: editedAddress.city, value: editedAddress.city }}
                isDisabled={!editedAddress.stateCode}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={editedAddress.pincode}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="ml-4 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2 text-blue-500" />
              <p><strong>Phone:</strong> {address.phoneNumber}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaHome className="mr-2 text-blue-500" />
              <p><strong>House No:</strong> {address.houseNo}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <p><strong>Street:</strong> {address.street}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <p><strong>Landmark:</strong> {address.landmark}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <p><strong>District:</strong> {address.district}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaGlobe className="mr-2 text-blue-500" />
              <p><strong>Country:</strong> {address.country}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaCity className="mr-2 text-blue-500" />
              <p><strong>State:</strong> {address.state}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaCity className="mr-2 text-blue-500" />
              <p><strong>City:</strong> {address.city}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <p><strong>Pincode:</strong> {address.pincode}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => onEdit(address)}
              className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              <FaEdit className="mr-2" />
              Edit Address
            </button>
            <button
              onClick={() => onDelete(address._id)}
              className="flex items-center ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              <FaTrash className="mr-2" />
              Delete Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressDisplay;
