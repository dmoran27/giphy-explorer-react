import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export function GifApp(){
    const {previousTerms, gifs, handleSearch, handleTermClicked } = useGifs()

    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="El GIF perfecto para cada momento"/>
            <SearchBar placeholder="Busca un gif" buttonText="Buscar" onQuery={handleSearch}/>
            <PreviousSearches title="" searches={previousTerms} onClickedLabelTerm={handleTermClicked}/>
            <GifList gifs={gifs} />
        </>
    );
}