import { render, waitFor, screen} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import mockServer from '../__mock__/mockServer';
import Movie from '../components/Movie';
import MoviesList from '../components/MoviesList';


beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())



test('renders the appropriate number of reviews', async () => {

    const TITLE_OF_MOVIE = 'Blacksmith Scene';
    const MOVIE_REVIEW_CLASS = 'review';
    const NUMBER_OF_REVIEWS = 2;


    const { container } = render(
        <MemoryRouter initialEntries={["/movies/573a1390f29313caabcd4135"]}>
            <Routes>
                <Route>
                  <Route path="movies/:id" element={<Movie />} />
                  </Route>
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText(TITLE_OF_MOVIE));
    const movieReviews = container.getElementsByClassName(MOVIE_REVIEW_CLASS);
    screen.debug()
    console.log(movieReviews);
    expect(movieReviews.length).toBe(NUMBER_OF_REVIEWS);



});
