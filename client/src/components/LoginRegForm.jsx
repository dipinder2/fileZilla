import React,{useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'
import logo from '../Images/bin-logo.png'; // with import
import Cookies from 'js-cookie';
const LoginRegForm = (props) => {

	const [credentials,setCredentials] = useState({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:"",
	});
	const [logincredentials,setLoginCredentials] = useState({
		email:"",
		password:""
	});

	const [validState,setValidState] = useState({
		firstName:false,
		lastName:false,
		email:false,
		password:false,
		confirmPassword:false,
	})
	const [loginValidState,setLoginValidState] = useState({
		email:false,
		password:false,
	})
	
	const handleChange = (e) => {
			setCredentials({
				...credentials,
				[e.target.name]:e.target.value
			});
	}
		const handleChangeLogin = (e) => {
			setLoginCredentials({
				...logincredentials,
				[e.target.name]:e.target.value
			});
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		if(credentials.firstName.length<3){
			var firstName = true;
		}
		if(credentials.lastName.length<3){
			var lastName = true;
		}	
		if(credentials.email.length<3){
			var email = true;
		}
		if(credentials.password.length<8){
			var password = true;
		}
		if(credentials.confirmPassword !== credentials.password ){
			var confirmPassword = true;
		}

		setValidState({
				...validState,firstName,lastName,email,password,confirmPassword
		});
		if(firstName||lastName||email||password||confirmPassword) return
		axios.post("http://localhost:8000/api/user/register",credentials,{ withCredentials: true })
		.then(res=>{
			Cookies.set('userId', res.data.userId)
			navigate("/dashboard")
		})
		.catch(err=>console.log(err.response))
		setCredentials({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:"",
	})
	}

	const handleSubmitLogin = async (e) => {
		e.preventDefault();
		if(logincredentials.email.length<3){
			var email = true;
		}
		if(logincredentials.password.length<8){
			var password = true;
		}

		setLoginValidState({...loginValidState,email,password});
		try{
			const resp = await axios.post("http://localhost:8000/api/user",logincredentials,{withCredentials:true})
			Cookies.set('userId', resp.data.userId)
			navigate("/dashboard")
		}
		catch(err){
			console.log("error given:",err)
		}
	}

  return (
  		<div style={{margin:"auto", display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center"}}>

    	<p style={{display:"flex",justifyContent:"center"}}>
    		<img alt="bin-image" 
    		style={{width:"50px",height:"35px"}} 
    		src={logo}/>
    		<h4>Reserve your space!!!</h4>
    	</p>
    	<div style={{margin:'auto',display:'flex',justifyContent: 'center',alignItems: 'center'}}>
		    	<form className="form" onSubmit={handleSubmit}>
		    			<input className="form-control"  placeholder="First Name" value={credentials.firstName} onChange={handleChange} name="firstName" type="text"/>
		    			<br/>
		    		{validState.firstName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
		    		
		    			<input className="form-control" placeholder="Last Name" value={credentials.lastName} onChange={handleChange} name="lastName" type="text"/>
		    			<br/>
		    		{validState.lastName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
		  
		    		<input className="form-control" placeholder="Email" value={credentials.email} onChange={handleChange} name="email" type="email"/>
		    		<br/>
		    		{validState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
		    		
						<input className="form-control" placeholder="Password" value={credentials.password} onChange={handleChange} name="password" type="password"/>
		    		<br/>
		    		{validState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
		    		
		    		<input className="form-control" className="form-control" placeholder="Confirm-Password" value={credentials.confirmPassword} onChange={handleChange} name="confirmPassword" type="password"/>
		    		{validState.confirmPassword ? <p style={{color:"red"}}>passwords has to match.</p>:null}
		    		<br/>

		    		<input type="submit" className="btn btn-primary" onSubmit={handleChange} value="Register"/>
		    	
		    	</form>
				<form style={{margin:"0px 3rem"}} className="form" onSubmit={handleSubmitLogin}>
			    		
			    		<input className="form-control" placeholder="Email" onChange={handleChangeLogin} name="email" type="text"/>
			    		<br/>
			    		{loginValidState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
			    		
			    		
							<input className="form-control" placeholder="Password" onChange={handleChangeLogin} name="password" type="password"/>
			    		<br/>
			    		{loginValidState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
			    		
			    		<input type="submit" className="btn btn-primary" onSubmit={handleChange} value="Login"/>
			    	</form>
	   	 </div>
	    </div>
  )
}

export default LoginRegForm;