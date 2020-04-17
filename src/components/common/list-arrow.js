import React from 'react'
import listArrowStyles from './list-arrow.module.scss'

export default ({ items }) => {
  return (
    <ul className={listArrowStyles.listArrow}>
      {items.map(node => (
        <li className={listArrowStyles.listArrowItem}>
          {node}
          <span aria-hidden className={listArrowStyles.listArrowIcon}>
            →
          </span>
        </li>
      ))}
    </ul>
  )
}
