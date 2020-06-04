import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      items: [],
      errorMessage: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.bookName.value)
    let settings = {
      Method: "GET"
    }
    let urlApi = `https://www.googleapis.com/books/v1/volumes?q=${event.target.bookName.value}+intitle:${event.target.bookName.value}`
    fetch( urlApi, settings )
    .then( response => {
        if( response.ok ){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then( responseJSON => {
        if (responseJSON.totalItems > 0) {
          this.setState({
            items: responseJSON.items,
            errorMessage: ""
          })
        } else {
          this.setState({
            items: [],
            errorMessage: `No se encontro: ${event.target.bookName.value}`
          })
        }
    })
    .catch( err => {
        console.log(err);
        this.setState({
          items: [],
          errorMessage: err
        })
    });
  }

  render(){
    return(
      <div>
        <BookForm onSubmit={this.handleSubmit}/>
        {
          this.state.items.length > 0 && this.state.items.map(item => {
            let snippet = item.searchInfo
            if(snippet)
              return(<Book data={item.volumeInfo} snippet={item.searchInfo.textSnippet}/>)
            else
              return(<Book data={item.volumeInfo} snippet={null}/>)
          })
        }
        <p>{this.state.errorMessage}</p>
      </div>

    )
  }

}

export default App;
