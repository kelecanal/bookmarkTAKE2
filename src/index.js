import "normalize.css";
import STORE from "./store";
import functionality from "./functionality";

const main = function () {
  api
    .getBookmarks()
    .then((res) => res.json())
    .then((res) => {
      res.forEach((bookmark) => STORE.addBookmark(bookmark));
      functionality.render();
    });
  functionality.bindEventListeners();
};

$(main);
