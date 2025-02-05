"use client"
const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement
        if(form) form.reset();
    }
    return (
        <div>
            <button type='reset' onClick={reset}>

</button>
        </div>
    )
}
export default SearchFormReset