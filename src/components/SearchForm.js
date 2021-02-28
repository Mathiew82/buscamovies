import React, { Component } from "react";
import PropTypes from "prop-types";

export class SearchForm extends Component {
  state = {
    inputValue: "",
    currentPage: 1,
  };

  static propTypes = {
    setLoadingFromSearchForm: PropTypes.func,
    submitResults: PropTypes.func,
    updateCurrentPage: PropTypes.func,
    apiUrl: PropTypes.string,
    apiKey: PropTypes.string,
    page: PropTypes.number,
  };

  createUrl = (page) => {
    const urlToSearch = new URL(
      `${this.props.apiUrl}?api_key=${this.props.apiKey}`
    );

    urlToSearch.searchParams.append("query", this.state.inputValue);
    urlToSearch.searchParams.append("page", page);
    urlToSearch.searchParams.append("language", "es-ES");
    urlToSearch.searchParams.append("include_adult", false);
    return urlToSearch;
  };

  _handleSubmit = (event, page) => {
    if (typeof event !== "undefined") {
      event.preventDefault();
      this.props.updateCurrentPage(page);
    }

    document.querySelector(".input").blur();
    this.props.setLoadingFromSearchForm(true);

    const url = this.createUrl(page);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.props.submitResults(data);
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      })
      .finally(() => {
        this.props.setLoadingFromSearchForm(false);
      });
  };

  _handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.page !== state.currentPage) {
      return {
        inputValue: state.inputValue,
        currentPage: props.page,
      };
    }
    return null;
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.currentPage !== this.state.currentPage) {
      this._handleSubmit(undefined, this.state.currentPage);
    }
  };

  render() {
    return (
      <div className="is-fullwidth">
        <form onSubmit={(event) => this._handleSubmit(event, 1)}>
          <div className="search-wrapper field has-addons is-flex is-justify-content-center">
            <div className="is-fullwidth control">
              <input
                className="input"
                type="text"
                onChange={this._handleChange}
                placeholder="Busca una película"
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
