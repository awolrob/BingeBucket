async function bucketFormHandler(event) {
    event.preventDefault();
    // console.log(event.target.dataset.imdb);
    // console.log(event.target.dataset.originaltitle);

    const response = await fetch('api/features/bucket', {
        method: 'POST',
        body: JSON.stringify({
            imdb_id: event.target.dataset.imdb,
            originalTitle: event.target.dataset.originaltitle
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    //<div id="bucketList" class="card-body d-grid gap-2">
    //{{!-- <button class="add2BucketButton btn btn-dark" type="button">Sweet Girl</button> --}}
    var bucketItem = document.createElement("button");
    bucketItem.innerText = event.target.dataset.originaltitle;
    bucketItem.setAttribute("class", "add2BucketButton btn btn-dark")
    document.getElementById("bucketList").appendChild(bucketItem)
}
var allBuckets = document.querySelectorAll('.bucketAddition')
allBuckets.forEach(bucket => {
    bucket.addEventListener('click', bucketFormHandler)
});


