function purchase() {

    if (sessionStorage.getItem("loggedIn") === "true") {

        let toast = document.createElement("div");
        toast.innerHTML = "✔ Your order request has been placed.";

        toast.style.position = "fixed";
        toast.style.top = "50px";
        toast.style.right = "50px";
        toast.style.background = "white";
        toast.style.color = "pink";
        toast.style.padding = "15px";
        toast.style.borderRadius = "5px";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);

    } else {

        window.location.href = "login.html";

    }
}


