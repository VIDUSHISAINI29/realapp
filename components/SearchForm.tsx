"use client"
import React from 'react';
import SearchFormReset from '@/components/SearchFormReset';
import {Search} from "lucide-react"
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
        <button className='search-btn text-white' type='submit'>
            <Search className="size-5"/>
        </button>
            </div>
        </form>
    )
}
export default SearchForm;