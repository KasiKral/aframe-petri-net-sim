AFRAME.registerComponent("petri-net-sim", {
    schema: {
        currentState: { type: "string", default: "ST1" },
        places: { type: "array", default: [] },
        transitions: { type: "array", default: [] },
        arcs: { type: "array", default: [] },
        event: { type: "string", default: "" },
        message: { type: "string", default: "" },
    },
    // Do something when component first attached.
    init: function() {
        var data = this.data;
        this.eventHandlerFn = function() {
            findNextState(data);
        };
        loadXMLDoc(data);
        console.log(data);
    },

    update: function(oldData) {
        // Do something when component's data is updated.
        var data = this.data;
        var el = this.el;

        // `event` updated. Remove the previous event listener if it exists.
        if (oldData.event && data.event !== oldData.event) {
            el.removeEventListener(oldData.event, this.eventHandlerFn);
        }

        if (data.event) {
            el.addEventListener(data.event, this.eventHandlerFn);
        } else {
            console.log(data.message);
        }
    },

    remove: function() {
        // Do something the component or its entity is detached.
    },

    tick: function(time, timeDelta) {
        // Do something on every scene tick or frame.
    },
});

function findNextState(data) {
    console.log("------FindingNextState-----");
    console.log(data);
    var choosedTransition = data.transitions.find(
        (el) => el.name === data.message
    );
    console.log(choosedTransition);
    var sourceTargetObj = data.arcs.find(
        (el) => el.source === choosedTransition.id
    );
    console.log(sourceTargetObj);
    var nextState = data.places.find((el) => el.id === sourceTargetObj.target);
    console.log(nextState);
    if (data.currentState !== nextState.name) {
        data.currentState = nextState.name;
        console.log(data);
        openNextDoor(data.currentState);
    }
}

function openNextDoor(nextState) {
    var nextDoorEl = document.getElementById(nextState);
    nextDoorEl.setAttribute("material", "color: green; shader: flat");
    nextDoorEl.setAttribute("light", "type: point; color: green; intensity: 0.1");
}

function loadXMLDoc(data) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.response, "text/xml");
            var obj = xmlToJson(xmlDoc)["pnml:pnml"]["pnml:net"]["pnml:page"];
            var places = obj["pnml:place"];
            var transitions = obj["pnml:transition"];
            var arcs = obj["pnml:arc"];
            places.forEach((element) => {
                data.places.push({
                    id: element["@attributes"].id,
                    name: element["pnml:name"]["pnml:text"]["#text"],
                });
            });
            transitions.forEach((element) => {
                data.transitions.push({
                    id: element["@attributes"].id,
                    name: element["pnml:name"]["pnml:text"]["#text"],
                });
            });
            arcs.forEach((element) => {
                data.arcs.push(element["@attributes"]);
            });
        }
    };
    xmlhttp.open("GET", "./petriNetFile/211021_cpn.pnml", true);
    xmlhttp.send();
}

// Changes XML to JSON
function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}