const deffer = fn =>
  new Promise(resolve => setTimeout(() => resolve(fn), 1000));

export default {
  items: {
    fetch: () => deffer(JSON.parse(localStorage.getItem("items") || "[]")),
    update: items =>
      deffer(localStorage.setItem("items", JSON.stringify(items))),
  },
};
