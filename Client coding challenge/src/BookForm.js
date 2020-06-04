import React from 'react';

function BookForm( props ){
    return(
        <div>
           <form onSubmit={props.onSubmit} >
                <label htmlFor="bookName">Nombre del libro:</label>
                <input type="text" name="bookName" id="bookName"/>
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default BookForm;