import React, { useEffect, useState } from 'react';

import './Characters.scss';
import sadKittenImg from '../../assets/images/sad-kitten.jpg';

import { CharacterDTO, CharacterUI, CharactersDTO } from '../../models/characters.model';

const Characters = () => {
    const [characters, setCharacters] = useState<CharacterUI[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number[]>(Array.from({ length: 0 }, (_, index) => index + 1));
    const [isError, setIsError] = useState<boolean>(false);

    const apiKey = process.env.REACT_APP_LOTR_AUTHORIZATION_KEY;

    const getCharacters = async (page?: number) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const baseUrl = 'https://the-one-api.dev/v2';
        const requestUrl = `${baseUrl}/character?limit=50${page ? `&page=${page}` : ''}`;

        try {
            const rawCharacters = await fetch(requestUrl, { headers: headers });

            if (rawCharacters.ok === false) {
                throw new Error('Request characters failed');
            }

            const charactersDTO: CharactersDTO = await rawCharacters.json();
            const charactersUI: CharacterUI[] = charactersDTO.docs.map((character: CharacterDTO) => formatCharacter(character))

            const pages = charactersDTO.pages;

            setCharacters(charactersUI);
            setCurrentPage(page ? page : 1);
            setTotalPages(Array.from({ length: pages }, (_, index) => index + 1));
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getCharacters();
    }, []);

    const formatCharacter = (character: CharacterDTO): CharacterUI => ({
        ...character,
        url: character.wikiUrl,
        id: character._id,
    });

    return (
        <div className='characters'>
            <h1 className="title">Characters</h1>

            <div className="container">
                {isError ? (
                    <div className="content">
                        <div className="error">
                            <p>
                                Sad kitten is sad because there was an error.
                            </p>

                            <p>
                                There was an error loading the content, please try again later.
                            </p>
                        </div>

                        <img src={sadKittenImg} alt="Sad kitten is sad because there was an error loading the content" className='error image' />
                    </div>
                ) : (
                    <>
                        <p className='intro'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fuga excepturi error earum reiciendis voluptatem ipsa, eos impedit et corporis aperiam ipsam tempore soluta id vitae commodi consectetur repellat possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dicta vel, esse consectetur laboriosam iure numquam tenetur blanditiis repudiandae modi labore ipsum cum ipsa hic voluptatum enim architecto et. Quibusdam?
                        </p>

                        <div className="pagination">
                            {totalPages.map(page => (
                                <button 
                                    className={`pagination-button ${page === currentPage ? 'selected' : ''}`} 
                                    key={page}
                                    onClick={() => getCharacters(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <div className="content">
                            {characters.map(character => (
                                <div className="content-block" key={character.id}>
                                    <div className="character">
                                        <div className='name'>
                                            {character.name}
                                        </div>

                                        <div className='info'>
                                            <div className="item">
                                                Born: {character.birth} 
                                            </div>
                                            <div className="item">
                                                Died: {character.death} 
                                            </div>
                                            <div className="item">
                                                Race: {character.race}
                                            </div>
                                            <div className="item">
                                                Realm: {character.realm}
                                            </div>
                                            <div className="item">
                                                <a className='link' href={character.url} target='_blank' rel='noreferrer'>Go to wiki url...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}


            </div>
        </div>
    );
};

export default Characters;
