"use client"
import React from 'react';
// import { Form } from "react-router-dom";

import SearchFormReset from '@/app/components/SearchFormReset';
const SearchForm = ({query}: {query?: string}) => {
    

   
    return(
        <form   action="/"  className="search-form">
            
            <input
            name='query'
            defaultValue={query}
            className='search-input'
            placeholder='Search Startups' />
            <div className='flex gap-2'>
        { query && (<SearchFormReset  />)}
        <button className='search-btn text-white' type='submit'>S</button>
            </div>
        </form>
    )
}
export default SearchForm;