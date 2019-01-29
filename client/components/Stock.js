import React from 'react'

const Stock = ({ stock }) => {
  const { ticker, price, open, quantity, value } = stock
  let color = '#5a6268'
  if (price > open) color = '#50c4aa'
  if (price < open) color = '#e2725b'

  return (
    <tr style={{ color }}>
      <td>{ticker}</td>
      <td>{quantity}</td>
      <td>${(price).toFixed(2)}</td>
      <td>${(value).toFixed(2)}</td>
    </tr>
  )
}

export default Stock