const deffer = (fn: any): Promise<any> =>
  new Promise(resolve => setTimeout(() => resolve(fn), 1000));

export default {
  items: {
    fetch: (): Promise<Array<Object>> =>
      deffer(JSON.parse(localStorage.getItem("items") || "[]")),
    update: (items: Array<Object>) =>
      deffer(localStorage.setItem("items", JSON.stringify(items))),
  },
};
