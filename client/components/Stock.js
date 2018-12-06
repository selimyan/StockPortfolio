import React from 'react'

const Stock = ({ stock }) => {
  const { ticker, price, open, quantity, value } = stock
  let color = 'text-secondary'
  if (price > open) color = 'text-success'
  if (price < open) color = 'text-danger'

  return (
    <tr className={color}>
      <td>{ticker}</td>
      <td>{quantity}</td>
      <td>${price}</td>
      <td>${(value).toFixed(2)}</td>
    </tr>
  )
}

export default Stock