export default function persistHistory(req, res) {
    const state = {
      request: req,
      response: res,
      id: new Date().getTime().toString(),
    };
    let historyArr = [];
    if (localStorage.getItem("history")) {
      historyArr = JSON.parse(localStorage.getItem("history"));
    }
    historyArr.unshift(state);
    localStorage.setItem("history", JSON.stringify(historyArr));
  }