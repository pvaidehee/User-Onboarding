import React from 'react';
import styled from 'styled-components';

const Users = props =>{
    return(
        <StyleUserDiv className="users-list">
        {props.props.map((user, i) =>(
            <div className="user" key={i}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                </div>
        ))}
    </StyleUserDiv>
    )

}
export default Users

const StyleUserDiv = styled.div`
color:#006666;
`;