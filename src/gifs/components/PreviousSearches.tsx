import type { FC } from "react";

interface Props {
    title: string,
    searches: string[],
    onClickedLabelTerm:(term:string) => void
}

export const PreviousSearches: FC<Props> = ({title, searches, onClickedLabelTerm}) =>{
    return (
        <>
            <div className="previous-searches">
                <p>{title}</p>
                <ul className="previous-searches-list">
                    {searches.map((term: string)=>(
                        <li key={term} onClick={()=> onClickedLabelTerm(term)} >{term}</li>
                    ))}
                </ul>
            </div>
        
        </>
    );
}