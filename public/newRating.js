(function () {
    form = document.getElementById('review');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        fetch("/review", {
            method: "POST",
            //headers: {
            //    'Authorization': token
            //},
            body: data
        })
        .then(res => {
            $('#rateClass').modal('hide')        
            return res.json();
        })
        .then(data => {
        });
    }
}())