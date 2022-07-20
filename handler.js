"use strict";

const Instagram = require("instagram-web-api");
const IG_API = require("instagram-private-api");
const ig = new IG_API.IgApiClient();
ig.state.generateDevice("srikar_st");


var savedFeed
var posts = 0;
module.exports.login = async (event) => {
  await ig.account.login("srikar_st", "Srikarpoiu10$");
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: "logged in"
      },
      null,
      2
    ),
  };
}
module.exports.logout = async (event) => {
  await ig.account.logout();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: "logged out"
      },
      null,
      2
    ),
  };
}
module.exports.hello = async (event) => {
  if (event.path == '/0') await ig.account.login("srikar_st", "Srikarpoiu10$");
  try {
     // get saved posts
     if (!savedFeed) {
       savedFeed = ig.feed.saved();
     }
     if (posts == 0 || savedFeed.isMoreAvailable()) {
       const mySavedPosts = await savedFeed.items();
       posts = posts + mySavedPosts.length;
     }
     else {
       try {
         if (!posts.includes("final")) posts = posts + "-final"
       }
       catch(e) {
        posts = posts + "-final"
       }
       ig.account.logout()
       savedFeed = undefined
      }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: posts
      },
      null,
      2
    ),
  };
  }
  catch(e) {
    console.log(e)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          error: e
        },
        null,
        2
      ),
    };
  }
};

module.exports.reset = async (event) => {
  loggedInUser = undefined
  // if (!loggedInUser) loggedInUser = await ig.account.login("srikar_st", "Srikarpoiu10$");
  savedFeed = undefined;
  posts = 0
  await ig.account.logout()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: "reset"
      },
      null,
      2
    ),
  };
};
