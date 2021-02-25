import React, { Component } from "react";

export class SearchForm extends Component {
  state = {
    inputValue: "",
  };

  _handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.props.apiKey}&query=${this.state.inputValue}&page=2&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.submitResults(data);
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      });
  };

  _handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  render() {
    return (
      <div className="is-fullwidth">
        <form onSubmit={this._handleSubmit}>
          <div className="field has-addons is-flex is-justify-content-center">
            <div className="is-fullwidth control">
              <input
                className="input"
                type="text"
                onChange={this._handleChange}
                placeholder="Busca una película"
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-info">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
