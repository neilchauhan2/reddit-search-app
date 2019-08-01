const search = (keyword, limit, sortby) => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/http://www.reddit.com/search.json?q=${keyword}&sort=${sortby}&limit=${limit}`
  )
    .then(res => res.json())
    .then(data => data.data.children.map(item => item.data))
    .catch(err => console.log(error));
};

export default { search };
