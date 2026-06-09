import {describe, expect, test} from 'vitest'
import { GifApp } from './GifApp';
import { render } from '@testing-library/react';

describe('GifsApp', () =>{
    test('should render component property', () => {
        const {container} = render(<GifApp/>);
        expect(container).toMatchSnapshot();
    })
});