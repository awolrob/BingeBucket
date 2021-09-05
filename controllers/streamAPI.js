require('dotenv').config();
var axios = require("axios").default;

//Get an array of streaming series/movies
//servicesIn = REQUIRED one or more of the following:
//'netflix,prime,disney,hbo,hulu,peacock,paramount,starz,showtime,apple,mubi'
//typeIn = REQUIRED	'movie' OR 'series'
//e.g. getStreamList('netflix,prime','movie')
//e.g. getStreamList('netflix','series')
const getStreamList = async function (servicesIn, searchTextIn) {
	console.log('in Get Stream', servicesIn, searchTextIn);
	var optionsMovie = {
		method: 'GET',
		url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
		// params: {
		// 	country: 'us',
		// 	services: 'netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock',
		// 	// services: servicesIn,
		// 	type: 'movie',
		// 	order_by: 'imdb_vote_count',
		// 	year_min: '2000',
		// 	year_max: '2020',
		// 	page: '87',
		// 	// genres_relation: 'or',
		// 	desc: 'true',
		// 	language: 'en',
		// 	min_imdb_rating: '50',
		// 	max_imdb_rating: '100',
		// 	min_imdb_vote_count: '10000',
		// 	max_imdb_vote_count: '1000000'
		// },
		params: {
			country: 'us',
			services: servicesIn,
			type: 'movie',
			order_by: 'imdb_rating',
			keyword: searchTextIn,
			year_min: '1986',
			language: 'en',
			desc: 'true',
			min_imdb_rating: '20',
			max_imdb_rating: '100',
			min_imdb_vote_count: '10000',
			max_imdb_vote_count: '1000000'
		},
		headers: {
			'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
			'x-rapidapi-key': process.env.STREAM_API_KEY
		}
	};

	var optionsSeries = {
		method: 'GET',
		url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
		// params: {
		// 	country: 'us',
		// 	services: 'netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock',
		// 	// services: servicesIn,
		// 	type: 'series',
		// 	order_by: 'imdb_vote_count',
		// 	year_min: '2000',
		// 	year_max: '2020',
		// 	page: '33',
		// 	// genres_relation: 'or',
		// 	desc: 'true',
		// 	language: 'en',
		// 	min_imdb_rating: '50',
		// 	max_imdb_rating: '100',
		// 	min_imdb_vote_count: '10000',
		// 	max_imdb_vote_count: '1000000'
		// },
		params: {
			country: 'us',
			services: servicesIn,
			language: 'en',
			type: 'series',
			order_by: 'imdb_rating',
			desc: 'true',
			keyword: searchTextIn,
			year_min: '1986',
			min_imdb_rating: '20',
			max_imdb_rating: '100',
			min_imdb_vote_count: '10000',
			max_imdb_vote_count: '1000000'
		},
		headers: {
			'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
			'x-rapidapi-key': process.env.STREAM_API_KEY
		}
	};

	const resultDataMovie = await axios.request(optionsMovie);
	const resultDataSeries = await axios.request(optionsSeries);

	const resultDataMovieArr = resultDataMovie.data.results;
	const resultDataSeriesArr = resultDataSeries.data.results;

	const resultData = resultDataSeriesArr.concat(resultDataMovieArr);
	
	for (i = 0; i < resultData.length; i++) {
		resultData[i].imdbVoteCount = 
		resultData[i].imdbVoteCount * 
		resultData[i].imdbRating;
	}

	resultData.sort(function (a, b) {
		return b.imdbVoteCount - a.imdbVoteCount; //|| a.glow - b.glow;
	});

	console.log(resultData);
	return resultData;
};

//Get the individual show from the API 
// Usage id is TMDb ID or an IMDb in the format of tv/71712 or movie/464052
//e.g. getItemData('tv/66732');
const getItemData = async function (id) {
	var options = {
		method: 'GET',
		url: 'https://streaming-availability.p.rapidapi.com/get/ultra',
		params: { imdb_id: id },
		headers: {
			'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
			'x-rapidapi-key': process.env.STREAM_API_KEY
		}
	};

	const resultData = await axios.request(options);
	return resultData.data;
};


exports.getStreamList = getStreamList;
exports.getItemData = getItemData;

// console.log(getStreamList('netflix'));