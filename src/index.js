import $ from "jquery";
import api from "./api";
import "normalize.css";
import STORE from "./store.js";
import functionality from "./functionality";

const main = function () {
  api
    .retrieveBookmark()
    .then((res) => res.json())
    .then((res) => {
      res.forEach((bookmark) => STORE.addBookmark(bookmark));
      functionality.render();
    });
  functionality.bindEventListeners();
};

$(main);
