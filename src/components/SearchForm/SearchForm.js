import React from 'react'
import PropTypes from 'prop-types'
import './SearchForm.scss'

function SearchForm(props) {
  const { setInputValue, submit } = props

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="is-fullwidth">
      <form onSubmit={(event) => submit(event, 1)}>
        <div className="search-wrapper field has-addons is-flex is-justify-content-center">
          <div className="is-fullwidth control">
            <input
              className="input"
              type="text"
              placeholder="Busca una película"
              onChange={handleChange}
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
  )
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  submit: PropTypes.func,
}

export default SearchForm
