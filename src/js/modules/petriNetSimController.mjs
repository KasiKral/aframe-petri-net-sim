export class petriNetController {
    constructor(activePlace, firedTransition) {
        this.activePlaceName = activePlace;
        this.firedTransitionName = firedTransition;
    }
    get activePlace() {
        return this.activePlaceName;
    }
    get firedTransition() {
        return this.firedTransitionName;
    }

    updateMarking(places, arc) {
        const index = places.findIndex((place) => place.id === arc.target);
        places[index].marking += arc.markingWeight;
    }

    findAllConnectedArcs(transition, arcs) {
        const allArcs = arcs.filter((arc) => arc.source === transition.id);
        return allArcs;
    }

    fireTransition(places, transitions, arcs) {
        // var place = this.getPlace(places);
        var transition = this.getTransition(transitions);
        // console.log(place);
        // console.log(transition);
        var allArcs = this.findAllConnectedArcs(transition, arcs);
        var arc = allArcs[0];
        this.updateMarking(places, arc);
    }

    isPlaceActive(places) {
        var selectedPlace = this.getPlace(places);
        if (selectedPlace != null && this.getMarking(selectedPlace) >= 1) {
            return true;
        }
        console.log("not active place");
        return false;
    }

    getMarking(place) {
        if (place.marking != null) {
            return place.marking;
        }
        return 0;
    }

    getPlace(places) {
        const place = places.find((place) => place.name === this.activePlace);
        return place;
    }

    getTransition(transitions) {
        const transition = transitions.find(
            (transition) => transition.name === this.firedTransition
        );
        return transition;
    }
}