import React, { useState, useEffect } from 'react';
import Search from '../components/Search'
import UserCard from '../components/UserCard';
import Error from '../components/ErrorModal';
import { withRouter } from 'react-router';


const Home = (props) => {


    const [error, setError] = useState();
    const [isClearVisible, setIsClearVisible] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [foundUser, setFoundUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNamber] = useState(1)
    const [hasMore, setHasMore] = useState(false);


    const initLoading = () => {
        setPageNamber(1)
        setHasMore(false)
    }
    const searchUsers = (reset) => {
        let page = pageNumber + 0;
        if (reset)
            page = 1;
        setIsLoading(true)
        fetch(`https://api.github.com/search/users?q=` + userInput + `in:user&page=${page}`).then(response => {

            return response.json()
        }).then(data => {
            if (data.total_count === 0)
                setError('User Not Found')
            else if (data.errors)
                setError('OOPS! Something went wrong...\ntry typing a valid name')

            setFoundUser(prev => {
                if (reset) return [...data.items]
                else return [...prev, ...data.items]
            });
            setIsClearVisible(true)
            setIsLoading(false)
            setHasMore( prev => {
                if(reset ) return data.items.length !== data.total_count
                else return foundUser.length + data.items.length !== data.total_count
            })
            setPageNamber(prev => prev + 1)



        }).catch(() => {
            setError('OOPS! Something went wrong...')
            setIsLoading(false);

        })
    }

    const clearUser = () => {
        setFoundUser([]);
        setIsClearVisible(false)
        setHasMore(false)
        setPageNamber(1)
        // setUserInput('');
    }

    const onPressEnter = (event) => {
        if (event.key === 'Enter') {
            initLoading();
            searchUsers(true);
        }

    }

    const onSearchHandler = () => {
        initLoading()
        searchUsers(true)
    }

    const clearError = () => {
        setError(null);
        clearUser();

    }

    const loadMoreHandler = () => {
        searchUsers(false);
    }


    return (

        <div>
            {error && <Error onClose={clearError}>{error}</Error>}

            <Search setUserInput={setUserInput} searchUsers={onSearchHandler} clearUser={clearUser} onPressEnter={(event) => onPressEnter(event)} clearVisiblity={isClearVisible}></Search>

            <div className="grid grid-cols-1 md:grid-cols-6 sm:grid-cols-3  justify-around ">
                {foundUser && foundUser.map((user, index) => {
                    return <UserCard key={user.id} user={user} ></UserCard>
                })}
            </div>

            {isLoading
                ? <div className="spinner h-96"></div>
                : null
            }
            
            {hasMore ?
                <div className=" flex  justify-center align-center">
                    <button className=" rounded-lg mb-4 bg-pink-300 py-2 px-4 text-white font-bold" onClick={loadMoreHandler}>
                        Load More
                </button></div>
                : null
            }
        </div>
    );


}

export default withRouter(Home);