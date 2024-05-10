import React, { useState } from 'react';
import MovieDataService from "../services/images";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Rating from '@mui/material/Rating';


const  AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

    let editing =  false;
    let initialReviewState = "";
    let initialRating = 0;
    // initialReviewState will have a different value 
    // if we're editing an existing review

    let location = useLocation();
    //console.log(typeof location.state);

    if (location.state ) {
        console.log("Current Review:" + location.state.currentReview.review);
        initialReviewState = location.state.currentReview.review;
        initialRating=parseFloat(location.state.currentReview.rating);
        editing = true;
    }

    
    const [review, setReview] = useState(initialReviewState);

    //The following is added to track the rating
    const [rating, setRating ] = useState(initialRating);


    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const onChangeRating = e => {
        const rating = e.target.value;
        console.log(rating);
        setRating(rating);
    }

    const saveReview = () => {
        var data = {
            review: review,
            rating: rating,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            // TODO: Handle case where an existing
            //review is being updated
            console.log("editing!");
            const editData = {
                review_id: location.state.currentReview._id,
                review: review,
                rating: rating,
                user_id: location.state.currentReview.user_id,
                name: user.name
                

            }

            console.log("Current review Id:" + location.state.currentReview._id);

            console.log("Updating the Current Review:" + location.state.currentReview.review);
            MovieDataService.UpdateReview(editData).then (response => {
                navigate("/images/" + params.id)
            })
            .catch(e=> {
                console.log(e);
            });


        }
        else {
            MovieDataService.createReview(data).then (response => {
                navigate("/images/" + params.id)
            })
            .catch(e=> {
                console.log(e);
            });
        }
    }

    

    return (
        <Container className='main-container'>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label> { editing ? "Edit" : "Create" } Review </Form.Label>
                    <Form.Control
                        as = "textarea"
                        type = "text"
                        required
                        review = { review }
                        onChange = { onChangeReview }
                        defaultValue={ editing? location.state.currentReview.review : "" }
                    />
                </Form.Group>
                    <Rating name="half-rating" defaultValue={initialRating} onChange = { onChangeRating}/>
                    <Button variant='primary' onClick={ saveReview}>
                        Submit
                    </Button>
            </Form>
        </Container>
    )
}

export default AddReview;