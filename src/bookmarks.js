import $ from "jquery";
import api from "./api";
import STORE from "./store";

// const generateStarRating = function (bookmark) {
//   let starRating;
//   let starChecked = bookmark.rating;
//   let starUnchecked = 5 - starChecked;
//   const starCheckedHtml = `<span class="fa fa-star checked"></span>`;
//   const starUncheckedHtml = `<span class="fa fa-star"></span>`;

//   starRating =
//     starCheckedHtml.repeat(starChecked) +
//     starUncheckedHtml.repeat(starUnchecked);

//   return starRating;
// };

const generateError = function (errorMessage) {
  return `
    <!-- ERROR DISPLAY -->
    <div class="error-container js-error-container">
      <button id="cancel-error">X</button>
      <h2>ERROR!</h2>
      <p>${errorMessage}</p>
    </div>
    `;
};

const renderButtonClose = function () {
  $(".js-error-container").remove();
};

// if there is an error, render error container
const renderError = function () {
  if (STORE.error) {
    if (STORE.adding) {
      const errorMessage = generateError(STORE.error);
      $(".flex-container").after(errorMessage);
    } else if (!STORE.adding) {
      const errorMessage = generateError(STORE.error);
      $(".user-controls").after(errorMessage);
    }
  } else {
    $(".js-error-container").empty();
  }
};

const serializeJson = function (form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
};

//change on click adding: false => adding: true
const handleBookMarkAdd = function () {
  $("#main").on("click", ".js-button-add", function () {
    //console.log('add button was clicked')
    if (!STORE.adding) {
      STORE.adding = true;
    }
    render();
  });
};
//bookmark form
const handleBookmarkSubmit = function () {
  $(".add-bookmark-form").submit(function (event) {
    event.preventDefault();

    let formElement = $(".add-bookmark-form")[0];
    let jsonObj = serializeJson(formElement);

    api
      .createBookmark(jsonObj)
      .then((newBookMark) => {
        STORE.addBookmark(newBookMark);
        render();
      })
      .catch((e) => {
        STORE.setError(e.message);
        renderError();
      });
    render();
  });
};
//render
const render = function () {
  $("#main").html(generateBookmarkHeader());
  // render bookmark form if adding: true
  if (STORE.adding) {
    //console.log('adding test')
    $(".user-controls").toggleClass("bookmark-hide");
    $(".js-error-container-main").toggleClass("bookmark-hide");
    $(".js-bookmark-container").html(generateBookMarkAddHtml());
    renderError();
    bindEventListeners();

    //render bookmarks if any
  } else if (STORE.filter) {
    let bookmarksFilteredCopy = [...STORE.filteredBookmarks];
    const bookmarkFilteredHtml = generateBookMarksHtml(bookmarksFilteredCopy);
    $(".js-bookmark-container").html(bookmarkFilteredHtml);
    renderError();
    STORE.filteredBookmarks = [];
    bindEventListeners();
  } else {
    const bookmarkHtml = generateBookMarksHtml(STORE.bookmarks);
    // add the html to the bookmark container
    $(".js-bookmark-container").html(bookmarkHtml);
    renderError();
    bindEventListeners();
  }
};
//target bookmark ids
const getBookmarkIdFromElement = function (targetElement) {
  return $(targetElement)
    .closest(".js-bookmark-condensed-container")
    .data("item-id");
};
//expand bookmark details on click
const handleBookmarkExpand = function () {
  $(".js-bookmark-container").on("click", ".js-expand-button", (e) => {
    const id = getBookmarkIdFromElement(e.currentTarget);
    STORE.expandBookmark(id);
    render();
  });
};
//Delete bookmark from api/store
const handleBookmarkDelete = function () {
  $(".js-delete-button").on("click", (e) => {
    const id = $(e.currentTarget).parent().parent().parent().data("item-id");
    api
      .deleteBookmark(id)
      .then(() => {
        STORE.deleteBookmark(id);
        render();
      })
      .catch((e) => {
        STORE.setError(e.message);
        renderError();
      });
  });
};

const handleErrorClose = function () {
  $(".flex-container").on("click", "#cancel-error", () => {
    renderButtonClose();
    STORE.setError(null);
  });
};

const handleBookmarkCancel = function () {
  $(".js-cancel-button").on("click", function () {
    STORE.setAdding(false);
    render();
  });
};

const handleBookmarkFilter = function () {
  $("#star-rating-filter").change(() => {
    let filterParam = $("#star-rating-filter").val();
    console.log("rating:", filterParam);
    STORE.filterBookmarks(filterParam);
    render();
  });
};

const bindEventListeners = function () {
  handleErrorClose();
  handleBookmarkFilter();
  handleBookmarkCancel();
  handleBookmarkDelete();
  handleBookmarkExpand();
  handleBookMarkAdd();
  handleBookmarkSubmit();
};

export default {
  bindEventListeners,
  render,
};
