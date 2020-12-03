let bookmarks = [];
let adding = false;
let error = null;
let filter = false;
let filteredBookmarks = [];

const addBookmark = function (obj) {
  //create for loop
  for (let i = 0; i < bookmarks.length; i++) {
    //when looping thru bookmarks array, if value of bookmark
    if (bookmarks[i]) {
      bookmarks[i].expand = false;
    }
  }
  //add bmmark to store
  bookmarks.push(obj);
  //be able to toggle adding t/f
  this.adding = false;
};

const expandBookmark = function (obj) {
  //return val that passes
  let exBm = bookmarks.find((bookmark) => bookmark.obj === obj);
  if (exBm.expand) {
    exBm.expand = false;
  } else {
    exBm.expand = true;
  }
};

const deleteBookmark = function (obj) {
  this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.obj !== obj);
};

const filterBookmarks = function (strValue) {
  this.filter = true;
  this.bookmarks.forEach((bookmark) => {
    if (bookmark.rating >= strValue) {
      this.filteredBookmarks.push(bookmark);
    }
  });
};

//set

const setAdding = function (inp) {
  this.adding = inp;
};

const setFilter = function (inp) {
  this.filter = inp;
};

export default {
  bookmarks,
  adding,
  filter,
  filteredBookmarks,
  addBookmark,
  expandBookmark,
  deleteBookmark,
  filterBookmarks,
  setAdding,
  setFilter,
};
