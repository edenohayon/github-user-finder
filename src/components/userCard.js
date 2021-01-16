import React from 'react';
import { withRouter } from 'react-router';


const UserCard = React.memo((props) => {

    const goToUser = () => {
        props.history.push(`/user-info/${props.user.login}`)

    }

    return (
        <div className="max-w-xs shadow-md m-4" onClick={goToUser}>
            <img className="" src={props.user.avatar_url} alt="" />
            <div className="mt-2">
                <div className="text-xs text-gray-600 whitespace-nowrap overflow-ellipsis overflow-hidden font-bold text-center mb-4 align-middle">{props.user.login}</div>
            </div>
        </div>
    );

})

export default withRouter(UserCard);