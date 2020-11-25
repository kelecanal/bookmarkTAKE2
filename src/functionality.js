// import $ from "jquery";

// import "normalize.css";
// import "./style.css";

// import api from "./api";
// import store from "./store";

// /*

// RATING

// */

// const starRating = (bkmark) => {
//   let starUp = bkmark.rating;
//   let starDown = 5 - starUp;

//   const starUpShow = `<span class = "star-up"></span>`;
//   const starDownShow = `<span class = "star-down"></span>`;

//   let starRatings = starUpShow.repeat(starUp) + starDownShow.repeat(starDown);

//   return starRatings;
// };

// /*

// TEMPLATES

// */

// //int view of page
// const initialBookmarkPage = function () {
//   return $(".root").html(`
//     <header>
//       <h1>Store Your Bookmarks!</h1>
//     </header>
//     <div class="first-container">
//       <div class="bookmark-container">
//          <section class="bookmark-controls">
//              <button class="add-button jq-add-button">+ Add New!</button>
//              <div class="filter-container">
//                  <label for="star-rating-filter">Filter by:</label>
//                  <select name="star-filter" id="filter">
//                      <option value="5">5 Stars</option>
//                      <option value="4">4 Stars</option>
//                      <option value="3">3 Stars</option>
//                      <option value="2">2 Stars</option>
//                      <option value="1">1 Star</option>
//                  </select>
//              </div>
//          </section>
//          <section class="bm-container jq-bm-container">
//          </section>
//       </div>
//     </div>
//     `);
// };

// //form that shows bookmarks are (to be) toggled
// const handleBookmarkToggleForm = function () {
//   return `
//         <div class ="add-bookmark-container">
//             <form class="add-bookmark-form">
//                 <fieldset role="group">
//                 <legend class ="form"><h3>Add Bookmark</h3></legend>
//                 <label class ="form" for="title">Bookmark Title:</label>
//                 <input type="text" id="title" name="title" required>
//                 <div class="hide-bookmark-display">
//                     <label for="rating-title" class="form">Rating</label><br>
//                     <label for="star-rating" class="hide-bookmark-display" id="rating5">5*</label>
//                     <input type="radio" name="rating" id="rating5"  value="5">
//                     <label for="star-rating" class="hide-bookmark-display" id="rating4">4*</label>
//                     <input type="radio" name="rating" id="rating4"  value="4">
//                     <label for="star-rating" class="hide-bookmark-display" id="rating3">3*</label>
//                     <input type="radio" name="rating" id="rating3"  value="3">
//                     <label for="star-rating" class="hide-bookmark-display" id="rating2">2*</label>
//                     <input type="radio" name="rating" id="rating2"  value="2">
//                     <label for="star-rating" class="hide-bookmark-display" id="rating1">1*</label>
//                     <input type="radio" name="rating" id="rating1"  value="1">
//                 </div>
//                 <label for="description" class="form">Description:<br>
//                 <textarea name="description" id="" cols="70" rows="5"></textarea>
//                 </label><br>
//                 <label for="URL" class="form">URL:<br></label>
//                 <input type="text" name="URL" id="url-input" required>
//                 <div class="required-message">
//                     <p class="url-requirements">URLs <i>must</i> contain HTTP/HTTPS</p>
//                 </div>
//                 <div class="action-buttons">
//                     <input type="submit" value="Submit">
//                     <input type="button" value="Cancel" class="jq-cancel-bm">
//                 </div>
//             </fieldset>
//             </form>
//         </div>
//    `;
// };

// //bookmark view when rendered
// const bookmarkHTML = function (bookmark) {
//   // let togBookmark = !bookmark.expand ? "hide-bookmark-display" : "";
//   let rateBookmark = starRating(bookmark);
//   return `
//     <div class = "collapsed-bm-container">
//       <button class = "expnd-bm-button jq-bm-expand">See Details</button>
//       <h3 class = "bm-title jq-bm-title">${bookmark.title}</h3>
//       <div class = "jq-bm-rating">${starRating}</div>
//       <div class = "bm-rating jq-bm-rating">
//         ${rateBookmark}
//       </div>
//       <div class = "expnd-bm-container jq-ex-bm-container">
//         <p>Description: ${bookmark.description}</p>
//       </div>
//       <div class = "extLink-delete">
//         <a class = "jq-bm-url" href=${bookmark.url} target="_blank">Click to visit</a>
//         <button class = "jq-bm-delete">Delete</button>
//       </div>
//     </div>
//   `;
// };

