// //Import JQuery module
// import $ from "jquery";

// import api from "./api";
// import func from "./functionality";
// import store from "./store";

// const main = function () {
//   api
//     .retrieveBookmark()
//     .then((res) => res.json)
//     .then((res) => {
//       res.forEach((element) => store.addBookmark(element));
//       func.render();
//       func.bindEventListeners();
//     });
// };

// $(main);

import "normalize.css";
import STORE from "./store";
import bookmarks from "./bookmarks";

const main = function () {
  api
    .getBookmarks()
    .then((res) => res.json())
    .then((res) => {
      res.forEach((bookmark) => STORE.addBookmark(bookmark));
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
};

$(main);
