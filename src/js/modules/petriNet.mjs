/**
 * @typedef {import('./petriNetLoader.mjs').PetriNet} PNet
 */

/**
 * @class The Petri net.
 */
export default class PetriNet {
  /**
   * Constructs instance of PetriNet
   * @param {PNet} netData - Object whitch represent petri net.
   */
  constructor(netData) {
    this.netData = netData;
  }

  /**
   *  Fires when transition is enabled and updates marking of Petri Net.
   * @param {string} transitionName - Name of transition.
   */
  fire(transitionName) {
    const connectedArcs = this.findAllConnectedArcs(transitionName);
    this.updateMarking(connectedArcs);
  }

  /**
   * Checks whether exist at least one input place whitch doesn't contian marking bigger or equal to 1.
   * @param {string} transitionName - Name of transition.
   */
  isEnabled(transitionName) {
    const inputPlaces = this.findAllInputPlaces(transitionName);
    // Check whether input place can/can't provide input to transition
    const enabled = inputPlaces.every((place) =>
      this.isMarked(place.name, place.arcWeight)
    );

    return enabled;
  }

  /**
   * @param {string} placeName - Name of place.
   * @returns {number} Returns marking of place.
   */
  getMarking(placeName) {
    var place = this.findPlace(placeName);
    if (!place.marking) {
      return 0;
    }
    return place.marking;
  }

  /**
   * Checks whether place has marking bigger or equal to 1.
   * @param {string} placeName - Name of place.
   * @param {number} arcWeight - Weight of arc whitch aims from place -> transition .
   */
  isMarked(placeName, arcWeight) {
    if (this.getMarking(placeName) >= arcWeight) {
      return true;
    }
    return false;
  }

  /**
   * Updates petriNet object to next marking.
   * @param {{id:string, markingWeight: number, source: string, target: string}[]} connectedArcs - Array of arcs whitch are inputs or outpust to selected transition.
   */
  updateMarking(connectedArcs) {
    connectedArcs.forEach((arc) => {
      // find index of place whitch is output of transition.
      const indexTarget = this.netData.places.findIndex(
        (place) => place.id === arc.target
      );
      // find index of place whitch is input of transition.
      const indexSource = this.netData.places.findIndex(
        (place) => place.id === arc.source
      );
      if (indexTarget >= 0) {
        this.createOutputTokens(indexTarget, arc.markingWeight);
      }
      if (indexSource >= 0) {
        this.consumeInputTokens(indexSource, arc.markingWeight);
      }
    });
  }

  /**
   * @param {string} placeName - Name of place whitch gonna be found.
   * @returns {{id: string, name: string, marking: number}} Returns object whitch represent place.
   */
  findPlace(placeName) {
    var places = this.netData.places;
    const place = places.find((place) => place.name === placeName);
    return place;
  }

  /**
   * @param {string} transitionName - Name of transition whitch gonna be found.
   * @returns {{id: string, name: string}} Returns object whitch represent transition.
   */
  findTransition(transitionName) {
    var transitions = this.netData.transitions;
    const transition = transitions.find(
      (transition) => transition.name === transitionName
    );
    return transition;
  }

  /**
   * @param {string} transitionName - Name of transition.
   * @returns {{id: string, name: string, marking: number, arcWeight: number}[]} Returns array of places whitch provide input to transition.
   */
  findAllInputPlaces(transitionName) {
    var transition = this.findTransition(transitionName);
    const arcs = this.netData.arcs;
    // find all arcs whitch aim to selected transition
    const inputArcs = arcs.filter((arc) => arc.target === transition.id);
    var inputPlaces = [];
    inputArcs.forEach((arc) => {
      const places = this.netData.places;
      // find all places whitch are inputs to selected transition
      var place = places.find((place) => place.id === arc.source);
      inputPlaces.push({
        id: place.id,
        name: place.name,
        marking: place.marking,
        arcWeight: arc.markingWeight
      });
    });
    return inputPlaces;
  }

  /**
   * @param {string} transitionName - Name of transition.
   * @returns {{id: string, name: string, marking: number}[]} Returns array of arcs whitch are connected to seleted transition.
   */
  findAllConnectedArcs(transitionName) {
    var transition = this.findTransition(transitionName);
    const arcs = this.netData.arcs;
    const allArcs = arcs.filter(
      (arc) => arc.source === transition.id || arc.target === transition.id
    );

    return allArcs;
  }

  /**
   * When the transition fires, it consumes the required input tokens.
   * @param {number} placeIndex - Index of place.
   * @param {number} markingWeight - Number of token whitch are gonna be consumed.
   */
  consumeInputTokens(placeIndex, markingWeight) {
    this.netData.places[placeIndex].marking = Math.max(
      0,
      this.netData.places[placeIndex].marking - markingWeight
    );
  }

  /**
   * When the transition fires, it creates the required output tokens in its places.
   * @param {number} placeIndex - Index of place.
   * @param {number} markingWeight - Number of token whitch are gonna be created.
   */
  createOutputTokens(placeIndex, markingWeight) {
    this.netData.places[placeIndex].marking += markingWeight;
  }

  /**
   * Checks whether place inputs specified transition.
   * @param {string} placeName - Name of place.
   * @param {string} transitionName - Name of transition.
   */
  isInputPlace(placeName, transitionName) {
    var inputPlaces = this.findAllInputPlaces(transitionName);
    const place = inputPlaces.find((place) => place.name === placeName);

    if (!place) {
      return false;
    }
    return true;
  }
}
