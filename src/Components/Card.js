import React from 'react';

const Card = ({ picture, name, popularity, action }) => {
    return (
        <tr>
            <td><img src={picture} alt={name}></img></td>
            <td>{name}</td>
            <td>{popularity}</td>
            <td>{action}</td>
        </tr>
    )
}
export default Card;