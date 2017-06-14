

let elPlay = document.getElementById("play")
	, elPause = document.getElementById("pause")
	, elBackward = document.getElementById("backward")
	, elForward = document.getElementById("forward")
	, elAudio = document.querySelector("audio")
	, elVolume = document.getElementById("volume")
	, elRandom = document.getElementById("random")
	, elPlaylist = document.getElementById("playlist")
	, path = "audio/";

function Song( title, artist, file ){
  this.title = title;
  this.artist = artist;
  this.file = file;
}
function Jukebox( player ) {
  this.player = player;
  this.currentSong = 0;
  this.songs = [];
  this.newSongIndex = 0;
  this.disSong = this.songs[this.currentSong];
}
 Jukebox.prototype.addSong = function( song ){
 	this.songs.push(song);
 	this.newSongIndex ++;
 }


 // buttons

Jukebox.prototype.play = function(){
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	elPlaylist.innerHTML = this.songs[this.currentSong].title;
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
};
Jukebox.prototype.pause = function(){
 	this.player.pause();
 	document.getElementById("play").style.display = "inline-block";
 	document.getElementById("pause").style.display = "none";
 };
 Jukebox.prototype.random = function(){
 	this.player = parseInt(Math.random()*this.songs.length)
 	this.player.src = path + this.songs[this.currentSong].file;
 	this.player.play();
	elPlaylist.innerHTML = this.songs[this.currentSong].title;
 	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
 };
Jukebox.prototype.playNext = function(){
	this.currentSong = (this.currentSong.title + 1 ) % this.songs.length;
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	elPlaylist.innerHTML = this.songs[this.currentSong].title;
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
}
Jukebox.prototype.playPrevious = function(){
	if( this.currentSong >=1 ) {
		this.currentSong = (this.currentSong + 1 ) % this.songs.length;
	} else if ( this.currentSong === 0) {
		this.currentSong = this.songs.length - 1;
	}
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	elPlaylist.innerHTML = this.songs[this.currentSong].title;	
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
}


document.addEventListener("DOMContentLoaded", function(){
Control = new Jukebox(document.querySelector("audio"));

// buttons
	elPlay.addEventListener("click", function(){
    	Control.play();
 	});
  	elPause.addEventListener("click", function(){
  	  Control.pause();
  	});
  	elForward.addEventListener("click", function(){
  	  Control.playNext();
  	});
  	elBackward.addEventListener("click", function(){
  	  Control.playPrevious();
  	});
  	elRandom.addEventListener("click", function(){
  	  Control.random();
  	});

// song list
	var Hero = new Song("Jukebox Hero", "Journey", "Jukebox Hero.mp3");
	var Valley = new Song("Death Valley", "Fall Out Boy", "Fall-Out-Boy_-_Death-Valley.mp3");

	Control.addSong(Hero);
	Control.addSong(Valley);
});


