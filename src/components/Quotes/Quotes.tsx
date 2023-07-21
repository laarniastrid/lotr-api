import React, { useEffect, useState } from 'react';

import './Quotes.scss';
import sadKittenImg from '../../assets/images/sad-kitten.jpg';

import { QuoteUI, QuotesDTO } from '../../models/quotes.model';


const Quotes = () => {
    const [quotes, setQuotes] = useState<QuoteUI[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number[]>(Array.from({ length: 0 }, (_, index) => index + 1));
    const [isError, setIsError] = useState<boolean>(false);

    const apiKey = process.env.REACT_APP_LOTR_AUTHORIZATION_KEY;

    const getQuotes = async (page?: number) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const baseUrl = 'https://the-one-api.dev/v2';
        const requestUrl = `${baseUrl}/quote?limit=100${page ? `&page=${page}` : ''}`;

        try {
            const rawQuotes = await fetch(requestUrl, { headers: headers });

            if (rawQuotes.ok === false) {
                throw new Error('Request quotes failed');
            }

            const quotesDTO: QuotesDTO = await rawQuotes.json();
            console.log('quotesDTO ', quotesDTO);
            const quotesUI: QuoteUI[] = quotesDTO.docs.map(quote => formatQuote(quote));

            setQuotes(quotesUI);
            setCurrentPage(quotesDTO.page);
            setTotalPages(Array.from({ length: 0 }, (_, index) => index + 1));
        } catch (error) {
            setIsError(true);
        }
    }

    useEffect(() => {
        getQuotes();
    }, []);

    const formatQuote = (quote: any) => ({
        ...quote,
    });

    return (
        <div className='quotes'>
            <h1 className="title">Quotes</h1>

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
                                    onClick={() => getQuotes(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <div className="content">
                            {quotes.map(quote => (
                                <div className="content-block" key={quote.id}>
                                    <div className="character">
                                        <div className='name'>
                                            {quote.name || 'quote'}
                                        </div>

                                        <div className='info'>
                                            <div className="item">
                                                Quote: {quote.dialog}
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

export default Quotes;
