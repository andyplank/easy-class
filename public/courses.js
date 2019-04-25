const token = localStorage.getItem('token');

(function() {
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

(function(){
    const form = document.getElementById('newCourse');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        fetch("/newCourse", {
            method: "POST",
            headers: {
                'Authorization': token
            },
            body: data
        })
        .then(res => {
            $('#courseModal').modal('hide');
            if(res.status==200){
                location.reload();       
            };
        })
    }
}())