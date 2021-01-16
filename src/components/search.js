import React from 'react';

const Search = (props) => {

    return (
        <div className="relative mr-6 my-2 text-center">
            <input type="search"
                className="bg-purple-white shadow rounded border-0 p-3 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Search by user name..."
                onChange={(event) => props.setUserInput(event.target.value)}
                onKeyDown={(event) => props.onPressEnter(event)} />
            <button
                className="mx-2 bg-purple-400 shadow rounded border-0 p-3 font-bold text-white hover:bg-purple-500 focus:outline-none"
                onClick={props.searchUsers}>
                search
            </button>

            {props.clearVisiblity
                ? <button
                    className=" bg-pink-400 shadow rounded border-0 p-3 font-bold text-white hover:bg-pink-500 focus:outline-none"
                    onClick={props.clearUser}>
                    clear
                </button>
                : null
            }



        </div>
    )
}

export default Search;

 