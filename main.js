const previous = document.querySelector('#pre');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const title = document.querySelector('#title');
const recent_volume= document.querySelector('#volume');
const volume_show = document.querySelector('#volume_show');
const slider = document.querySelector('#duration_slider');
const show_duration = document.querySelector('#show_duration');
const track_image = document.querySelector('#track_image');
const auto_play = document.querySelector('#auto');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const artist = document.querySelector('#artist');



let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;

//create a audio Element
//let track = document.createElement('audio');
const track = new Audio();

//All songs list
const All_song = [
   {
     name: "1.Jag Ghoomeya",
     path: "mp3/Jag Ghoomeya (Sultan)_64-(MastiNew).mp3",
     img: "images/Sultan.jpg",
     singer: "Rahet Fahet Ali khan"
   },
   {
     name: "2. Enno Rathruluvastayi gani",
     path: "mp3/2-Enno Ratrulosthayi (Remix).mp3",
     img: "images/Amigos.jpg",
     singer: "SPB Charan, Sameera Bharadwaj"
   },
   {
     name: "3. My Dear Markandeya",
     path: "mp3/My Dear Markandeya-(Mr-Jat.in).mp3",
     img: "images/Bro.jpg",
     singer: "LV Revanth, Snigdha Sharma"
   },
   {
     name: "4. Maa Bava Manobhavalu",
     path: "mp3/Maa Bava Manobhavalu.mp3",
     img: "images/Veerasimhareddy.jpg",
     singer: "Sahiti Chaganti, Renu kumar"
   },
   {
     name: "5. Neekemo Andamekkuva",
     path: "mp3/Neekemo Andamekkuva.mp3",
     img: "images/Walteirveeraya.jpg",
     singer: "Mika Singh, Geetha Madhuri"
   },
   	{name: "6. Nee Chuttu Chuttu",
     path: "mp3/Nee Chuttu Chuttu (Skanda) Telugu_64-(MastiNew).mp3",
     img: "images/Skanda.jpg",
     singer: "Sid Sriram, Sanjana Kalmanje"
	}

];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	recent_volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	 const sliderPosition = track.duration * (slider.value / 100);
	track.currentTime = sliderPosition;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#148F77";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }