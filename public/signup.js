(function() {
    const form = document.getElementById('signup-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        fetch("/signup", {
            method: "POST",
            body: data
        })
        .then(res => {
            if (res.status == 200) {
                const authorization = res.headers.get('Set-Authorization');
                localStorage.setItem('token', authorization);
                return res.json();
            }
        })
        .then(data => {
            if (data) {
                window.location.href = "/coursePage";
            }
        });
    }
}())

const pass = document.getElementById('pass');
const confirm = document.getElementById('confirm-pass');  
function validatePassword(){
    if(pass.value!=confirm.value){
        confirm.setCustomValidity("Passwords Don't Match");
        return;
    } else {
        confirm.setCustomValidity("");
    }
}

pass.onchange = validatePassword;
confirm.onkeyup = validatePassword;