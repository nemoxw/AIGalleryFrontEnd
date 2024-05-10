import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from "react-bootstrap";
//import { useNavigate, useParams, useLocation } from 'react-router-dom';

import ImagesList from "./components/ImagesList";
import Image from "./components/Image";
import AddReview from "./components/AddReview";

import FavoritesList from './components/FavoritesList';

import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from  "./components/Login";
import Logout from "./components/Logout";


import FavoritesDataService from "./services/favorites";



import logo from './logo.svg';
import './App.css';
import { response } from 'msw';
import Upload from './components/Upload';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


function App() {

  //The following line for navigate is added by Wang
  //const navigate = useNavigate();


  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [doSaveFav, setDoSaveFav] = useState(false);

  const addFavorite = (imageId) => {
    console.log(imageId);
    setDoSaveFav(true);
    setFavorites([...favorites, imageId]);

    //The following is added by Wang.
    /*

    const dataToUpdate = {
      _id: user.googleId,
      favorites: favorites
    };

    console.log(dataToUpdate);

    FavoritesDataService.UpdateFavorites(dataToUpdate).catch(e=> {console.log(e);});*/
  }

  const deleteFavorite = (imageId) => {
    console.log(imageId);
    setDoSaveFav(true);
    setFavorites(favorites.filter(f => f !== imageId));

    //The following is added by Wang.
    /*
    useEffect(() => {
      const dataToUpdate = {
        _id: user.googleId,
        favorites: favorites
      };
    }, [favorites]);

    console.log(dataToUpdate);

    FavoritesDataService.UpdateFavorites(dataToUpdate).catch(e=> {console.log(e);});*/
  }



  const saveFav = useCallback(() => {
    if (doSaveFav) {
      const dataToUpdate = {
        _id: user.googleId,
        favorites: favorites
      };

      console.log(dataToUpdate);

      FavoritesDataService.UpdateFavorites(dataToUpdate).catch(e=> {console.log(e);});
    }



  }, [favorites, user, doSaveFav]);







  const GetFavorites = useCallback( () => {
    FavoritesDataService.GetFavorites(user.googleId).then(response => {
      console.log(response);
      console.log(response.data.favorites);
      setFavorites(response.data.favorites);
      //console.log(favorites);
    })
    .catch(e => {
      console.log(e);
  });
 } , [user]);


useEffect(() => {
  if (user && doSaveFav) {
    saveFav();
    setDoSaveFav(false);
  }

}, [user, favorites, saveFav, doSaveFav]);

useEffect( () => {
  if (user) {
    GetFavorites();
  }
}, [user, GetFavorites]);




/**
  useEffect(() => {
    const GetFavorites = (userId) => {
      FavoritesDataService.GetFavorites(userId).then(response => {
        console.log(response);
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
        //console.log(favorites);
      })
      .catch(e => {
        console.log(e);
    });

    
    }
    if (user != null) {
      GetFavorites(user.googleId);
    }

  }, [user]);

  **/


  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
  
  
    if(loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;

      if (now < loginExp) {
        //Not expired
        setUser(loginData);
      }
      else {
        //Expired
        localStorage.setItem("login", null);

      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId} >
    <div className="App">
      <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand href="/">
            <img src= {process.env.PUBLIC_URL + "/images/galleryLogo.png"} alt="gallery logo" className="moviesLogo"/>
              Gallery Infinity
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to="/images">
                Paintings
              </Nav.Link>
              { user ? (
              <Nav.Link as={Link} to="/favorites">
                Favorites
              </Nav.Link>
              ) : <></>
              } 
              { user ? (
              <Nav.Link as={Link} to="/upload">
                Upload Your Own Painting
              </Nav.Link>
              ) : <></>
              } 

            </Nav>
          </Navbar.Collapse>
          { user ? (
              <Logout setUser={setUser} clientId={clientId}/>
            ) : (
              <Login setUser={setUser}/>
          )}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<ImagesList user={ user} addFavorite={ addFavorite } deleteFavorite={ deleteFavorite } favorites={ favorites } />}/>
        <Route exact path="/images" element={<ImagesList user={ user } addFavorite={ addFavorite } deleteFavorite = { deleteFavorite } favorites= {favorites} />}/>
        <Route path="/images/:id" element={<Image user={ user }/>}/>
        <Route path="/images/:id/review" element = { <AddReview user={ user }/>}/>
        <Route exact path="/favorites" element={<FavoritesList user={ user } favorites= {favorites} setFavorites = {setFavorites}/>}/>
        <Route path="/upload" element = { <Upload user={ user }/>}/>
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
