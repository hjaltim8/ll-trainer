import _ from 'lodash'

const sides = {
    fff: { 1: 'f', 2: 'f', 3: 'f', code: 'fff' },
    fbf: { 1: 'f', 2: 'b', 3: 'f', code: 'fbf' },
    flf: { 1: 'f', 2: 'l', 3: 'f', code: 'flf' },
    frf: { 1: 'f', 2: 'r', 3: 'f', code: 'frf' },
    ffb: { 1: 'f', 2: 'f', 3: 'b', code: 'ffb' },
    ffr: { 1: 'f', 2: 'f', 3: 'r', code: 'ffr' },
    fbb: { 1: 'f', 2: 'b', 3: 'b', code: 'fbb' },
    frr: { 1: 'f', 2: 'r', 3: 'r', code: 'frr' },
    flr: { 1: 'f', 2: 'l', 3: 'r', code: 'flr' },
    flb: { 1: 'f', 2: 'l', 3: 'b', code: 'flb' },
    frb: { 1: 'f', 2: 'r', 3: 'b', code: 'frb' },
    fbr: { 1: 'f', 2: 'b', 3: 'r', code: 'fbr' },
}

const plls = {
  Ua: { sides: {
    fff: { count: 1, positions: [1] },
    frf: { count: 2, positions: [2,3] },
    fbf: { count: 1, positions: [4] }
  }},
  Ub: { sides: {
      fff: { count: 1, positions: [1] },
      fbf: { count: 1, positions: [2] },
      flf: { count: 2, positions: [3,4] },
  }},
  H: { sides: {
      fbf: { count: 4, positions: [1,2,3,4] },
  }},
  Z: { sides: {
      frf: { count: 2, positions: [1,3] },
      flf: { count: 2, positions: [2,4] },
  }},
  Aa: { sides: {
      ffb: { count: 1, positions: [1] },
      fbr: { count: 1, positions: [2] },
      frf: { count: 1, positions: [3] },
      frr: { count: 1, positions: [4] },
  }},
  Ab: { sides: {
      ffr: { count: 1, positions: [1] },
      flf: { count: 1, positions: [2] },
      flr: { count: 1, positions: [3] },
      fbb: { count: 1, positions: [4] },
  }},
  E: { sides: {
      frb: { count: 2, positions: [1,3] },
      flb: { count: 2, positions: [2,4] },
  }},
  Ja: { sides: {
      fff: { count: 1, positions: [1] },
      ffr: { count: 2, positions: [2,4] },
      ffb: { count: 1, positions: [3] },
  }},
  Jb: { sides: {
      fff: { count: 1, positions: [1] },
      frr: { count: 2, positions: [2,4] },
      fbb: { count: 1, positions: [3] },
  }},
  Ra: { sides: {
      flf: { count: 1, positions: [1] },
      ffr: { count: 1, positions: [2] },
      flb: { count: 1, positions: [3] },
      fbr: { count: 1, positions: [4] },
  }},
  Rb: { sides: {
      frf: { count: 1, positions: [1] },
      flr: { count: 1, positions: [2] },
      flb: { count: 1, positions: [3] },
      frr: { count: 1, positions: [4] },
  }},
  T: { sides: {
      fbf: { count: 1, positions: [1] },
      ffr: { count: 1, positions: [2] },
      frb: { count: 1, positions: [3] },
      frr: { count: 1, positions: [4] },
  }},
  F: { sides: {
      fff: { count: 1, positions: [1] },
      fbr: { count: 1, positions: [2] },
      flb: { count: 1, positions: [3] },
      flr: { count: 1, positions: [4] },
  }},
  Ga: { sides: {
      flf: { count: 1, positions: [1] },
      frr: { count: 1, positions: [2] },
      frb: { count: 1, positions: [3] },
      flr: { count: 1, positions: [4] },
  }},
  Gb: { sides: {
      fbf: { count: 1, positions: [1] },
      fbr: { count: 2, positions: [2,4] },
      fbb: { count: 1, positions: [3] },
  }},
  Gc: { sides: {
      frf: { count: 1, positions: [1] },
      fbr: { count: 1, positions: [2] },
      frb: { count: 1, positions: [3] },
      ffr: { count: 1, positions: [4] },
  }},
  Gd: { sides: {
      fbf: { count: 1, positions: [1] },
      flr: { count: 2, positions: [2,4] },
      ffb: { count: 1, positions: [3] },
  }},
  Y: { sides: {
      ffb: { count: 1, positions: [1] },
      fbb: { count: 1, positions: [2] },
      frb: { count: 2, positions: [3,4] },
  }},
  Na: { sides: {
      fbb: { count: 4, positions: [1,2,3,4] },
  }},
  Nb: { sides: {
      ffb: { count: 4, positions: [1,2,3,4] },
  }},
  V: { sides: {
      fbb: { count: 1, positions: [1] },
      ffb: { count: 1, positions: [2] },
      flb: { count: 2, positions: [3,4] },
  }},
}

const cases = {
  fff: ['Ua', 'Ub', 'Ja', 'Jb', 'F'],
  fbf: ['Ua', 'Ub', 'Gb', 'Gd', 'T', 'H'],
  flf: ['Z', 'Ub', 'Ab', 'Ra', 'Ga'],
  frf: ['Z', 'Ua', 'Aa', 'Rb', 'Gc'],
  ffb: ['Aa', 'Ja', 'Gd', 'Y', 'Nb', 'V'],
  ffr: ['Ab', 'Ja', 'Ra', 'T', 'Gc'],
  fbb: ['Ab', 'Jb', 'Gb', 'Y', 'Na', 'V'],
  frr: ['Aa', 'Jb', 'Rb', 'T', 'Ga'],
  flr: ['Ab', 'Rb', 'F', 'Ga', 'Gd'],
  flb: ['E', 'Ra', 'Rb', 'F', 'V'],
  frb: ['E', 'T', 'Ga', 'Gc', 'Y'],
  fbr: ['Aa', 'Ra', 'Gb', 'Gc', 'F']
}

const sideKeys = _.keys(sides)

let result = {}
for (let i = 0; i < 12; i++) {
  for (let j = i; j < 12; j++) {
    if (i === j) {
        let cases = []
        const s = _.reduce(plls, (result, data, pll) => {
            if (data.sides[sideKeys[i]]) {
              if (data.sides[sideKeys[i]].count > 1) {
                //console.log(sideKeys[i], data.sides[sideKeys[i]], data.sides[sideKeys[i]].count)
                result.push(pll)
              }
            }
          return result
        }, [])
        //console.log(s)
        // Check with the values in plls, only add if count is > 1
        if (s.length === 1) {
          result[sideKeys[i] + '' + sideKeys[j]] = s[0]
        } else {
          // Take into account order
          // PickBy create an object with ordered sides
          // and only add if exists
          result[sideKeys[i] + '' + sideKeys[j]] = s
        }
    } else {
        const intersection = _.intersection(cases[sideKeys[i]], cases[sideKeys[j]])
        if (intersection.length === 1) {
           result[sideKeys[i] + '' + sideKeys[j]] = intersection[0]
           result[sideKeys[j] + '' + sideKeys[i]] = intersection[0]
        } else {
           result[sideKeys[i] + '' + sideKeys[j]] = [...intersection]
           result[sideKeys[j] + '' + sideKeys[i]] = [...intersection]
        }
    }
  }
}

//console.log(result)

const filtered = _.pickBy(result, (arr, key) => arr.length > 0)

console.log(filtered)

// To take care of the very few cases where the order matters, check the order...
