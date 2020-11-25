// import store from "./store";

// let BASE_URL = "https://thinkful-list-api.herokuapp.com/kelecanal";

// const fetchAPI = function (...objs) {
//   return fetch(...objs)
//     .then((res) => res.json())
//     .then((getJSON) => (store.bookmarks = getJSON));
// };

// //GET (retrieve bookmark)

// const retrieveBookmark = function () {
//   return fetch(`${BASE_URL} + "/bookmarks"`);
// };

// //DELETE (delete bookmark)

// const deleteBookmark = function (obj) {
//   const option = {
//     method: "DELETE",
//     headers: {
//       "Content-type": "application/json",
//     },
//   };
//   return fetchAPI(BASE_URL + "/bookmarks" + obj, option);
// };

// //POST (save bookmark)

// const saveBookmark = function (newInput) {
//   const newBmark = newInput;
//   console.log(newBmark);
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: newBmark,
//   };
//   console.log(option);
//   return fetchAPI(BASE_URL + "/bookmarks", option);
// };

// //export

// export default {
//   retrieveBookmark,
//   deleteBookmark,
//   saveBookmark,
// };

const BASE_URL = "https://thinkful-list-api.herokuapp.com/james";

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = {
          code: res.status,
        };
      }

      // In either case, parse the JSON stream:
      return res.json();
    })
    .then((data) => {
      // If error was flagged, reject the Promise with the error object
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // Otherwise give back the data as resolved Promise
      return data;
    });
}

const getBookmarks = function () {
  return fetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function (obj) {
  const newBookmark = obj;
  console.log("newbookmark:", newBookmark);
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: newBookmark,
  };

  return listApiFetch(BASE_URL + "/bookmarks", options);
};

const deleteBookmark = function (objId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  return listApiFetch(BASE_URL + "/bookmarks/" + objId, options);
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
