import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadDataService from "../services/upload";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';


const Upload = ({ user }) => {

    const navigate = useNavigate();

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
    }



    const [imageTitle, setImageTitle] = useState("");
    const [imageModel, setImageModel] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [showB, setShowB] = useState(false);

    const toggleShowB = () => setShowB(!showB);

    const onChangeImageTitle = e => {
        const imageTitle = e.target.value;
        setImageTitle(imageTitle);
    }
    const onChangeImageModel = e => {
        const imageModel = e.target.value;
        setImageModel(imageModel);
    }
    const onChangeImageFile = e => {
        const imageFile = e.target.files[0];
        setImageFile(imageFile);
    }

    const UploadImage = ()=> {
        if (!imageFile) {
          setShowB(true);
          return;
        }
      
        console.log(imageTitle + " Start upload");
        console.log("Image Model: " + imageModel);
        console.log(imageFile);
        console.log(imageFile.type);
        
        let postid = uuidv4();
        let blob = imageFile.slice(0, imageFile.size, imageFile.type);
        let extension = imageFile.type;
        extension = extension.replace("image/", "");
        let newFile = new File([blob], `${postid}_post.` + extension, { type: imageFile.type });
        console.log(newFile);
        let formData = new FormData();
        //formData.append("imgfile", newFile);
        /** 
        let data = {
          imgfileId: postid,
          imgfileName: imageTitle,
          imgfileModel: imageModel,
          imgfileType: extension,
          imgfileUploaderName: user.name,
          imgfileUploader: user.googleId,
          imgfile: formData

        }
        **/

        formData.append("imgfileId", postid);
        formData.append("imgfileName", imageTitle);
        formData.append("imgfileModel", imageModel);
        formData.append("imgfileType", extension);
        formData.append("imgfileUploaderName", user.name);
        formData.append("imgfileUploader", user.googleId);
        formData.append("imgfile", newFile);
        console.log(formData);
        /** 
        UploadDataService.uploadImage(formData).then (response => {
            navigate("/movies");
        })
        .catch(e=> {
            console.log(e);
        });
        **/


        const resetImage = () => { 
          document.getElementById("imageform").value = null;
        }
        const resetTitle = () => { 
          document.getElementById("titleform").value = "";
        }
        const resetModle = () => { 
          document.getElementById("modleform").value = "";
        }


        UploadDataService.uploadImage(formData).then(response => {
          console.log(response);
          if (response.data.status == "success") {
            setShowA(true);
            resetImage();
            resetTitle();
            resetModle();
            setImageFile(null);
            setImageModel("");
            setImageTitle("");
          }
        }).catch(e=> {
          console.log(e);
        });





    }






    return (
    <div>
         <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control id = "imageform" type="file" placeholder="your image" onChange={onChangeImageFile}/>
                <Form.Control id = "titleform" type="text" placeholder='Title of your image' value={imageTitle} onChange={onChangeImageTitle}/>
                <Form.Control id = "modleform" type="text" placeholder='The Modle Used' value={imageModel} onChange={onChangeImageModel}/>
              </Form.Group>
              <Button variant='primary' type='button' onClick={UploadImage}> Upload </Button>
            </Col>
           </Row>
        </Form>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">Upload Success</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>Upload successed!</Toast.Body>
        </Toast>
        <Toast show={showB} onClose={toggleShowB}>
          <Toast.Header>
            <strong className="me-auto">Empty Image File</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>Please choose an image to upload!</Toast.Body>
        </Toast>
        

    </div>)

}

export default Upload;