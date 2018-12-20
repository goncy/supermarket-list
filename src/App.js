import React, {Fragment, useEffect, useState} from "react";

import api from "./api";

const App = () => {
  const [status, setStatus] = useState("booting");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    api.items.fetch().then(initialItems => {
      setItems(initialItems);
      setStatus("init");
    });
  }, []);

  async function handleUpdate(value) {
    try {
      setStatus("pending");

      await api.items.update(value);

      setItems(value);
      setStatus("resolved");
      setItem(null);
    } catch (e) {
      console.log("e.message:", e.message);

      setStatus("rejected");
    }
  }

  function handleOpenModal() {
    setItem("New item");
  }

  function handleAdd(event) {
    event.preventDefault();

    handleUpdate(items.concat({id: String(Math.random()), name: item}));
  }

  function handleDelete(id) {
    handleUpdate(items.filter(_item => _item.id !== id));
  }

  return (
    <Fragment>
      <h1>Supermarket list</h1>
      {status === "booting" ? (
        <span>Loading...</span>
      ) : (
        <Fragment>
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
            onClick={handleOpenModal}
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
      )}
    </Fragment>
  );
};

export default App;
