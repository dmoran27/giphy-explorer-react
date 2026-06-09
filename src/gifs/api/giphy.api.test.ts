import { describe, expect, test } from "vitest";
import { giphyApi } from "../api/giphy.api";



describe('GiphyApi', () => {
   
    test('should be configure correctly', ()=>{
        const params = giphyApi.defaults.params;

        expect(params).toStrictEqual({
            lang:'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        })

    });

    
});