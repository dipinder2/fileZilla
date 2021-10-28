import {useContext,useEffect} from 'react';
import {FilesContext} from "../App";
import axios from 'axios'
const ListMyFiles = (props) => {
	const {myfiles} = useContext(FilesContext)
 
  return (
  	<div style={{width:"40rem",marginLeft:"2rem"}}>
  	<h5>My Files</h5>
    <table className={"table table-hover"} 
    style={{margin:"0px auto", width:"inherit"}}>
    	<thead>
    		<tr>
    			<th>Name</th>
    			<th>Last Modified</th>
    			<th>Size</th>
    			<th></th>
    		</tr>
    	</thead>
    	<tbody>
    	{
    		!myfiles?null:
    		myfiles.map((file,idx) =>{
    			return(
    				<tr key={idx}>
    					<td>{file.Key}</td>
    					<td>{file.LastModified}</td>
    					<td>{file.Size}</td>
    					<td><a href="">download</a></td>
    				</tr>
    				);
    		})
    	}
		</tbody>
    </table>
    </div>
  )
}

export default ListMyFiles;