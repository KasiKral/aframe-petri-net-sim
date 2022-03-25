/**
 * Enum for possible scene events.
 * @readonly
 * @enum {string}
 */
export const SceneEvent = Object.freeze({
  petriNetLoaded: 'PetriNet Loaded',
  firedTransition: 'Fired Transition',
  enteredPlace: 'Entered Place',
  leftPlace: 'Left Place'
});
