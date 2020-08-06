'use strict'

 let keywords =[];
 let page = 1;

function Image(image_url, keyword, title, horns) {
    this.image_url = image_url;
    this.title = title;
    // this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    keywords.push(keyword);
    Image.all.push(this);
}
Image.all = [];

getDataAndRender(page);
function getDataAndRender(page) {
  $.get(`data/page-${page}.json`, function (data) {
    data.forEach((el) => {
      let newImage = new Image(el.image_url, el.keyword, el.title, el.horns);
      newImage.render();
    });
    $('#photo-template').hide();
    createOptions(keywords);
  });
}
Image.prototype.render = function () {
    let template = $('#imageTemplate').html();
    let objRendered = Mustache.render(template,this);
    $('main').append(objRendered);
  };

  function createOptions(arr) {
    let uniqueOptionsArr = [...new Set(arr)];
    uniqueOptionsArr.forEach((el) => {
      $('select').append(`<option value="${el}">${el}</option>`);
    });
  }

  showSelected();
function showSelected() {
  $('select').change(function () {
    let selected = $(this).val();
    $('section').hide();
    $(`.${selected}`).show();
  });
}

$('#byKeyword').click(sortByKeyword);
$('#byHorns').click(sortByHorns);

function sortByKeyword() {
    Image.all.sort(function (a, b) {
      return a.keyword.localeCompare(b.keyword);
    });
    $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
    Image.all.forEach((e) => {
      e.render();
    });
  }

  function sortByHorns() {
    Image.all.sort(function (a, b) {
      return a.horns - b.horns;
    });
    $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
    Image.all.forEach((e) => {
      e.render();
    });
  }

  $('#page1').click(choosePage(1));
$('#page2').click(choosePage(2));

function choosePage(num) {
  return function () {
    Image.all = [];
    keywords = [];
    $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
    $('option').not(':first').remove();
    page = num;
    getDataAndRender(page);
  };
}

// $('#page1').click(getDataFromPage1)

// $('#page1').click(function () {  //////
    // function getDataFromPage1(){
    // $.get('data/page-1.json').then(data => {
    //     //console.log(data)
    //     data.forEach(element => {
    //         var img = new Image(element);
    //         // console.log(img);
    //         img.displayImg();


    //     });

    //     createOptions();

    // });
// }); /////////

// }



// Image.prototype.displayImg = function () {

//     let itemClone = $('.photo-template').clone().attr('id', this.keyword);
//     // $('#photo-template').removeAttr('id');
//     // استخدمنا فايند بدل الدولار ساين
//     itemClone.find("h2").text(this.title);
//     itemClone.find("img").attr("src", this.image_url);
//     itemClone.find("p").text(this.description);
//     itemClone.removeClass('photo-template');
//     $('main').append(itemClone);

// }

// ////////////////////////////////////////////////  Lab 3

Image.prototype.displayImg = function () {
    //1- get template from html
    let imgTemplate = $('#imageTemplate').html();
    // 2- map the obj data to template
    let newObj = Mustache.render(imgTemplate, this);
    $('main').append(newObj);
};


function createOptions() {
    let shown = {};
    console.log(Image.all)

    Image.all.forEach(img => {
        if (!shown[img.keyword]) {

            var option = $(`<option value='${img.keyword}'>${img.keyword}</option>`);
            $("#selectBtn").append(option);

            shown[img.keyword] = true

            console.log('keyword', img.keyword)
        }
    })
}



$('#selectBtn').change(function () {

    let selected = $(this).val();
    $('section').fadeOut();
    $(`#${selected}`).fadeIn();
    console.log(selected);

})
$('#idSort').click(KeywordSort);

function KeywordSort() {
    Image.all.sort(function (objA, objB) {
        return objA.keyword.localeCompare(objB.keyword);

    });
    img.displayImg()

}




// ////////////////////////////////////////////////  Lab 3

// $('#Page2').click(getDataFromPage2)

// function getDataFromPage2() {
//     $.get('data/page-2.json').then(data => {
//         //console.log(data)
//         data.forEach(element => {
//             var img = new Image(element);
//             // console.log(img);
//             img.displayImg();


//         });

//         createOptions();

//     });

// }