import * as bootstrap from "bootstrap";

var myModalEl = document.querySelector("#myModal");
var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
modal.toggle();