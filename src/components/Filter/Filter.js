import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./Filter.module.css"

const Filter = ({ value, onChange }) => (
  <div className={styles.filter}>
    <label>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} className={styles.inpt} />
    </label>
  </div>
)

export default Filter
