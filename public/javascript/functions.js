function deleteThisReview(id) {
    var thisReview = document.getElementById(id);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(id) {
        if(httpRequest.readyState === 4 && httpRequest.status === 204) {
            thisReview.remove();
        }
    }
    httpRequest.open('DELETE', '/reviews/' + id, true);
    httpRequest.send();
    location.reload();
}

function showThisReviewEditForm(status) {
    document.getElementById('review').style.display = (status) ? 'none' : 'block';
    document.getElementById('edition').style.display = (status) ? 'block' : 'none';
}



function updateThisReview(id) {
    var Review = {
        name: document.getElementById('reviewName').value,
        placeType: document.getElementById('reviewPlaceType').value,
        stars: Number.parseInt(document.getElementById('reviewStars').value)
    };

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(id) {
         if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                window.location.reload();
            }
         }
    }
    httpRequest.open('PUT', '/reviews/' + id, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(Review));
}