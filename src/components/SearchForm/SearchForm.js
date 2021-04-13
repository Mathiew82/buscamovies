import React from 'react'
import PropTypes from 'prop-types'
import './SearchForm.scss'

function SearchForm(props) {
  const { inputValue, setInputValue, submit } = props

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="is-fullwidth">
      <form data-testid="search-form" onSubmit={(event) => submit(event, 1)}>
        <div className="search-wrapper field has-addons is-flex is-justify-content-center">
          <div className="is-fullwidth control">
            <input
              className="input"
              type="text"
              placeholder="Busca una película"
              onChange={handleChange}
              value={inputValue}
            />
          </div>
          <div className="control">
            <button
              type="submit"
              data-testid="search-button"
              className="button is-primary"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  submit: PropTypes.func,
}

export default SearchForm
