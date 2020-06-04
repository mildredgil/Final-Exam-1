import React from 'react';

function Book( props ){
    return(
    <div>
        <div>
            <p>
                Titulo: {props.data.title}
            </p>
        </div>
        <div>
            <p>
                {props.snippet}
            </p>
        </div>
        <div>
            {props.data.imageLinks && <img src={props.data.imageLinks.thumbnail} />}
           {props.data.authors && 
            <ul>
                {props.data.authors.map( author => {
                    return(<li>{author}</li>)
                })
                }
            </ul>}
        </div>
    </div>
    );
}

export default Book;