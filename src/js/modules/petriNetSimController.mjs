/**
 * @class The Petri net.
 */
export class PetriNet {
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

    /**
     * @returns {Object[]} Return array of objects (places).
     */
    get getPlaces() {
        return this.netData.places;
    }

    /**
     * @returns {Object[]} Return array of objects (transitions).
     */
    get getTransitions() {
        return this.netData.transitions;
    }

    /**
     * @returns {Object[]} Return array of objects (arcs).
     */
    get getArcs() {
        return this.netData.arcs;
    }

    // updateMarking(places, arcs) {
    //     arcs.forEach((arc) => {
    //         const indexTarget = places.findIndex((place) => place.id === arc.target);
    //         const indexSorce = places.findIndex((place) => place.id === arc.source);
    //         // console.log(indexTarget);
    //         // console.log(indexSorce);
    //         if (indexTarget >= 0) {
    //             places[indexTarget].marking += arc.markingWeight;
    //         }
    //         if (indexSorce >= 0) {
    //             places[indexSorce].marking -= arc.markingWeight;
    //         }
    //     });
    // }

    // findAllConnectedArcs(transition, arcs) {
    //     const allArcs = arcs.filter(
    //         (arc) => arc.source === transition.id || arc.target === transition.id
    //     );
    //     console.log(allArcs);
    //     return allArcs;
    // }

    // fireTransition(places, transitions, arcs) {
    //     // var place = this.getPlace(places);
    //     var transition = this.getTransition(transitions);
    //     // console.log(place);
    //     // console.log(transition);
    //     var allArcs = this.findAllConnectedArcs(transition, arcs);
    //     this.updateMarking(places, allArcs);
    // }

    // isPlaceActive(places) {
    //     var selectedPlace = this.getPlace(places);
    //     if (selectedPlace != null && this.getMarking(selectedPlace) >= 1) {
    //         return true;
    //     }
    //     console.log("not active place");
    //     return false;
    // }

    // getMarking(place) {
    //     if (place.marking != null) {
    //         return place.marking;
    //     }
    //     return 0;
    // }

    // getPlace(places) {
    //     const place = places.find((place) => place.name === this.activePlace);
    //     return place;
    // }

    // getTransition(transitions) {
    //     const transition = transitions.find(
    //         (transition) => transition.name === this.firedTransition
    //     );
    //     return transition;
    // }
}