import React, { useReducer, useState } from 'react'

const formReducer = (state, e) => {
  if (e.reset) {
    return {
      title: '',
      time: '',
      distance: 0,
      walk: 0,
      powerWalk: 0,
      run: 0,
    }
  }
  return {
    ...state,
    [e.title]: e.value,
  }
}
const Form = ({ placeholderColour, buttonTextColour, pointerColour }) => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    fetch(
      'https://yqupgbkal5.execute-api.eu-central-1.amazonaws.com/latest/api/run',
      {
        method: 'POST',
        body: JSON.stringify(setFormData),
      }
    ).then(function (response) {
      console.log(response)
      return response.json()
    })

    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting({ reset: true })
    })
  }

  const handleChange = (e) => {
    setFormData({
      title: e.target.value,
      value: e.target.value,
    })
  }
  const labelText =
    'block uppercase tracking-wide text-white text-xs font-bold mb-2'

  const placeholderText = `appearance-none block w-full bg-white text-${placeholderColour}-500 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`

  const buttonText = `bg-white hover:bg-blue-700 text-${buttonTextColour}-500 font-bold py-2 px-4 rounded-md`

  const pointerSVG = `pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-${pointerColour}-500`

  const SVG = (
    <div className={pointerSVG}>
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  )

  const runData = ['walk', 'powerWalk', 'run']

  const options = (
    <>
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
      <option>50</option>
      <option>60</option>
      <option>70</option>
      <option>80</option>
      <option>90</option>
      <option>100</option>
    </>
  )

  return (
    <>
      {submitting && <div>Submitting form...</div>}
      <form
        className="w-full lg:-mt-155 md:mt-0 xxl:mt-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <label className={labelText} for="grid-title">
              Title
            </label>
            <input
              className={placeholderText}
              id="grid-password"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={formData.title}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <label className={labelText} for="grid-time">
              Time
            </label>
            <div className="relative">
              <select
                className={placeholderText}
                id="grid-state"
                onChange={handleChange}
                value={formData.time}
                name="time"
              >
                {options}
              </select>
              {SVG}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <label className={labelText} for="grid-time">
              Distance
            </label>
            <div className="relative">
              <select
                className={placeholderText}
                id="grid-state"
                onChange={handleChange}
                value={formData.distance}
                name="distance"
              >
                {options}
              </select>
              {SVG}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          {runData.map((a) => (
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0" key={a}>
              <label className={labelText} for="grid-state" key={a}>
                {a}
              </label>
              <div className="relative">
                <select
                  className={placeholderText}
                  id="grid-state"
                  onChange={handleChange}
                  value={formData.a}
                  name={a}
                  key={a}
                >
                  {options}
                </select>
                {SVG}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button className={buttonText} type="submit" name="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form
