var googleAPI = 'AIzaSyDwuOfUbyR5Q070toOp8wJEfaR18DQe7gY';
var googleMapURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
var streetCityStrDemo = 'Chagrin Falls, OH';
var newYorkTimeAPI = '0f4e6ee4c2834a35b3dfa268f4ed5a61';

function loadData() {

	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');

	// clear out old data before new request
	$wikiElem.text("");
	$nytElem.text("");

	// load streetview

	// YOUR CODE GOES HERE!

	var $streetStr = $("#street").val();
	var $cityStr = $("#city").val();

	console.log('get street :' + $streetStr + ', city : ' + $cityStr);

	var imgUrl = googleMapURL + streetCityStrDemo + '&key=' + googleAPI;

	$body.append('<img class="bgimg" src="' + imgUrl + '">');

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': newYorkTimeAPI,
		'q': ($streetStr + " " + $cityStr)
	});

	url = "adfsdfdsf";
	$.getJSON(url, function(data) {
		console.log('get newyork times data success:' + JSON.stringify(data));

		var docs = data.response.docs;
		var items = [];
		$.each(docs, function(key, val) {
			items.push("<li class='article'><a href='" +
				val.web_url + "'>" + val.headline.print_headline + "</a><p>" + val.snippet + "</p></li>");
		});

		$("<ul/>", {
			"id": "nytimes-articles",
			"class": "article-list",
			html: items.join("")
		}).appendTo("body");
		
		$("#nytimes-header").html("New York Times Articles");
	}).error(function(){
		$("#nytimes-header").html("New York Times Articles Could Not Be Loaded");
		console.log("New York Times Articles Could Not Be Loaded");
	});

	return false;
};

$('#form-container').submit(loadData);