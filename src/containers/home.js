import React, { useState, useEffect } from 'react';
import Search from '../components/Search'
import UserCard from '../components/UserCard';
import Error from '../components/ErrorModal';
import { withRouter } from 'react-router';

import useFetch from '../hooks/useFetch'

const Home = (props) => {

    //IMPORTANT - TODO THIS!!!
    const [isClearVisible, setIsClearVisible] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const { loading, error, items, hasMore, getUsers, clear } = useFetch();

    useEffect(() => {
        if(items && items.length)
            setIsClearVisible(true)
        else
            setIsClearVisible(false)
    }, [items])

    const searchUsers = (reset) => {
        if (reset) {
            setPageNumber(1);
            getUsers(userInput, reset, 1)

        }
        else {
            getUsers(userInput, reset, pageNumber + 1)
            setPageNumber(prev => prev + 1)
        }
    }

    const onPressEnter = (event) => {
        if (event.key === 'Enter') {
            // initLoading();
            searchUsers(true);
        }

    }

    const onSearchHandler = () => {
        searchUsers(true)
    }


    const loadMoreHandler = () => {
        searchUsers(false);
    }


    return (

        <div>
            {error && <Error onClose={clear}>{error}</Error>}

            <Search setUserInput={setUserInput} searchUsers={onSearchHandler} clearUser={clear} onPressEnter={(event) => onPressEnter(event)} clearVisiblity={isClearVisible}></Search>

            <div className="grid grid-cols-1 md:grid-cols-6 sm:grid-cols-3  justify-around ">
                {items && items.map((user, index) => {
                    return <UserCard key={user.id} user={user} ></UserCard>
                })}
            </div>

            {loading
                ? <div className="spinner h-96"></div>
                : null
            }

            {hasMore ?
                <div className=" flex  justify-center align-center">
                    <button className=" rounded-lg mb-4 bg-pink-500 py-2 px-4 text-white font-bold" onClick={loadMoreHandler}>
                        Load More
                </button></div>
                : null
            }
        </div>
    );


}

export default withRouter(Home);