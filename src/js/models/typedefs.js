/**
 * @typedef {{id: string, name: string, marking: number}} Place
 */
/**
 * @typedef {{id: string, name: string}} Transition
 */
/**
 * @typedef {{id: string, markingWeight: number, source: string, target: string}} Arc
 */

/**
 * @typedef {Object} pNet
 * @property {Place[]} places - Array of places in petri net.
 * @property {Transition[]} transitions - Array of transitions in petri net.
 * @property {Arc[]} arcs - Array of arcs in petri net.
 */

export {};
