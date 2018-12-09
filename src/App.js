import React, {Fragment, useEffect, useState} from "react";

import api from "./api";

const App = () => {
  const [status, setStatus] = useState("booting");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    api.items.fetch().then(_items => {
      setItems(_items);
      setStatus("init");
    });
  }, []);

  async function handleAdd(event) {
    event.preventDefault();
    setStatus("pending");

    try {
      const newItems = items.concat({id: items.length, name: item});

      await api.items.update(newItems);

      setStatus("resolved");
      setItems(newItems);
      setItem(null);

      return newItems;
    } catch (e) {
      console.log(e.message);

      setStatus("rejected");
    }
  }

  async function handleDelete(id) {
    setStatus("pending");

    try {
      const newItems = items.filter(_item => _item.id !== id);

      await api.items.update(newItems);

      setStatus("resolved");
      setItems(newItems);

      return newItems;
    } catch (e) {
      setStatus("rejected");
    }
  }

  if (status === "booting") return <span>Loading...</span>;

  return (
    <Fragment>
      <h1>Supermarket list</h1>
      <h3>{items.length} item(s)</h3>
      <ul>
        {items.map(_item => (
          <li key={_item.id}>
            <b>{_item.name}</b>
            {status !== "pending" && (
              <i
                className="hover-danger"
                onClick={() => handleDelete(_item.id)}
              >
                delete
              </i>
            )}
          </li>
        ))}
      </ul>
      <button
        className="primary"
        disabled={status === "pending"}
        type="button"
        onClick={() => setItem("New item")}
      >
        Add item
      </button>
      {item && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={handleAdd}>
              <h2>Add item</h2>
              <input
                autoFocus
                type="text"
                value={item}
                onChange={event => setItem(event.target.value)}
              />
              <div className="inline">
                <button type="button" onClick={() => setItem(null)}>
                  Close
                </button>
                <button
                  className="primary"
                  disabled={status === "pending"}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;
