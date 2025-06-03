import React from 'react'
import { useState } from 'react';
import { registerAPI } from '../Services/allAPI';

const Add = () => {
  const [userInput, setUserInput] = useState({
      name: "",
      email: "",
      phone:"",
      password: "",
    });
    console.log(userInput);
    const [errors, setErrors] = useState({});
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    const validatePhone = (phone) => {
      const regex = /^\+\d{10,15}$/; // + followed by 10–15 digits
      return regex.test(phone);
    }
    const addAgent = async (e) => {
      e.preventDefault();
      const newErrors = {};
      if (!validateEmail(userInput.email)) {
        newErrors.email = "Invalid email";
      }
      

      if (!validatePhone(userInput.phone)) {
        newErrors.phone = "Invalid phone (use + followed by country code)";
      }
      setErrors(newErrors)
      if (Object.keys(newErrors).length > 0){
        return 
      }
        if (
          userInput.name &&
          userInput.email &&
          userInput.phone &&
          userInput.password
        ) {
          // api call
          console.log("api call");
          const token = sessionStorage.getItem("token");
          if (token) {
            try {
              const result = await registerAPI(userInput);
              console.log(result);

              if (result.status == 200) {
                alert("Agent added Succesfully");
                setUserInput({ name: "", email: "", phone: "", password: "" });
              } else {
                if (result.response.status == 406) {
                  alert(result.response.data);
                }
              }
            } catch (err) {
              console.log(err);
            }
          } else {
            alert("please login");
          }
        } else {
          alert("Please fill the form");
        }
    };
    
  return (
    <div className="m-3 px-4">
      <h4>Add New Agent</h4>
      <input
        type="text"
        value={userInput.name}
        onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
        placeholder="Name"
        className="block w-full mx-3 px-2 py-1.5 rounded-md shadow bg-transparent border border-white"
      />
      <input
        type="email"
        value={userInput.email}
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
        placeholder="Email"
        className="block w-full m-3 px-2 py-1.5 rounded-md shadow bg-transparent border border-white "
      />
      {errors.email && (
        <p className="text-red-500 text-start ms-3 -mt-5">{errors.email}</p>
      )}
      <input
        type="text"
        value={userInput.phone}
        onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
        placeholder="Phone number with country code"
        className="block w-full m-3 px-2 py-1.5 rounded-md shadow bg-transparent border border-white "
      />
      {errors.phone && (
        <p className="text-red-500 text-start ms-3 -mt-5">{errors.phone}</p>
      )}
      <input
        type="password"
        value={userInput.password}
        onChange={(e) =>
          setUserInput({ ...userInput, password: e.target.value })
        }
        placeholder="Password"
        className="block w-full m-3 px-2 py-1.5 rounded-md shadow bg-transparent border border-white"
      />

      <button
        onClick={addAgent}
        className="w-full h-10 mx-3 rounded-md bg-pink-600"
      >
        Add Agent
      </button>
    </div>
  );
}

export default Add