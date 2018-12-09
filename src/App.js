import React, {Fragment, useEffect, useState} from "react";

import api from "./api";

const App = () => {
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    api.items.fetch().then(_items => {
      setItems(_items);
      setStatus("resolved");
    });
  }, []);

  function handleAdd(event) {
    event.preventDefault();

    setItems(actualItems => {
      const newItems = actualItems.concat({id: actualItems.length, name: item});

      api.items.update(newItems);

      return newItems;
    });

    setItem(null);
  }

  function handleDelete(id) {
    setItems(actualItems => {
      const newItems = actualItems.filter(_item => _item.id !== id);

      api.items.update(newItems);

      return newItems;
    });
  }

  if (status === "pending") return <span>Loading...</span>;

  return (
    <Fragment>
      <h1>Supermarket list</h1>
      <h3>{items.length} item(s)</h3>
      <ul>
        {items.map(_item => (
          <li key={_item.id}>
            <b>{_item.name}</b>
            <i className="hover-danger" onClick={() => handleDelete(_item.id)}>
              delete
            </i>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => setItem("New item")}>
        Add item
      </button>
      {item && (
        <div className="overlay">
          <div className="modal">
            <span className="close" />
            <form onSubmit={handleAdd}>
              <h2>Add item</h2>
              <input
                autoFocus
                type="text"
                value={item}
                onChange={event => setItem(event.target.value)}
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;
