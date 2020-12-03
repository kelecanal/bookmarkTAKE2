const BASE_URL = "https://thinkful-list-api.herokuapp.com/kelecanal";

function fetchAPI(...args) {
  let err;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        error = {
          code: res.status,
        };
      }
      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
}

//GET (retrieve bookmark)

const retrieveBookmark = function () {
  return fetch(`${BASE_URL} + "/bookmarks"`);
};

//DELETE (delete bookmark)

const deleteBookmark = function (obj) {
  const option = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  return fetchAPI(BASE_URL + "/bookmarks" + obj, option);
};

//POST (save bookmark)

const saveBookmark = function (newInput) {
  const newBmark = newInput;
  console.log(newBmark);
  const option = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: newBmark,
  };
  console.log(option);
  return fetchAPI(BASE_URL + "/bookmarks", option);
};

//export

export default {
  retrieveBookmark,
  deleteBookmark,
  saveBookmark,
};
