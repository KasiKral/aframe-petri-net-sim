/**
 * @param url - A DOMString representing the URL to send the request to.
 * @returns Object representing petri net.
 */
export function loadXMLDoc(url) {
    var xmlhttp = new XMLHttpRequest();
    var data = { places: [], arcs: [], transitions: [] };
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
                    marking: parseInt(
                        element["pnml:initialMarking"]["pnml:text"]["#text"]
                    ),
                });
            });
            transitions.forEach((element) => {
                data.transitions.push({
                    id: element["@attributes"].id,
                    name: element["pnml:name"]["pnml:text"]["#text"],
                });
            });
            arcs.forEach((element) => {
                data.arcs.push({
                    id: element["@attributes"].id,
                    source: element["@attributes"].source,
                    target: element["@attributes"].target,
                    markingWeight: parseInt(
                        element["pnml:inscription"]["pnml:text"]["#text"]
                    ),
                });
            });
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return data;
}

/**
 * @param xml - xml document to be parsed. It inherits from the generic
 *  Document and does not add any specific methods or properties to it.
 * @returns - Return parsed xml document to object.
 */
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