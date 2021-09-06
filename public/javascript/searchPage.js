async function runSearch(userService, UserSearchText) {

    function buildHTMLCard(streamData) {
        const headerCard = `
                <div class="col">
                <div class="card text-white bg-dark mb-1" style="max-width: 18rem;">
                <img src="` + streamData.posterURLs.original + `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">` + streamData.originalTitle + `</h5>
                </div>
                <div class="card-body">
                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="descriptionButton accordion-button collapsed bg-light" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                            aria-controls="collapseOne">
                            Description
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse bg-secondary" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        Binge Bucket Rating: ` + streamData.imdbVoteCount +
            `.<br/><br/> IMDB Rating: ` + streamData.imdbRating +
            `. <br/><br/>` + streamData.overview + `
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="castButton accordion-button collapsed bg-light" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                            aria-controls="collapseTwo">
                            Cast
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse bg-secondary" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">` + streamData.cast + `</div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="card-body d-grid gap-2">

                <button class="add2BucketButton btn btn-dark border-light bucketAddition" data-imdb="`+ streamData.imdbID + 
                `" data-originalTitle="` + streamData.originalTitle + `" type="button">Add to Bucket</button>

                `

        let serviceButton = ""
        if (!(typeof streamData.streamingInfo.netflix === 'undefined')) {
            serviceButton = serviceButton +
                `
                    
                    <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.netflix.us.link + `" style="text-decoration: none">Watch on Netflix</a></button>
                    

            `
        };

        if (!(typeof streamData.streamingInfo.hulu === 'undefined')) {
            serviceButton = serviceButton +
                `
                
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.hulu.us.link + `" style="text-decoration: none">Watch on Hulu</a></button>
                    
            `
        }

        if (!(typeof streamData.streamingInfo.prime === 'undefined')) {
            serviceButton = serviceButton +
                `
                    
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.prime.us.link + `" style="text-decoration: none">Watch on Prime</a></button>
                    
               
            `
        }

        if (!(typeof streamData.streamingInfo.showtime === 'undefined')) {
            serviceButton = serviceButton +
                `
                   
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.showtime.us.link + `" style="text-decoration: none">Watch on Showtime</a></button>
                  
            `
        }

        if (!(typeof streamData.streamingInfo.apple === 'undefined')) {
            serviceButton = serviceButton +
                `
                    
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.apple.us.link + `" style="text-decoration: none">Watch on Apple</a></button>
                   
            `
        }

        if (!(typeof streamData.streamingInfo.paramount === 'undefined')) {
            serviceButton = serviceButton +
                `
                    
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.paramount.us.link + `" style="text-decoration: none">Watch on Paramount</a></button>
                  
            `
        }

        if (!(typeof streamData.streamingInfo.disney === 'undefined')) {
            serviceButton = serviceButton +
                `
                  
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.disney.us.link + `" style="text-decoration: none">Watch on Disney</a></button>
                    
            `
        }

        if (!(typeof streamData.streamingInfo.hbo === 'undefined')) {
            serviceButton = serviceButton +
                `
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.hbo.us.link + `" style="text-decoration: none">Watch on HBO</a></button>
            `
        }

        if (!(typeof streamData.streamingInfo.peacock === 'undefined')) {
            serviceButton = serviceButton +
                `
           
                        <button class="platformLinkButton btn btn-dark border-light" type="button"><a class="btn-dark"  href="`+ streamData.streamingInfo.peacock.us.link + `" style="text-decoration: none">Watch on Peacock</a></button>
                  
            `
        }

        return headerCard + serviceButton + "</div> </div> </div>";

    };

    const response = await fetch("/search", {
        method: 'POST',
        body: JSON.stringify({
            service: userService,
            searchText: UserSearchText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {

        let cardHTML = "";
        for (i = 0; i < data.length; i++) {
            cardHTML = cardHTML + buildHTMLCard(data[i]);
            console.log()
        };

        var card = document.createElement("div");
        // <div id="start-cards" class="row row-cols-1 row-cols-md-3 g-4"></div>
        card.classList = "row row-cols-1 row-cols-md-4 g-4";
      



        card.innerHTML = cardHTML;
        document.getElementById("start-cards").appendChild(card)

        var allBuckets = document.querySelectorAll('.bucketAddition')
        allBuckets.forEach(bucket => {
            bucket.addEventListener('click', bucketFormHandler)
        });

    })
};

const userService = localStorage.getItem('service');
const UserSearchText = localStorage.getItem('searchText');

runSearch(userService, UserSearchText);