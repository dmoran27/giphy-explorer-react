import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({})

    const handleTermClicked = async (term: string) => {
      console.log(gifs, gifsCache);
        if(gifsCache.current[term]){
            setGifs(gifsCache.current[term]);
            return;
        }
        await getResponseGifs(term);        
    }    

    const handleSearch = async (term: string = '') => {
        let terms =  [...previousTerms];
        let queryTerm = term.trim().toLocaleLowerCase();
        if(term.length === 0) return;    
        if(terms.includes(term)) return;
            
        if(previousTerms.length >= 8){
            terms.pop();
        }
        terms.unshift(queryTerm);
        setPreviousTerms(terms);
        await getResponseGifs(queryTerm);
    }

    const getResponseGifs = async (term: string)  =>{
        const responseGifs = await getGifsByQuery(term);
        setGifs(responseGifs);
        gifsCache.current[term] = responseGifs;
    }
    
    
    
    return {
        //Properties
        previousTerms,
        gifs,

        //Methods
        handleSearch,
        handleTermClicked

    };
}