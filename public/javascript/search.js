async function runSearch(event) {
    event.preventDefault();
    let serviceBtn = '';

    const searchText = document.querySelector('input[id="streamFinderInput"]').value.trim();

    switch (this.id) {
        case 'getNetflix': serviceBtn = 'netflix'
            break;
        case 'getHulu': serviceBtn = 'hulu'
            break;
        case 'getPrime': serviceBtn = 'prime'
            break;
        case 'getShowtime': serviceBtn = 'showtime'
            break;
        case 'getApple': serviceBtn = 'apple'
            break;
        case 'getParamount': serviceBtn = 'paramount'
            break;
        case 'getDisney': serviceBtn = 'disney'
            break;
        case 'getHBO': serviceBtn = 'hbo'
            break;
        case 'getPeacock': serviceBtn = 'peacock'
            break;
        case 'streamFinderButton':
            serviceBtn = 'netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock'
        default:
            serviceBtn = 'netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock'
    }
    localStorage.setItem('service', serviceBtn);
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('userName',document.getElementById("bucketList").dataset.name);
    localStorage.setItem('userID',document.getElementById("bucketList").dataset.userid);

    document.location.replace('/search');
};

document.getElementById('getNetflix').addEventListener('click', runSearch);
document.getElementById('getHulu').addEventListener('click', runSearch);
document.getElementById('getPrime').addEventListener('click', runSearch);
document.getElementById('getShowtime').addEventListener('click', runSearch);
document.getElementById('getApple').addEventListener('click', runSearch);
document.getElementById('getParamount').addEventListener('click', runSearch);
document.getElementById('getDisney').addEventListener('click', runSearch);
document.getElementById('getHBO').addEventListener('click', runSearch);
document.getElementById('getPeacock').addEventListener('click', runSearch);
document.getElementById('getEverywhere').addEventListener('click', runSearch);
document.getElementById('streamFinderButton').addEventListener('click', runSearch);