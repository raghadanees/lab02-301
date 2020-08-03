'use strict';

let images = [];
let options = [];

function Card(image_url, title, description, keyword, horns, page){
    this.url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    this.page = page;
    images.push(this);
    if(!options.includes(this.keyword)){
        options.push(this.keyword);
    }
};

for(let i =1; i<3; i++){
    $.ajax(`./data/page-${i}.json`)
    .then(data =>{
        data.forEach(item =>{new Card(item.image_url, item.title, item.description, item.keyword, item.horns, i);})
        render();
    })};

// console.log(images)

function render(){
    $('#container').html('');
    $('#keys').html('<option value="default">Filter by Keyword</option>');
    images.forEach(item => {$('#container').append(Mustache.render($('#1stTempl').html(), item))});
    options.forEach(keyword => $('#keys').append(Mustache.render(`<option value="${keyword}">{{#.}}{{.}}{{/.}}</option>`, keyword)))
    $('#keys').val('default');
}


// console.log(options2);

$('#ssort').on('change', (event) =>{
    if(event.target.value == 'a2z'){
        images.sort((a, b) => {if(a.title == b.title){return 0}if(a.title>b.title){return 1}else{return -1}});
        render();
        cheek();
    } else if(event.target.value == 'z2a'){
        images.sort((a, b) => {if(a.title == b.title){return 0}if(a.title<b.title){return 1}else{return -1}});
        render();
        cheek();
    } else if(event.target.value == 'horns'){
        images.sort((a, b) => a.horns - b.horns);
        render();
        cheek();
    }
})



$('#keys').change(event =>{
    $('section').each(function(){
        $(this).show();
        cheek();
        if(event.target.value == 'default'){
            $(this).show();
        }else if($(this).attr('id') !== event.target.value){
            $(this).hide();
            // console.log(this)
        }if($(this).attr('class') === event.target.value){
            $(this).toggle();   
        }
    })});

function cheek(){
    if($("#cheak1").prop("checked")){
        // $('section').each(function(){
        //     // if($(this).attr('page') === '1'){
        //     //     $(this).hide();
        //     // }
            
        // })
        $('#container section[page!="1"]').hide();
    }
    if($("#cheak2").prop("checked")){
        // $('section').each(function(){
        //     if($(this).attr('page') === '2'){
        //         $(this).hide();    
        //     }})
        $('#container section[page!="2"]').hide();
        }

}

$('input').on('change', function() {
    $('input').not(this).prop('checked', false); 
    render(); 
    cheek();
});


//end
