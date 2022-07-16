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

//function to give shuffle
const getShuffle = () => {
	shuffles = Math.floor(Math.random() * storageInfo.length);
	count = shuffles;
	renderInfo();
};

//function to give backward
const giveBackward = () => {
	count--;
	if (count < 0) count = storageInfo.length - 1;
	renderInfo();
	activeCurrentCard();
};

//function to give play
const givePlay = () => {};

//function to give forward
const giveForward = () => {
	count++;
	if (count >= storageInfo.length) count = 0;
	renderInfo();
	// activeCurrentCard();
};

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

// event to each letter of the playlist
const allCartPlaylist = document.querySelectorAll('li');
allCartPlaylist.forEach((e, i) => {
	e.addEventListener('click', () => {
		count = i;
		renderInfo();
	});
});

//active current card
function activeCurrentCard() {
	console.log(count);
}

activeCurrentCard();

//function of spinning disk / rotating disk
