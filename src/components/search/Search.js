import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"

const Search = () =>{

    const [search, setSearch] = useState(null);
    const handleOnChange = 


    return (
        <AsyncPaginate
        placeholder= " Search for cities"
        debounceTimeout={600}
        value = { search}
        onChange = {handleOnChange}
        />
    )
}