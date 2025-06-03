import React from 'react'
import Add from '../Components/Add'
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { useState } from 'react'
import { uploadCsvAPI } from '../Services/allAPI'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [value, setValue] = useState()
  const [file, setFile] = useState(null)
    const [agents, setAgents] = useState([])
    const navigate = useNavigate()
    // console.log(agents)
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Please login");
        navigate("/"); 
      }
    }, [navigate])
    const fileInputRef = useRef(null)
    const handleUpload = async () => {
      const token = sessionStorage.getItem("token");
          if(token){
      if (!file) return alert("Please select a file!");
  
      const allowedTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!allowedTypes.includes(file.type)) {
        return alert("Only CSV, XLSX, and XLS files are allowed.");
      }
      const reqBody = new FormData();
      reqBody.append("file", file);
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try{
        const result = await uploadCsvAPI(reqBody,reqHeader)
        if(result.status==200){
         alert("File Uploaded")
         setAgents(result.data.agents);
         setFile(null);
         if (fileInputRef.current) {
           fileInputRef.current.value = ""
         }
        
        }
     }catch(err){
       console.log(err);
       
     }}
    }
  return (
    <div className="text-center">
      <h1 className="my-4">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-white ">
        <Add />
        {/* upload */}
        <div className="m-3 px-4">
          <h4>Upload CSV & Distribute Tasks</h4>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full m-3 px-2 py-1.5 rounded-md shadow bg-transparent border border-white"
          />
          <p className="text-start mx-3  -mt-5">
            *Only CSV, xlsx, xls files allowed
          </p>
          <button
            onClick={handleUpload}
            className="w-full h-10 mx-3 rounded-md bg-pink-600"
          >
            Upload & Distribute
          </button>
        </div>
      </div>
      <h2 className="mt-12">Agents</h2>

      <div className="table-section m-4 ">
        <table className="table-auto w-full">
          <thead className="border">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody className="border">
            {agents.map((agent, idx) => (
              <tr key={agent._id}>
                <td>{idx + 1}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.phone}</td>
                <td>
                  <ul className="list-disc ml-4">
                    {agent.tasks.map((task, i) => (
                      <li key={i}>
                        {task.firstname}, {task.phone}, {task.notes}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard