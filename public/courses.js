(function() {
    const token = localStorage.getItem('token');
    fetch(`/courseInfo/`, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(data => display(data));
    function display(data){
        data.forEach(item => showData(item));
    }
    function showData(item) {
        let list = document.getElementById('courses');
        let button = document.createElement('a');
        button.innerHTML = item.name;
        button.className = "button1";
        button.href = 'coursePage/' + item._id;
        list.appendChild(button);
    }
}())

function logout(){
    localStorage.setItem('token', undefined);
    window.location.href = '/';
}