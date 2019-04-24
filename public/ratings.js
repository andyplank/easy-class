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
    }
}())