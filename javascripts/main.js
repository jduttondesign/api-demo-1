"use strict";

let apiKeys = {};

let imageList = (searchText) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response) => {
      apiKeys = response;
      let authHeader = 'Client-ID ' + apiKeys.client_id;
      $.ajax({
        method: 'GET',
        headers:{
          'Authorization': authHeader
        },
        url: ` https://api.imgur.com/3/gallery/t/${searchText}`
      }).then((response2)=>{
        resolve(response2.data.items);
      }, (errorResponse2) => {
        reject(errorResponse2);
      });
    }, (errorResponse) =>{
      reject(errorResponse);
    });
  });
};



$(document).ready(function() {
  console.log("jquery is ready");
  imageList('cat').then((dataFromImgur)=>{
    console.log('dataFromImgur', dataFromImgur);
  });
});






