import { useEffect, useState } from "react";
import React from 'react';
import MovieDataService from '../services/images';
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import { response } from "msw";
import Rating from '@mui/material/Rating';

const Image1 = ({ user }) => {





    let params = useParams();
    

    const [image, setImage] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    });

    useEffect(() => {
        const getMovie = id => {
            MovieDataService.getMovieById(id).then(response => {
                console.log(response);
                setImage(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        }
        getMovie(params.id)
    }, [params.id]);





    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className="poster">
                        <img
                            className="bigPicture"
                            src= { image.poster}
                            onError={e => {
                                e.currentTarget.src = process.env.PUBLIC_URL + "/images/NoPosterAvailable-crop.jpg"
                              }}
                            fluid = "true"
                         />
                    
                    </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{image.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {image.plot}
                                </Card.Text>
                                { user && 
                                  <Link to={"/images/" + params.id + "/review"}>
                                    Add Review
                                  </Link> }
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        {image.reviews.map((review, index) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY") }</h5>
                                        <Rating name="simple-controlled" value={parseFloat(review.rating)}  readOnly/>
                                        <p className="review">{review.review}</p>
                                        { user && user.googleId === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link to={{
                                                        pathname: "/images/" + params.id + "/review/"
                                                    }}
                                                    state = {{
                                                        currentReview: review
                                                    }} >
                                                    Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => {
                                                        //TODO: delete review
                                                        console.log("Index is:" + index);
                                                        console.log(image.reviews);
                                                        setImage((prevState) => {
                                                            prevState.reviews.splice(index, 1);
                                                            return ({
                                                              ...prevState
                                                            })
                                                        });
                                                        const dataForDelete = {
                                                            review_id: review._id,
                                                            user_id: user.googleId
                                                        }

                                                        MovieDataService.DeleteReview(dataForDelete)
                                                        .catch(e=> {
                                                            console.log(e);
                                                        });

                                                        console.log("finished");

                                                  

                                                    
                                                    }}>
                                                    delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Image1;