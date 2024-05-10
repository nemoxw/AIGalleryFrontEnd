import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { DnDCard } from './DnDCard.js'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MovieDataService from '../services/images.js';
import FavoritesDataService from "../services/favorites";
import ImagesList from './ImagesList.js';


//import { Redirect } from "react-router-dom";



const style = {
    width: 400,
    margin: 1,

}



const FavoritesList = ({user, favorites, setFavorites}) => {

    console.log("render");
    


    /** 
    const [cards, setCards] = useState([
        {
          id: 1,
          text: 'Write a cool JS library',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 2,
          text: 'Make it generic enough',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 3,
          text: 'Write README',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 4,
          text: 'Create some examples',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 5,
          text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 6,
          text: '???',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
        {
          id: 7,
          text: 'PROFIT',
          image: "https://m.media-amazon.com/images/M/MV5BNTY0ODRmZDktMzM2MC00NThmLWEyMDMtODQzNWEyMjMxYTYzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
        },
      ]);

      */




    



    const [cards, setCards] = useState([]);
    const [favoritesIds, setFavoritesIds] = useState([]);
    const [favoritesFetched, setFavoritesFetched] = useState(false);
    const [doSaveFav, setDoSaveFav] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState("unReady")

    console.log(favoriteMovies);
    console.log(cards);




    /** 
    const getMovie = id => {
        console.log(id);
        MovieDataService.getMovieById(id).then(response => {
            console.log(response);
            return response.data;
        })
        .catch(e => {
            console.log(e);
        });

    }
    */


    /** 

    function getAllFavorites() {
        const fetchedFavoriteMovies = [];
        favorites.map(async (favorite)=>{
            let fetchedFavoriteMovie = getMovie(favorite)
            fetchedFavoriteMovies.push(getMovie(favorite));
            console.log(fetchedFavoriteMovies);
        });
        return fetchedFavoriteMovies;
        //setFavoriteMovies(fetchedFavoriteMovies);

    }
    */


    /** 
    const getFavoriteMovies = ()=>{
        console.log("hey favorite");
        setFavoritesIds(favoritesIds);
        setFavoriteMovies(getAllFavorites());
        const favoriteCards = [];
        for (let i = 0; i < favoriteMovies.length; i++) {
            favoriteCards.push({
                id: i + 1,
                text: favoriteMovies[i].title,
                image: favoriteMovies[i].poster
            });
        }
        setCards(favoriteCards);

    };
    */


    /** 

    const getFavoriteMovies = useCallback(()=>{
        console.log(favorites);
        console.log("hey favorite");
        //setFavoritesIds(favorites);
        const fetchedFavoriteMovies = [];
        favorites.map( (favorite)=>{
            console.log(favorite);

             

            MovieDataService.getMovieById(favorite).then(response => {
                console.log(response);
                fetchedFavoriteMovies.push(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    


            console.log(fetchedFavoriteMovies);
        });
        setFavoriteMovies(fetchedFavoriteMovies);


        console.log("favorite movie")

        const favoriteCards = [];
        console.log("starting to make cards")
        for (let j = 0; j <2; j++) {
            console.log(j)
        }
        console.log(fetchedFavoriteMovies)
    

    
        console.log("here")
    

    }, []);

    */

    const getFavoriteMovies = useCallback(async () => {
        if (doSaveFav) {
            return;
        }
        try {
            console.log(favorites)
          if (favorites.length == 0) {
            console.log("favorite has not been passed or there is no favorites")
            return;
          }
          const fetchedFavoriteMovies = [];
          for (const favorite of favorites) {
            try {
              const response = await MovieDataService.getMovieById(favorite);
              fetchedFavoriteMovies.push(response.data);
            } catch (error) {
              console.log(error);
            }
          }
          if (fetchedFavoriteMovies.length !=0) {
            console.log("fectchedNonEmpty");
            setFavoriteMovies(fetchedFavoriteMovies);
          }
          console.log(favoriteMovies);
        } catch (error) {
          console.log(error);
        }
      }, [favorites]);


    const makeCards = useCallback(()=> {
        console.log("heyey")
        const favoriteCards = [];
        console.log(favoriteMovies);
        for (let i = 0; i < favoriteMovies.length; i++) {
            console.log("pushing");
            favoriteCards.push({
                id: i + 1,
                text: favoriteMovies[i].title,
                image: favoriteMovies[i].poster,
                moviesId: favoriteMovies[i]._id
            });
        }
        setCards(favoriteCards);
        console.log(favoriteCards)

    }, [favoriteMovies]);

    useEffect(()=> {

        /** 
        const getFavoriteMovies = useCallback(()=>{
            console.log(favorites);
            console.log("hey favorite");
            setFavoritesIds(favorites);
            const fetchedFavoriteMovies = [];
            favorites.map( (favorite)=>{
                console.log(favorite);

                MovieDataService.getMovieById(favorite).then(response => {
                    console.log(response);
                    fetchedFavoriteMovies.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
                console.log(fetchedFavoriteMovies);
            });
            setFavoriteMovies(fetchedFavoriteMovies);
            console.log("favorite movie")
            console.log(favoriteMovies)
            const favoriteCards = [];
            for (let i = 0; i < favoriteMovies.length; i++) {
                console.log("pushing");
                favoriteCards.push({
                    id: i + 1,
                    text: favoriteMovies[i].title,
                    image: favoriteMovies[i].poster
                });
            }
            setCards(favoriteCards);
    
        });*/
        getFavoriteMovies();
        //makeCards();

        /** 

        const favoriteCards = [];
        for (let i = 0; i < favoriteMovies.length; i++) {
            console.log("pushing");
            favoriteCards.push({
                id: i + 1,
                text: favoriteMovies[i].title,
                image: favoriteMovies[i].poster
            });
        }
        setCards(favoriteCards);
        console.log(cards);
        */
    }, [getFavoriteMovies]);



    const saveFav = useCallback(() => {
        const favoritesToSave =[];
        for (let i = 0; i < cards.length; i++) {
            favoritesToSave.push(cards[i].moviesId);
        }
        console.log("new ordered favorites to save to database:");
        console.log(favoritesToSave);

        if (doSaveFav && user) {
          const dataToUpdate = {
            _id: user.googleId,
            favorites: favoritesToSave
          };
    
          console.log(dataToUpdate);
    
          FavoritesDataService.UpdateFavorites(dataToUpdate).catch(e=> {console.log(e);});
        }
        setFavorites(favoritesToSave);
    
    
    
      }, [cards, doSaveFav]);







    useEffect(()=> {
        if (favoriteMovies != "unReady"){
            makeCards();
            setDoSaveFav(true);
        }
    }, [makeCards])


    useEffect( ()=> {
        if (cards.length != 0 && doSaveFav) {
            console.log(cards);
            saveFav();
        }

    },[cards])









    



 /** 
    if (doSaveFav && !user) {
        return 
    }*/




   






    /** 
    useEffect( ()=> {
        if (favoritesFetched == true) {
        console.log("favorite movies changed")
        console.log(favoriteMovies)
        

       makeCards();
       console.log(cards);
    }

    }, [favoritesFetched, makeCards]);
    */






    
    
    
      const moveCard = useCallback((dragIndex, hoverIndex) => {
        console.log("dragIndex: " + dragIndex);
        console.log("hoverIndex: " + hoverIndex);

        setCards((prevCards) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          }),
          
        )


        
      }, []);
    
      const renderCard = useCallback((card, index) => {
        return (
          <DnDCard
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            image={card.image}
            moveCard={moveCard}
          />
        )
      }, []);












    return (
        ((doSaveFav && !user) ? 
        <ImagesList/> :


        <div>
            <div className='favoritesContainer container'>
                <div className='favoritesPanel'>
                    Drag your favorites to rank them
                </div>
			<DndProvider backend={HTML5Backend}>
                <>
                    <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
                </>
			</DndProvider>
		    </div>
        </div>
        )
    )
}

export default FavoritesList;