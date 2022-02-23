// import { SceneEvent } from "../models/sceneEvent.enum";

export class petriNetController {
    constructor(activePlace, firedTransition) {
        this._activePlace = activePlace;
        this._firedTransition = firedTransition;
    }
    get activePlace() {
        return this.activePlace;
    }
    get firedTransition() {
        return this.firedTransition;
    }

    findNextPlace(data) {
        console.log(data);
    }

    fireTransition() {
        return 0;
    }

    isEnabledTransition() {}

    isPlaceActive(currentPlace) {
        return currentPlace;
    }

    changeCurrentPlace(place) {
        return place.message;
    }
}