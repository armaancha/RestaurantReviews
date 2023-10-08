// Code can be run on code.org's App Lab

var username = "";
var place = "";
var reviewStore = "";

hideElement("label8");
hideElement("label6");
setScreen("screen1");

function getStars(placeName, placeLabel) {
  var starsCount = 0;
  readRecords("Reviews", {place:placeName}, function(r){
    for(var i=0;i<r.length;i++){
      starsCount += parseInt(r[i].stars);
    }
    starsCount = starsCount/r.length;
    setText(placeLabel, starsCount + " Stars");
  });
}

function showReviews(){
   reviewStore = "";
   setText("labelR1", "");
   readRecords("Reviews", {place:place}, function(r){
    for(var i=r.length-1;i>=0;i--){
      reviewStore += "Posted by " + r[i].username + " | Rating: " + r[i].stars + " stars \n" + r[i].review + "\n ~ \n";
      setText("labelR1", reviewStore);
    }
  });
}

function showStars() {
  setScreen("screen2");
  getStars("mcdonalds", "labelMD");
  getStars("dominos", "labelD");
  getStars("olive", "labelO");
  getStars("tacotime", "labelT");
}

onEvent("buttonLogin", "click", function( ) {
  username = getProperty("text_input1", "text");
	readRecords("Users", {username:username, password:getProperty("text_input2", "text")}, function(records){
	  if (records.length<=0){
	    showElement("label8");
	    hideElement("label6");
	    return;
	  }
  	hideElement("label8");
  	showStars();
	  setText("labelWelcome", "Welcome " + username + "!");
	});
});

onEvent("buttonReg", "click", function( ) {
	username = getProperty("text_input1", "text");
	readRecords("Users", {username:username}, function(records){
	  if (records.length>=1){
	    showElement("label6");
	    hideElement("label8");
	    return;
	  }
	  createRecord("Users", {username:username, password:getProperty("text_input2", "text")}, function() {});
	  hideElement("label8");
	  setScreen("screen2");
	  setText("labelWelcome", "Welcome " + username + "!");
	});
});

onEvent("buttonMD", "click", function( ) {
  place = "mcdonalds";
  setScreen("screen3");
  setImageURL("image7", "https://i.insider.com/62212e77d72a250019740059?width=700");
  showReviews();
});
onEvent("buttonD", "click", function( ) {
  place = "dominos";
  setScreen("screen3");
  setImageURL("image7", "https://vegnews.com/media/W1siZiIsIjIwOTgxL1ZlZ05ld3MuRG9taW5vc1VLQ2hpY2tBaW50MS5qcGciXSxbInAiLCJjcm9wX3Jlc2l6ZWQiLCIxOTIweDEwMDgrMCswIiwiMTIwMHg2MzBeIix7ImZvcm1hdCI6ImpwZyJ9XSxbInAiLCJvcHRpbWl6ZSJdXQ/VegNews.DominosUKChickAint1.jpg?sha=6061439cdec0247c");
  showReviews();
});
onEvent("buttonO", "click", function( ) {
  place = "olive";
  setScreen("screen3");
  setImageURL("image7", "https://communityimpact.com/uploads/images/2023/02/22/243045.jpeg");
  showReviews();
});
onEvent("buttonT", "click", function( ) {
  place = "tacotime";
  setScreen("screen3");
  setImageURL("image7", "https://d1ralsognjng37.cloudfront.net/e07fd546-4c5b-4c27-86dc-ced3cf4aa45b.jpeg");
  showReviews();
});
onEvent("button6", "click", function( ) {
	createRecord("Reviews", {
	  place: place, 
	  stars: getProperty("dropdown1", "value"), 
	  username: username, 
	  review: getText("text_area1")
	}, function(){
	  setText("text_area1", "");
	  showReviews();
	});
});
onEvent("button1", "click", function( ) {
	showStars();
});
