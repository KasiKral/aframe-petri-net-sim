import bootstrap from "../index";

document.addEventListener("DOMContentLoaded", function() {
    var myModalEl = document.querySelector("#myModal");
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.toggle();
});