// //map thru bm
// const bookmarkHtmlCir = function (inp) {
//   const bmHTML = inp.map((mark) => {
//     bookmarkHTML(mark);
//   });
//   return bmHTML.join("");
// };

// /*

// EVENT LISTENERS

// */

// //stringify json data
// const stringJson = function (inp) {
//   const bmData = new bmData(inp);
//   const mark = {};
//   bmData.forEach((ent, name) => (mark[name] = ent));
//   return JSON.stringify(mark);
// };

// //add new bookmark to list
// const handleAddNewBookmark = function () {
//   $(".root").on("click", ".jq-add-button", () => {
//     if (!store.adding) {
//       store.adding = true;
//     }
//     render();
//   });
// };

// //submitting new bookmarks
// const handleNewBookmarkSubmit = function () {
//   $(".add-bookmark-form").submit(function (event) {
//     event.preventDefault();
//     $(".jq-bm-container").toggleClass("hidden");
//     api.saveBookmark().then(() => {
//       $(".first-container").toggleClass("hidden");
//       store.adding = false;
//       render();
//     });
//   });
// };

// //deleting bookmarks
// const handleBookmarkDelete = function () {
//   $(".jq-bm-delete").on("click", (event) => {
//     let idDelete = $(event.currentTarget)
//       .closest(".jq-bm-container")
//       .attr("idDelete");
//     api.deleteBookmark(idDelete).then(() => {
//       store.deleteBookmark(idDelete);
//       render();
//     });
//   });
// };

// //get bm id values
// const bmIDVal = function (inp) {
//   return $(inp).closest(".collapsed-bm-container").data();
// };

// //expand bm details when clicked
// // const bookmarkExpand = function () {
// //   $('.jq-bookmark-container').on('click', (e)) => {
// //     const bm = bmIDVal()
// //   }
// // }

// /*

// BOOKMARK DISPLAY

// */

// const displaySorted = function (marks) {
//   let list = marks;
//   let html = "";
//   for (let i = 0; i < list.length; i++) {
//     html += `
//     <div id = ${list[i].id} class "bmList">

//     `;
//   }
// };

// /*

// RENDERING

// */

// const render = function () {
//   $(".root").html(initialBookmarkPage());

//   //if adding bookmark, render add bookmark page

//   if (store.adding) {
//     $(".bookmark-controls").toggleClass(".hide-bookmark-display");
//     $(".jq-bookmark-container").html(handleBookmarkToggleForm());
//     bindEventListeners();
//     //if there are previous bookmarks, render those
//   } else if (store.filter) {
//     let filtBookmarks = [...store.filteredBookmarks];
//     const bmFilteredHtml = initialBookmarkPage(filtBookmarks);
//     store.filteredBookmarks = [];
//     bindEventListeners();
//   } else {
//     const bookmarkHTMLVar = bookmarkHTML(store.bookmarks);

//     $("jq-bookmark-container").html(bookmarkHTMLVar);
//     bindEventListeners();
//   }

//   if (store.bookmarks.length > 0) {
//     $(".add-bookmark-container").addClass("hidden");
//   } else {
//     $(".add-bookmark-container").removeClass("hidden");
//   }
// };

// /*

// BINDING EVENT LISTENERS

// */

// const bindEventListeners = function () {
//   initialBookmarkPage();
//   handleBookmarkToggleForm();
//   handleAddNewBookmark();
//   handleBookmarkDelete();
//   handleNewBookmarkSubmit();
// };

// /*

// EXPORT DEFAULT

// */

// export default {
//   bindEventListeners,
//   render,
// };
