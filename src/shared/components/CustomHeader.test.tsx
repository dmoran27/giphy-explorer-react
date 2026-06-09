import {describe, expect, test} from 'vitest'
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('Custom Header', () =>{
    const title = 'Buscador de gif'
    const description = 'Busca y comparte'

    test('should render the title corrently', () => {        
        render(<CustomHeader title={title}/>);
        const header = screen.getByRole('heading');
        expect(header.textContent).toContain(title);
        // expect(screen.getBytext(title)).toBeDefined()
    })

    test('should render the description when provider', ()=>{        
        render(<CustomHeader title={title} description={description}/>);
        const paragraph = screen.getByRole('paragraph');
        expect(paragraph.textContent).toContain(description);
         // expect(screen.getByRole('paragraph')).toBeDefined()
         // expect(screen.getByRole('paragraph').innerHTML).toBe(description)
    })

    test('should render the description when not provider', ()=>{
        const {container} = render(<CustomHeader title={title}/>);
        expect(container).not.toBe(description);
    })
});