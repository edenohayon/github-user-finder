import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { VscError } from 'react-icons/vsc'
import { FiLink2 } from 'react-icons/fi'

const UserInfo = (props) => {

    let username = useParams().userName;

    let [user, setUser] = useState(null);
    let [displayRepos, setDisplayRepos] = useState(false)
    let [userRepos, setUserRepos] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        //call for data
        setIsLoading(true)
        fetch(`https://api.github.com/users/` + username).then(response => {

            return response.json()
        }).then(data => {
            setIsLoading(false)
            setUser(data)
        })
    }, [username]);

    const displayReposHandler = () => {
        setDisplayRepos(prev => !prev);

        if (!userRepos.length) {
            getUserRepos();
        }
    }

    const getUserRepos = () => {
        setIsLoading(true)
        fetch(`https://api.github.com/users/` + username + '/repos').then(response => {

            return response.json()
        }).then(data => {
            setUserRepos(data)
            setIsLoading(false)
        })
    }

    if (user)
        return (
            <div className="min-h-screen  bg-indigo-400 md:p-20 p-6">
                {/* // image name and user */}
                <div className="md:flex justify-between">
                    <img src={user.avatar_url} className="rounded shadow-lg align-center w-1/3" alt=""></img>
                    <div className="w-2/3 ml-8 mt-8 text-indigo-100">
                        <p className="md:text-5xl  text-3xl font-bold">{user.name}</p>
                        <p className="md:text-xl mt-2">@{user.login}</p>
                        {user.blog
                            ? <a href={user.blog} rel="noreferrer" target="_blank" className="md:text-xl mt-2 flex items-center"><FiLink2 className="mr-2" /> {user.blog}</a>
                            : null}
                        <button
                            className="py-3 px-6 text-lg bg-yellow-400 text-yellow-800 hover:bg-orange-300 rounded text-bold mt-4 font-bold"
                            onClick={displayReposHandler}>Get Repos</button>
                    </div>

                </div>
                {isLoading
                    ? <div className="spinner h-96"></div>
                    : null
                }
                <div className="py-20 flex flex-wrap ">

                    {displayRepos
                        ?
                        userRepos.map(repo => {
                            return <span key={repo.id}
                                className="bg-white m-2 p-4 shadow-lg rounded-lg md:text-xl text-indigo-600 hover:bg-purple-100 transform hover:-translate-y-1 hover:scale-110" >
                                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                            </span>
                        })

                        : null}

                    {!userRepos.length && displayRepos && !isLoading
                        ? <h1 className="flex items-center text-yellow-800 text-lx font-bold"><VscError /> No Repos Found.</h1>
                        : null}
                </div>




            </div>



        );
    else return null;
}

export default UserInfo;