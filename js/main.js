const storageInfo = [
	{
		artists: 'Ariana Grande',
		title: '7 rings',
		img: '/data/img/ArianaGrande.jpg',
		song: '/data/music/ArianaGrande-7rings.mp3',
	},
	{
		artists: 'Harry Styles',
		title: 'As It Was',
		img: '/data/img/HarryStyles.jpg',
		song: '/data/music/HarryStyles-AsItWas.mp3',
	},
	{
		artists: 'Adele',
		title: 'Set fire to the rain',
		img: '/data/img/Adele.png',
		song: '/data/music/Adele-SetFiretotheRain.mp3',
	},
	{
		artists: '$uicideBoy$',
		title: 'And To Those I Lov',
		img: '/data/img/Suicideboy.jpg',
		song: '/data/music/$uicideBoy$AndToThoseILov.mp3',
	},
	{
		artists: 'Alie Gatie',
		title: 'Its you',
		img: '/data/img/AlieGatie.jpg',
		song: '/data/music/AliGatie-ItsYou.mp3',
	},
];

// var aux count, shuffle
let count = 0,
	shuffles = 0;

//Render info
const info = document.getElementById('info');
const renderInfo = () => {
	const template = `
        <img src=${storageInfo[count].img} alt=${storageInfo[count].title
		.split(' ')
		.join('_')} />
        <h3>${storageInfo[count].title}</h3>
        <span>${storageInfo[count].artists}</span>
    `;
	info.innerHTML = template;
};

renderInfo(); //Firts render of info

//controls
const shuffle = document.getElementById('shuffle');
const backward = document.getElementById('backward');
const play = document.getElementById('play');
const forward = document.getElementById('forward');

//function to give play, time and progress bar
const audio = document.getElementById('audio');
//Time line
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
// progress bar
const progressBar = document.getElementById('progress-bar');

function givePlay() {
	let currentTime = 0,
		duration = 0,
		min = 0;
	audio.src = storageInfo[count].song;
	audio.play();
	audio.onloadeddata = () => {
		const interval = setInterval(() => {
			currentTime = audio.currentTime;
			duration = audio.duration;

			// progress bar
            let adverangeBar = (currentTime / Math.round(duration) * 100);
            console.log(adverangeBar)
			progressBar.style.width = adverangeBar + '%';
			//Time line
			let seg = Math.round(currentTime) % 60;
			if (seg === 0) min++;


			startTime.innerHTML = `
                <span>0${min}:${seg < 10 ? '0' + seg : seg}</span>
            `;

			endTime.innerHTML = `
            <span>0${Math.floor(duration / 60)}:${
				Math.round(duration % 60) < 10
					? '0' + Math.round(duration % 60)
					: Math.round(duration % 60)
			}</span>
            `;

			if (currentTime === duration) {
				giveForward();
				min = 0;
				clearInterval(interval);
			}
		}, 1000);
	};
	activeCurrentCardBackward();
	activeCurrentCardForward();
	activeCurrentCardShuffles();
}

//function to give shuffle
function getShuffle() {
	shuffles = Math.floor(Math.random() * storageInfo.length);
	count = shuffles;
	renderInfo();
	activeCurrentCardShuffles();
	givePlay();
}

//function to give backward
function giveBackward() {
	count--;
	if (count < 0) count = storageInfo.length - 1;
	renderInfo();
	activeCurrentCardBackward();
	givePlay();
}

//function to give forward
function giveForward() {
	count++;
	if (count >= storageInfo.length) count = 0;
	renderInfo();
	activeCurrentCardForward();
	givePlay();
}

//events to the playback controls or buttons
shuffle.addEventListener('click', getShuffle);
backward.addEventListener('click', giveBackward);
play.addEventListener('click', givePlay);
forward.addEventListener('click', giveForward);

//Render playlist
const playList = document.getElementById('play-list');
const renderPlaylist = () => {
	storageInfo.map((datas) => {
		const template = `
        <li class="">
            <div class="title-list">
                <div class="icon-play">
					<i class="fas fa-play"></i>
				</div>
				<div class="name-art">
                <h5>${datas.title}</h5>
				<span>${datas.artists}</span>
				</div>
            </div>
            <div class="cover">
                <img src=${datas.img} alt=${datas.title} class=""/>
            </div>
        </li>
        `;
		playList.innerHTML += template;
	});
};

renderPlaylist();

// event to each letter of the playlist and spinner
const allCartPlaylist = document.querySelectorAll('li');
const allSpinnerDisk = document.querySelectorAll('.cover img');
const allIconPlay = document.querySelectorAll('.icon-play');

allCartPlaylist.forEach((e, i) => {
	e.addEventListener('click', () => {
		count = i;
		renderInfo();
		givePlay();
		activeCurrentCardBackward();
		activeCurrentCardForward();
		activeCurrentCardShuffles();
	});
});

//active Current Card (shuffles)
function activeCurrentCardShuffles() {
	for (let i = 0; i <= storageInfo.length - 1; i++) {
		allCartPlaylist[i].classList.remove('active-cart-list');
		allSpinnerDisk[i].classList.remove('spinner');
		allIconPlay[i].classList.remove('active-icon-play');

		allCartPlaylist[count].classList.add('active-cart-list');
		allSpinnerDisk[count].classList.add('spinner');
		allIconPlay[count].classList.add('active-icon-play');
	}
}
// activeCurrentCardShuffles();
//active Current Card Back
function activeCurrentCardBackward() {
	allCartPlaylist[0].classList.add('active-cart-list');
	allSpinnerDisk[0].classList.add('spinner');
	allIconPlay[0].classList.add('active-icon-play');

	if (count > 0) {
		allCartPlaylist[0].classList.remove('active-cart-list');
		allSpinnerDisk[0].classList.remove('spinner');
		allIconPlay[0].classList.remove('active-icon-play');
	}

	allCartPlaylist[count].classList.add('active-cart-list');
	allSpinnerDisk[count].classList.add('spinner');
	allIconPlay[count].classList.add('active-icon-play');

	if (count < storageInfo.length - 1) {
		allCartPlaylist[count + 1].classList.remove('active-cart-list');
		allSpinnerDisk[count + 1].classList.remove('spinner');
		allIconPlay[count + 1].classList.remove('active-icon-play');
	}
}

// activeCurrentCardBackward();

function activeCurrentCardForward() {
	if (count >= 1) {
		allCartPlaylist[count - 1].classList.remove('active-cart-list');
		allSpinnerDisk[count - 1].classList.remove('spinner');
		allIconPlay[count - 1].classList.remove('active-icon-play');
	}

	if (count >= 0) {
		allCartPlaylist[storageInfo.length - 1].classList.remove(
			'active-cart-list'
		);
		allSpinnerDisk[storageInfo.length - 1].classList.remove('spinner');
		allIconPlay[storageInfo.length - 1].classList.remove('active-icon-play');
	}

	allCartPlaylist[count].classList.add('active-cart-list');
	allSpinnerDisk[count].classList.add('spinner');
	allIconPlay[count].classList.add('active-icon-play');
}
