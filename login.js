function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    // Predefined credentials
    const validUsername = "user";
    const validPassword = "user1";

    // Empty validation
    if (username === "") {
        error.innerHTML = "Please enter username.";
        return;
    }

    if (password === "") {
        error.innerHTML = "Please enter password.";
        return;
    }

    
    if (username === validUsername && password === validPassword) {

        error.innerHTML = "";

        
        let toast = document.createElement("div");
        toast.innerHTML = "✔ Login Successful";

        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.background = "green";
        toast.style.color = "white";
        toast.style.padding = "15px";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "1000";

        document.body.appendChild(toast);

        
        sessionStorage.setItem("orderPlaced", "true");

        sessionStorage.setItem("loggedIn", "true");

        setTimeout(() => {
            window.location.href = "gallery.html";
        }, 2000);

    } else {
        error.innerHTML = "Invalid username or password.";
    }
}