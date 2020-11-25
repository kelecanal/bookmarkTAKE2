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

import $ from "jquery";
import api from "./api";
import "normalize.css";
import STORE from "./store.js";
import bookmarks from "./bookmarks.js";

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
