$(document).ready(function(){
    $('#cartcontent').datagrid({
        singleSelect:true,
        showFooter:true
    });
    $('.item').draggable({
        revert:true,
        proxy:'clone',
        onStartDrag:function(){
            $(this).draggable('options').cursor = 'not-allowed';
            $(this).draggable('proxy').css('z-index',10);
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='move';
        }
    });
    $('.cart').droppable({
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
        },
        onDrop:function(e,source){
            var name = $(source).find('p:eq(0)').html();
            var price = $(source).find('p:eq(1)').html();
            addProduct(name, parseFloat(price.split('£')[1]));
            console.log(name, price);
            localStorage.setItem('ALbum-Name', name);
           
            localStorage.setItem('Price', price);
        }
    });

    SpotifyJson();

}); // End of document.ready
    
function addProduct(name, price){
    var dg = $('#cartcontent');
    var data = dg.datagrid('getData');
    function add() {
        for(var i=0; i<data.total; i++){
            var row = data.rows[i];
            if (row.name == name){
                row.quantity += 1;
                return;
            }
        }
        data.total += 1;
        data.rows.push({
            name:name,
            quantity:1,
            price:price
        });
        
    }

    add();
    dg.datagrid('loadData', data);
    var cost = 0;
    var rows = dg.datagrid('getRows');
    for(var i=0; i<rows.length; i++){
        cost += rows[i].price*rows[i].quantity;
    }
    dg.datagrid('reloadFooter', [{name:'Total',price:cost}]);
    localStorage.setItem('Total', cost);
}


function SpotifyJson(){
    var vessels = {
        "tracks": {
            "href": "https://api.spotify.com/v1/search?query=Starset&type=track&market=US&offset=5&limit=10",
            "items": [
              {
                "album": {
                  "album_type": "album",
                  "artists": [
                    {
                      "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0kD8IT1CzF7js2XKM9lLLa"
                      },
                      "href": "https://api.spotify.com/v1/artists/0kD8IT1CzF7js2XKM9lLLa",
                      "id": "0kD8IT1CzF7js2XKM9lLLa",
                      "name": "Starset",
                      "type": "artist",
                      "uri": "spotify:artist:0kD8IT1CzF7js2XKM9lLLa"
                    }
                  ],
                  "external_urls": {
                    "spotify": "https://open.spotify.com/album/4iJ9B2uDKJzclQo7U9BqS8"
                  },
                  "href": "https://api.spotify.com/v1/albums/4iJ9B2uDKJzclQo7U9BqS8",
                  "id": "4iJ9B2uDKJzclQo7U9BqS8",
                  "images": [
                    {
                      "height": 640,
                      "url": "https://i.scdn.co/image/6e16da7a09fb493ab6b8067e4302f24b40def98e",
                      "width": 640
                    },
                    {
                      "height": 300,
                      "url": "https://i.scdn.co/image/c569bda2cde496a227b5635c29fd9f65bd2868f7",
                      "width": 300
                    },
                    {
                      "height": 64,
                      "url": "https://i.scdn.co/image/42b308a56b809d41cadb4c23ac7a37d7f01b14ac",
                      "width": 64
                    }
                  ],
                  "name": "Vessels",
                  "release_date": "2017-01-20",
                  "release_date_precision": "day",
                  "total_tracks": 15,
                  "type": "album",
                  "uri": "spotify:album:4iJ9B2uDKJzclQo7U9BqS8"
                }
              }
            ]
          }       
    };

    console.log(JSON.stringify(vessels));
    var spotifyImage = '',
        imgUrl = vessels["tracks"]["items"][0]["album"]["images"][1]["url"],
        albumName = vessels["tracks"]["items"][0]["album"]["name"],
        imglink = vessels["tracks"]["items"][0]["album"]["external_urls"]["spotify"];

  spotifyImage += '<li><a href="' + imglink + '"><img src="' + imgUrl + '"><h3>' + albumName + '</h3></a></li>';
    $("#Albums ul").html(spotifyImage);

    //name song image[1]
}

