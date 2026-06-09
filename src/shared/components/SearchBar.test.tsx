import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


describe('searchBar', () => {
    test('should render searchbar', ()=>{
        render(<SearchBar onQuery={()=>{}} />);
      
        //expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();

    });

     test('should the input has the correct placeholder value', ()=>{
        const text = "Buscar gif"
        render(<SearchBar onQuery={()=>{}} placeholder={text} />);
        expect(screen.getByPlaceholderText(text)).toBeDefined();

    });

    test('should call onQuery with the correct value after 700ms', async ()=>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value:'test'}});

        await waitFor(()=>{
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');

        });
    });

    test('should call once with the last value (dbounce)', async ()=>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value:'t'}});
        fireEvent.change(input, {target: {value:'te'}});
        fireEvent.change(input, {target: {value:'tes'}});
        fireEvent.change(input, {target: {value:'test'}});

        await waitFor(()=>{
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');

        });
    });

    test('should call onQuery when button clicked with the input value', ()=>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value:'test'}});
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('should call onQuery when key down clicked ',  ()=>{
         const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value:'test'}});
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13});
        expect(onQuery).toHaveBeenCalled();
        expect(onQuery).toHaveBeenCalledWith('test');
    });
})