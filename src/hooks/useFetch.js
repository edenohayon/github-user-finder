import {  useCallback, useReducer } from 'react'

const itemsReducer = (curState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                ...curState,
                loading: true,
            };
        case 'NEW_SEARCH_RESPONSE':
            return {
                loading: false,
                items: [...action.data.items],
                hasMore: action.data.items.length !== action.data.total_count,
                error: null
            };
        case 'LOAD_MORE':
            return {
                loading: false,
                hasMore: curState.items.length + action.data.items.length !== action.data.total_count,
                items: [...curState.items, ...action.data.items],
                error: null
            };
        case 'LOAD_REPOS':
            return {
                loading: false,
                hasMore: false,
                items: [ ...action.data],
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.errorMessage,
                items: [],
                hasMore: false,
            };
        case 'CLEAR':
            return {
                loading: false,
                error: null,
                items: [],
                hasMore: false,
            };
        default:
            throw new Error('Should not be reached!');
    }
};

export default function useFetch() {

    const [fetchState, dispatch] = useReducer(itemsReducer, {
        loading: false,
        error: null,
        items: [],
        hasMore: false,
    });




    const getUsers = useCallback((userName, reset, pageNumber) => {
        dispatch({ type: 'SEND' })

        fetch(`https://api.github.com/search/users?q=` + userName + `in:user&page=${pageNumber}`).then(response => {
            return response.json()
        }).then(data => {
            if (data.total_count === 0)
                dispatch({ type: 'ERROR', errorMessage: 'No Users Found' })
            else if (data.errors) {
                dispatch({ type: 'ERROR', errorMessage: 'OOPS! Something went wrong...\ntry typing a valid name' })
                return;
            }
            else if (reset) {
                dispatch({ type: 'NEW_SEARCH_RESPONSE', data: data })
            }
            else {
                dispatch({ type: 'LOAD_MORE', data: data })
            }

        }).catch(() => {
            dispatch({ type: 'ERROR', errorMessage: 'OOPS! Something went wrong...' })
        })


    }, []);

    const getRepos = useCallback((userName) => {
        dispatch({ type: 'SEND' })


        fetch(`https://api.github.com/users/` + userName + '/repos').then(response => {

            return response.json()
        }).then(data => {
            dispatch({type:'LOAD_REPOS', data: data})
        }).catch(e =>{
            dispatch({type:'ERROR', errorMessage:'OOPS! Something went wrong'})
        })

    }, [])

    const clear = () => {
        dispatch({ type: 'CLEAR' })
    }

    return {
        loading: fetchState.loading,
        error: fetchState.error,
        items: fetchState.items,
        hasMore: fetchState.hasMore,
        getUsers: getUsers,
        clear: clear,
        getRepos, getRepos
    };
}