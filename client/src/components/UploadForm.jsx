import {useRef,useState,useContext} from 'react';
import axios from 'axios';
import {FilesContext} from "../App";
import useFileUpload from 'react-use-file-upload'; 
import Cookies from 'js-cookie';

const UploadForm = ({}) => {
  const {newUpload,setNewUpload} = useContext(FilesContext)
  const {
    files,
    fileNames,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();
  const [multipleFilesErr,setMultipleFilesErr] = useState(false)
  const ListCSS = {listStyle:"None"}
  const DropzoneCSS = {}
  const inputRef = useRef();
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = createFormData();
    if(files.length>1){
      setMultipleFilesErr(true)
      return
    }
    setMultipleFilesErr(false)

    axios.post(`http://localhost:8000/api/files/${Cookies.get("userId")}`, formData, {
        'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "http://localhost:3000",
           withCredentials: true,
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              clearAllFiles();
              setNewUpload(!newUpload)              
            }
        }).then(res=>console.log(res)).catch(err=>console.log(err))
        
  };

  return (
    <div css={CSS}>
      {
        multipleFilesErr
        ?<p style={{color:"red"}}>Cannot Add multiple files</p>
        :null
      }
      <div className="form-container">
        {/* Display the files to be uploaded */}
        <div css={ListCSS}>
          <ul style={{listStyle:"none"}}>
            {
              files.length===0?null:
              <span>Name:</span> 
            }
            {fileNames.map((name) => (
              <li key={name}>
                <span style={{color:"gray"}}>{name}</span>

                <span onClick={() => removeFile(name)}>
                  <i className="fa fa-times" />
                </span>
              </li>
            ))}
          </ul>

          {files.length > 0 && (
                <button style={{margin:"10px"}} className={"btn btn-danger"} 
                onClick={() => clearAllFiles()}>Clear All</button>
          )}
        </div>

        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <div
          css={DropzoneCSS}
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
          }}
          style={{width:"15rem", 
              height:"200px", 
              background:"#D3D3D3", 
              justifySelf:"center",
              alignSelf:"center",
              margin:"0px auto"}}
        >
          <p>Drag and drop file here</p>

          <button className={"btn btn-outline-primary"} onClick={() => inputRef.current.click()}>Or select file to upload</button>

          {/* Hide the crappy looking default HTML input */}
          <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => setFiles(e, 'a')} />
        </div>
      </div>

      <div style={{margin:"10px"}} className="submit">
        <button className="btn btn-link" onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  )
}

export default UploadForm;