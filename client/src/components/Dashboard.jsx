import React from 'react';
import UploadForm from './UploadForm'
import ListMyFiles from './ListMyFiles'
import axios from 'axios'
import {navigate} from "@reach/router"
import {useContext,useEffect} from 'react'
import {FilesContext} from "../App";
import Cookies from 'js-cookie';

const Dashboard = ({setMyFiles}) => {
  const {newUpload} = useContext(FilesContext)
 
  const clickHandler = e =>{
    e.preventDefault();
    axios.get("http://localhost:8000/api/user/logout",{withCredentials:true})
    setMyFiles([])
    Cookies.remove('userId')
    navigate("/")
  }

  useEffect(async () =>{
    await axios.get(`http://localhost:8000/api/files/${Cookies.get('userId')}`)
    .then(res =>{
      console.log("resp getAllFiles", res)
      setMyFiles(res.data)
    })
    .catch(err => console.log("err of get all",err))
  },[newUpload])
  return (
    <div>
    <nav className="navbar navbar-light" style={{backgroundColor: "#315399",
    color:"white", display: "flex", justifyContent: "space-evenly"}}>
      <h4>FileZilla</h4>
      <button onClick={clickHandler} className="btn btn-outline-secondary">Log Out</button>
    </nav>
      <div style={{display:"flex", alignItems: "flex-start",justifyContent:"center", margin:"2rem"}}>
      	<UploadForm/>
      	<ListMyFiles setMyFiles={setMyFiles}/>
      </div>
    </div>
  )
}

export default Dashboard;