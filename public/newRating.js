(function () {
    const token = localStorage.getItem('token');
    const id = window.location.pathname.substring(12);
    form = document.getElementById('review');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        data.append('courseID', id);
        fetch("/review", {
            method: "POST",
            headers: {
                'Authorization': token
            },
            body: data
        })
        .then(res => {
            $('#rateClass').modal('hide')
            if(res.status==200){
                location.reload();       
            } else {
                $('#errorMsg').modal('show');
            }
        })
    }
}())