const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const path = require('path');

function httpGet(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.responseText);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      console.log(`statusText: ${xhr.statusText}`);
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

//chaining
//trying to get response from user.json
httpGet('file://D:/Node/promises/user.json')
  .then(response => {
      console.log(`user as json: ${response}`);
      let user = JSON.parse(response);
      return user;
    },
    error => {
      console.log(`rejected: ${error.message}`);
    })
  //using parsed object
  .then(user => {
    console.log('user as object:', user);
    return httpGet(`https://api.github.com/users/${user.users[0]}`);
  })
  //using github api to get info about user
  .then(githubUser => {
    githubUser = JSON.parse(githubUser);
    console.log(`github info for users: \n name: ${githubUser.login} \n id: ${githubUser.id} \n following: ${githubUser.following} \n followers: ${githubUser.followers}`);

  }, (error) => {
    if (error.code == 404) {
      console.log('404');
    } else throw error;
  })
  .catch(error => {
    console.log(error);
    throw error;
  });