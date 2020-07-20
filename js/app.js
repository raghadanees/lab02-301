'use strict'

let keywords = [];
let images = [];

function Image ( url, title , description,keyword, horns){
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
         
        let img = new Image(element.image_url, element.title , element.description,element.keyword, element.horns);
        keywords.push(element.keyword);
        img.displayImg();
    });
console.log(keywords);

} );

Image.prototype.displayImg = function(){
    
    console.log('here is this',this);
    
    let itemClone = $('.photo-template').clone().attr('id', this.keyword);
    
   
    // $('#photo-template').removeAttr('id');
// استخدمنا فايند بدل الدولار ساين
    itemClone.find("h2").text(this.title);
    itemClone.find("img").attr("src", this.url);
    itemClone.find("p").text(this.description);
    itemClone.removeClass('photo-template');
     $('main').append(itemClone); 
    // itemClone.append('.photo-template')
    
    

}
//$(selector).filter(criteria, function(index))
// $( "select" ).filter(function( index ) {

//     return index === 1 || $( this ).attr( "id" ) === "fourth";
//   })