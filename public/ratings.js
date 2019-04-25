(function() {
    const token = localStorage.getItem('token');
    const id = window.location.pathname.substring(12);
    fetch(`/courseInfo/${id}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(data => showData(data));
    function showData(item) {
        let name = document.getElementById('course-name');
        name.innerHTML = item.name;
        let rating = document.getElementById('rating');
        rating.innerHTML = item.rating;
        item.reviews.forEach(element => {
            showReview(element);
        });
    }
    function showReview(item){
        let parent = document.getElementById('ratings');
        let card = document.createElement('div');
        card.className = 'rating-card card text-center';
        let name = document.createElement('h5');
        name.innerHTML = item.ownerID.username;
        let head = document.createElement('div');
        head.classList = 'rating card-header';
        head.appendChild(name);
        let body = document.createElement('div');
        body.className = 'rating card-body';
        let rating = document.createElement('h5');
        rating.innerHTML = item.rating;
        let review = document.createElement('p');
        review.className = 'color-dark card-text';
        review.innerHTML = item.comments;
        body.appendChild(rating);
        body.appendChild(review);
        card.appendChild(head);
        card.appendChild(body);
        parent.appendChild(card);
    }
}())
