/**
 * @class The Petri net.
 */
export default class PetriNet {
    /**
     * Creates instance of PetriNet
     * @param {Object} netData - Object whitch represent petri net.
     * @param {{id: string, name: string, marking: number}[]} netData.places
     * @param {{id: string, name: string}[]} netData.transitions
     * @param {{id: string, markingWeight: number, source: string, target: string}[]} netData.arcs
     */
    constructor(netData) {
        this.netData = netData;
    }

    /**
     * @returns {Object} Return netData object inicialized in constructor.
     */
    get getNetData() {
        return this.netData;
    }

    fire(transitionName) {
        if(this.isEnabled(transitionName)) {
            console.log("enabled");
            const connectedArcs = this.findAllConnectedArcs(transitionName);
            this.updateMarking(connectedArcs);
        } else {
            console.log("not enabled");
        }
    }

    isEnabled(transitionName) {
        const inputPlaces = this.findAllInputPlaces(transitionName);
        const enabled = inputPlaces.some(place => this.isMarked(place.name));

        return enabled;
    }

    getMarking(placeName) {
        var place = this.findPlace(placeName);
        if (place.marking != null) {
            return place.marking;
        }
        return 0;
    }

    isMarked(placeName) {
        if(this.getMarking(placeName) >= 1) {
            return true;
        }
        return false;
    }

    updateMarking(connectedArcs) {
        connectedArcs.forEach((arc) => {
            const indexTarget = this.getNetData.places.findIndex((place) => place.id === arc.target);
            const indexSorce = this.getNetData.places.findIndex((place) => place.id === arc.source);
            // console.log(indexTarget);
            // console.log(indexSorce);
            if (indexTarget >= 0) {
                this.getNetData.places[indexTarget].marking += arc.markingWeight;
            }
            if (indexSorce >= 0) {
                this.getNetData.places[indexSorce].marking -= arc.markingWeight;
            }
        });
    }

    // isPlaceActive(places) {
    //     var selectedPlace = this.getPlace(places);
    //     if (selectedPlace != null && this.getMarking(selectedPlace) >= 1) {
    //         return true;
    //     }
    //     console.log("not active place");
    //     return false;
    // }

    findPlace(placeName) {
        var places =  this.getNetData.places;
        const place = places.find((place) => place.name === placeName);
        return place;
    }

    findTransition(transitionName) {
        var transitions =  this.getNetData.transitions;
        const transition = transitions.find(
            (transition) => transition.name === transitionName
        );
        return transition;
    }

    findAllInputPlaces(transitionName) {
        var transition =  this.findTransition(transitionName);
        var arcs = this.getNetData.arcs;
        const inputArcs = arcs.filter(
            (arc) => arc.target === transition.id
        );
        var inputPlaces = [];
        inputArcs.forEach(arc => {
            var places =  this.getNetData.places;
            const place = places.find((place) => place.id === arc.source);
            inputPlaces.push(place);
        });

        return inputPlaces;
    }

    findAllConnectedArcs(transitionName) {
        var transition =  this.findTransition(transitionName);
        var arcs = this.getNetData.arcs;
        const allArcs = arcs.filter(
            (arc) => arc.source === transition.id || arc.target === transition.id
        );
        console.log(allArcs);
        return allArcs;
    }
}