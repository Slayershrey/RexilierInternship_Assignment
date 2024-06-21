import React from "react";

const TransactionsTable = ({ transactions, onNext, onPrevious }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onPrevious} disabled={transactions.length === 0}>
        Previous
      </button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default TransactionsTable;
