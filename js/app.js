'use strict'

let keywords = [];
let images = [];

function Image(url, title, description, keyword, horns) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    images.push(this);
}

$.get('data/page-1.json').then(data => {
    //console.log(data)
    data.forEach(element => {

        let img = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        keywords.push(element.keyword);
        img.displayImg();
    });
    console.log(keywords);

});

Image.prototype.displayImg = function () {

    // console.log('here is this',this);

    let itemClone = $('.photo-template').clone().attr('id', this.keyword);


    // $('#photo-template').removeAttr('id');
    // استخدمنا فايند بدل الدولار ساين
    itemClone.find("h2").text(this.title);
    itemClone.find("img").attr("src", this.url);
    itemClone.find("p").text(this.description);
    itemClone.removeClass('photo-template');
    $('main').append(itemClone);

}



// $(function (keyword) {
//     var option = ''
//     for (let i = 0 ; i < keywords.length; i ++){
//         option = $("<option></option>");

//         // option.text(this.keyword);
//         // option.val(keyword.Id);
//         $("#selectBtn").append(option);

//     }
// });

var option = $("<option></option>");
option.text('hello');
$("#selectBtn").append(option);

// Image.prototype.addItemToSelect = function(){
//     for (let i = 0 ; i < keywords.length; i ++){
//     var option = $("<option></option>");
//      option.text(this.keyword);
//      option.val(keyword.Id);
//      $("#selectBtn").append(option);
//     }
// }
// addItemToSelect();

$(function (keyword) {
    for (let i = 0; i < keywords.length; i++) {
        var option = $("<option></option>");
        option.text(keyword[i]);
        // option.val(this.keyword.Id);
        $("#selectBtn").append(option);
    }
    console.log(option);
});


// keywords.forEach(element => {
//     var option = $("<option></option>");
//     option.html(element.keyword);
//     option.val(element.keyword.Id);
//     $("#selectBtn").append(option);
//     console.log(option);
// });

