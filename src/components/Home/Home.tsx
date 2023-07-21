import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Home.scss';

import moviesImg from '../../assets/images/movies.jpg';
import charactersImg from '../../assets/images/characters.jpg';
import quotesImg from '../../assets/images/quotes.jpg';

const Home = () => {
    const navigate = useNavigate();
    const navigateTo = (link: string) => {
        navigate(link);
    };

    return (
        <div className='home'>
            <h1 className='title'>Lord of the Rings</h1>

            <div className="container">
                <div className="content">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat reprehenderit voluptates corrupti minus, esse distinctio sint! Sint exercitationem, repudiandae perspiciatis rerum, ea soluta officia a reiciendis possimus quas, ratione architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore harum at officia quia, recusandae amet tempore nobis voluptate doloremque voluptatum repellat commodi deleniti aliquid ut. Consequuntur, laudantium non. Laboriosam, necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi magnam ipsum vero voluptas est esse dignissimos nesciunt! Quas necessitatibus ducimus a facilis. Rerum, quia quasi excepturi eius soluta ratione?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat reprehenderit voluptates corrupti minus, esse distinctio sint! Sint exercitationem, repudiandae perspiciatis rerum, ea soluta officia a reiciendis possimus quas, ratione architecto.
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="content">
                    <div className="content-block link">
                        <Link to="/movies" className='link-image'>
                            <img src={moviesImg} alt='Movies' className='image' />
                        </Link>
                        <div
                            className="image-overlay"
                            onClick={() => navigateTo('/movies')}
                        >
                            Movies
                        </div>
                    </div>
                    <div className="content-block link">
                        <Link to="/characters" >
                            <img src={charactersImg} alt='Characters' className='image' />
                        </Link>
                        <div
                            className="image-overlay"
                            onClick={() => navigateTo('/characters')}
                        >
                            Characters
                        </div>
                    </div>
                    <div className="content-block link">
                        <Link to="quotes" >
                            <img src={quotesImg} alt='Quotes' className='image' />
                        </Link>
                        <div
                            className="image-overlay"
                            onClick={() => navigateTo('/quotes')}
                        >
                            Quotes
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
