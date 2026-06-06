import { useEffect, useState, type KeyboardEvent, type KeyboardEventHandler } from "react";

interface Props{
    placeholder?: string,
    buttonText?:string,
    onQuery: (query :string) => void
}

export function SearchBar({placeholder = 'Buscar' , buttonText= 'Buscar', onQuery}: Props){
    const [query, setQuery] = useState("");

    //Debounce
    //crear un useeffect por cada cosa, no crear uno solo para muchas cosas
    //estar pendiente porque puede generar baja de rendimiento
    //el useeffect se dispara cada que se modifica el componente y el return cada que se elimina
    
    useEffect(()=>{
        
        const timeoutId = setTimeout(()=>{
            onQuery(query);
        }, 700);

        return () => {
            clearTimeout(timeoutId);
        }
    },[query, onQuery]);

    const handleSearch = () => {
        onQuery(query)
        //setQuery("");
    }

    const handleKewDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key == "Enter"){
            handleSearch();
        }
    }
    
    return (
        <>
            <div className="search-container">
                <input 
                type="text" 
                placeholder={placeholder}
                value={query}
                onChange={(event)=> setQuery(event.target.value) }
                onKeyDown={ handleKewDown}
                />
                <button onClick={handleSearch}>{buttonText}</button>
            </div>
        </>
    );
}