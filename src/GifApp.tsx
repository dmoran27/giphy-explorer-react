import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
//import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query-actions";
import type { Gif } from "./gifs/interfaces/gif.interface";

export function GifApp(){
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [inputSearchTerm, setinputSearchTerm] = useState<Gif[]>([]);


    const handleTermClicked = async (term: string) => {
        let responseGifs = await getGifsByQuery(term);
        setinputSearchTerm(responseGifs);     
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
        let responseGifs = await getGifsByQuery(queryTerm);
        setinputSearchTerm(responseGifs);        
    }



    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="El GIF perfecto para cada momento"/>
            <SearchBar placeholder="Busca un gif" buttonText="Buscar" onQuery={handleSearch}/>
            <PreviousSearches title="" searches={previousTerms} onClickedLabelTerm={handleTermClicked}/>
            <GifList gifs={inputSearchTerm} />
        </>
    );
}