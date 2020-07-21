'use strict'

// let keywords =[];

function Image(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;

    Image.all.push(this);
}
Image.all = [];

$.get('data/page-1.json').then(data => {
    //console.log(data)
    data.forEach(element => {
        var img = new Image(element);
        // console.log(img);
        img.displayImg();
        
        
    });
    // createOptions();
    // img.createOptions();
    createOptions();
    
});

Image.prototype.displayImg = function () {

    let itemClone = $('.photo-template').clone().attr('id', this.keyword);
    // $('#photo-template').removeAttr('id');
    // استخدمنا فايند بدل الدولار ساين
    itemClone.find("h2").text(this.title);
    itemClone.find("img").attr("src", this.image_url);
    itemClone.find("p").text(this.description);
    itemClone.removeClass('photo-template');
    $('main').append(itemClone);

}


function createOptions () {
    let shown = {};
    console.log(Image.all)
    
    Image.all.forEach(img => {
        if (!shown[img.keyword]) {
           
            var option = $(`<option value='${img.keyword}'>${img.keyword}</option>`);
            $("#selectBtn").append(option);
            
            shown[img.keyword] = true

            console.log('keyword',img.keyword)
        }
    })
}



$('#selectBtn').change(function(){
    
    var selected=$(this).val();
    $('section').fadeOut();
   $(`#${selected}`).fadeIn();
    console.log(selected);

})
