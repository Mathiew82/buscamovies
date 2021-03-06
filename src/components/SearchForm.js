import React, { useState } from "react";
import PropTypes from "prop-types";
import env from "../env";

const { API_URL, API_KEY } = env;

function SearchForm(props) {
  const { setLoadingFromSearchForm, submitResults, page } = props;

  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const createUrl = (page) => {
    const urlToSearch = new URL(`${API_URL}/search/movie?api_key=${API_KEY}`);

    urlToSearch.searchParams.append("query", inputValue);
    urlToSearch.searchParams.append("page", page);
    urlToSearch.searchParams.append("language", "es-ES");
    urlToSearch.searchParams.append("include_adult", false);
    return urlToSearch;
  };

  const checkValueInput = (val) => {
    const query = val.trim();
    return query.length > 0;
  };

  const handleSubmit = (event, page) => {
    if (typeof event !== "undefined") {
      event.preventDefault();
    }

    const inputElement = window.document.querySelector(".input");

    if (!checkValueInput(inputValue)) {
      inputElement.value = "";
      return false;
    }

    window.document.querySelector(".input").blur();
    setLoadingFromSearchForm(true);

    const url = createUrl(page);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        submitResults(data);
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      })
      .finally(() => {
        setLoadingFromSearchForm(false);
      });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  if (page !== currentPage) {
    setCurrentPage(page);

    setTimeout(() => {
      handleSubmit(undefined, page);
    }, 200);
  }

  return (
    <div className="is-fullwidth">
      <form onSubmit={(event) => handleSubmit(event, 1)}>
        <div className="search-wrapper field has-addons is-flex is-justify-content-center">
          <div className="is-fullwidth control">
            <input
              className="input"
              type="text"
              onChange={handleChange}
              placeholder="Busca una película"
              autoFocus
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

SearchForm.propTypes = {
  setLoadingFromSearchForm: PropTypes.func,
  submitResults: PropTypes.func,
  updateCurrentPage: PropTypes.func,
  apiUrl: PropTypes.string,
  apiKey: PropTypes.string,
  page: PropTypes.number,
};

export default SearchForm;
