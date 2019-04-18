(function() {
    const form = document.getElementById('login-form');
    
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        fetch("/login", {
            method: "POST",
            body: data
        })
        .then(res => {
            if (res.ok) {
                const authorization = res.headers.get('Set-Authorization');
                localStorage.setItem('token', authorization);
                return res.json();
            }
        })
        .then(data => {
            if (data) {
                window.location.href = "/";
            }
        });
    }
}())