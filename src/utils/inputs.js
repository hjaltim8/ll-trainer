import _ from 'lodash'

// List of all possible single sides
//  const possibleSides = {
//    fff: 1, ffr: 1, ffb: 1, frr: 1, frb: 1, frf: 1,
//    flf: 1, flr: 1, flb: 1, fbf: 1, fbb: 1, fbr: 1
//  }

// List of all possible side pairs
//  create this list programmatically and then store it for use as lookups

function getSides(input) {
    return input.match(/.{1,3}/g)
  }
  
  function shiftRight(side) {
    //console.log('shifting ' + side + ' right')
    const codes = ['f', 'r', 'b', 'l']
    let a = codes.indexOf(side)
    a += 1
    if (a > 3) a = 0
    return codes[a]
    //const result = codes[a]
    //console.log('shifted to ' + result)
    //return result
  }
  
  function shiftLeft(side) {
    const codes = ['f', 'r', 'b', 'l']
    let a = codes.indexOf(side)
    a -= 1
    if (a < 0) a = 3
    return codes[a]
  }
  
  function neutralize(input, colorOnTop = 'Y') {
    // need to know what color is on top, to know how the colors relate to one another
    // can probably create only one for each and then create the rest programmatically by shifting
    // the keys...
    const normalizationMaps = {
      Y: {
        G: { G: 'f', O: 'r', B: 'b', R: 'l'},
        O: { O: 'f', B: 'r', R: 'b', G: 'l'},
        B: { B: 'f', R: 'r', G: 'b', O: 'l'},
        R: { R: 'f', G: 'r', O: 'b', B: 'l'}
      },
      W: {
        G: { G: 'f', R: 'r', B: 'b', O: 'l'},
        R: { R: 'f', B: 'r', O: 'b', G: 'l'},
        B: { B: 'f', O: 'r', G: 'b', R: 'l'},
        O: { O: 'f', G: 'r', R: 'b', B: 'l'}
      },
      // Add for the other colors on top as well...
    }
    let key = input[0].toUpperCase()
    const neutralized = input.map(value => normalizationMaps[colorOnTop][key][value.toUpperCase()]).join('')
    const neutralizedSides = getSides(neutralized)
    return { id: neutralized, sides: neutralizedSides }
  }
  
  function normalize(neutralizedInput) {
    const normalizationMaps = {
        f: { f: 'f', r: 'r', b: 'b', l: 'l'},
        r: { r: 'f', b: 'r', l: 'b', f: 'l'},
        b: { b: 'f', l: 'r', f: 'b', r: 'l'},
        l: { l: 'f', f: 'r', r: 'b', b: 'l'}
    }
    let counter = 0
    let key
    const normalized = neutralizedInput.split('').map(value => {
        counter += 1
        if (counter === 1 || counter === 4 || counter === 7 || counter === 10) key = value
        return normalizationMaps[key][value]
      }
    ).join('')
    const normalizedSides = getSides(normalized)
    return { id: normalized, sides: normalizedSides }
  }
  
  function deNormalize(normalizedInput) {
      const deNormalizationMaps = {
        f: { f: 'f', r: 'r', b: 'b', l: 'l'},
        r: { f: 'r', r: 'b', b: 'l', l: 'f'},
        b: { f: 'b', r: 'l', b: 'f', l: 'r'},
        l: { f: 'l', r: 'f', b: 'r', l: 'b'}
    }
    let sides = getSides(normalizedInput)
    let key = 'r'
    sides[1] = sides[1].split('').map(value => {
      return deNormalizationMaps[key][value]
    }).join('')
    key = shiftRight(sides[1].split('')[2])
    sides[2] = sides[2].split('').map(value => {
      return deNormalizationMaps[key][value]
    }).join('')
    key = shiftRight(sides[2].split('')[2])
    sides[3] = sides[3].split('').map(value => {
      return deNormalizationMaps[key][value]
    }).join('')
    
    const neutralized = sides.reduce((res, val) => { return res + val }, '')
    return { id: neutralized, sides: sides }
  }
  
  function deNeutralize(neutralizedInput, baseColor, colorOnTop = 'Y') {
      const normalizationMaps = {
      Y: {
        G: { f: 'G', r: 'O', b: 'B', l: 'R'},
        O: { f: 'O', r: 'B', b: 'R', l: 'G'},
        B: { f: 'B', r: 'R', b: 'G', l: 'O'},
        R: { f: 'R', r: 'G', b: 'O', l: 'B'}
      },
      W: {
        G: { f: 'G', r: 'R', b: 'B', l: 'O'},
        R: { f: 'R', r: 'B', b: 'O', l: 'G'},
        B: { f: 'B', r: 'O', b: 'G', l: 'R'},
        O: { f: 'O', r: 'G', b: 'R', l: 'B'}
      },
      // Add for the other colors on top as well...
    }
    let key = baseColor
    const neutralized = neutralizedInput.split('').map(value => normalizationMaps[colorOnTop][key][value]).join('')
    const neutralizedSides = getSides(neutralized)
    return { id: neutralized, sides: neutralizedSides }
  }
  
  function normalizeSide(side) {
    const normalizationMaps = {
        f: { f: 'f', r: 'r', b: 'b', l: 'l'},
        r: { r: 'f', b: 'r', l: 'b', f: 'l'},
        b: { b: 'f', l: 'r', f: 'b', r: 'l'},
        l: { l: 'f', f: 'r', r: 'b', b: 'l'}
    }
    let key = side.split('')[0]
    const normalized = side.split('').map(value => {
        return normalizationMaps[key][value]
      }
    ).join('')
    return normalized
  }
  
  function getSidePatterns(side) {
    
    const patterns = {
      fff: { solved: true },
      frf: { lights: { adjacent: true, right: true } },
      flf: { lights: { adjacent: true, left: true } },
      fbf: { lights: { opposite: true } },
      ffr: { bar: { left: true, adjacent: true }},
      ffb: { bar: { left: true, opposite: true }},
      frr: { bar: { right: true, adjacent: true }},
      fbb: { bar: { right: true, opposite: true }},
      frb: {},
      fbr: {},
      flb: {},
      flr: {},
    }
    
    // Make sure side is normalized
    const n = normalizeSide(side)
    console.log(n)
    return patterns[n]
  }
  
  function getSidePairPatterns(sides) {
    
    const patterns = {
      fff: { solved: true },
      frf: { lights: { adjacent: true, right: true } },
      flf: { lights: { adjacent: true, left: true } },
      fbf: { lights: { opposite: true } },
      ffr: { bar: { left: true, adjacent: true }},
      ffb: { bar: { left: true, opposite: true }},
      frr: { bar: { right: true, adjacent: true }},
      fbb: { bar: { right: true, opposite: true }},
      frb: {},
      fbr: {},
      flb: {},
      flr: {},
    }
    
    // Make sure side is normalized
    const n = normalizeSide(side)
    console.log(n)
    return patterns[n]
  }
  
  function workSomeMagic(list) {
    
    if (list == null) {
      return `Invalid input (${list}) | (${JSON.stringify(list)})`
    }
    
    if (list.length === undefined || list.length !== 12) {
      return `Invalid input (incorrect input length) (${list}) | (${JSON.stringify(list)})`
    }
    
    // first reduce to this format { B: 3, G: 3, O: 3, R: 3 }
    const sanityChecks = _.reduce(list, (result, value) => {
      const key = value.toUpperCase()
      if (result[key] === undefined) {
        result[key] = 0
      }
      result[key] += 1
      return result
    }, {})
  
    //console.log(sanityChecks)
    if (_.keys(sanityChecks).length !== 4) {
      return `Invalid input (incorrect amount of total colors) (${list}) | (${JSON.stringify(list)})`
    }
    
    const colorsCorrectCounts = _.reduce(sanityChecks, (res, value, key) => {
      res = res && value === 3
      return res
    }, true)
    
    if (!colorsCorrectCounts) {
      return `Invalid input (incorrect recurrence of colors) (${list}) | (${JSON.stringify(list)})`
    }
    
    // First neutralize the entire list
    const neutralized = neutralize(list)
    console.log('neutralized', neutralized)
    
    // Then normalize the neutralized input
    const normalized = normalize(neutralized.id)
    console.log('normalized', normalized)
    
    // Now deNormalize
    const deNormalized = deNormalize(normalized.id)
    console.log('deNormalized', deNormalized)
    
    // Finally deNeutralize
    const deNeutralized = deNeutralize(deNormalized.id, 'G', 'Y')
    console.log('deNeutralized(G, Y)', deNeutralized)
    
    
    const possibleSides = {
      fff: 1, ffr: 1, ffb: 1, frr: 1, frb: 1, frf: 1,
      flf: 1, flr: 1, flb: 1, fbf: 1, fbb: 1, fbr: 1
    }
      
    const sidesAreLegal = normalized.sides.reduce((res, val) => {
      res = res && (possibleSides[val] != null)
      return res
    }, true)
    
    if (!sidesAreLegal) {
      return `Invalid input (illegal sides) (${list}) | (${JSON.stringify(list)})`
    }
    
    const resul = {
      //input: list,
      //colorOnTop: 'Y',
      //baseColor: list[0].toUpperCase(),
      neutralized: neutralized.id,
      normalized: normalized.id,
      // Neutralized can be created from normalized
      //   f on side 2 is the color to the right of normalized[2]
      //   f on side 3 is the color to the right of normalized[5]
      //   f on side 4 is the color to the right of normalized[8]
      sidePairs: {
        [normalized.sides[0]+normalized.sides[1]]: 1,
        [normalized.sides[1]+normalized.sides[2]]: 2,
        [normalized.sides[2]+normalized.sides[3]]: 3,
        [normalized.sides[3]+normalized.sides[0]]: 4,
      },
      sides: {
        [normalized.sides[0]]: 1,
        [normalized.sides[1]]: 2,
        [normalized.sides[2]]: 3,
        [normalized.sides[3]]: 4,
      }
    }
    
    // Since we have reached this state, we have at least what seems to be a legal input
    // But it could still be illegal in the sence that this particular order of sides does not
    // exist in reality (see fx the Impossible input: ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r'])
    // But this is something that will be taken into account at a later stage
    return resul
  }
  
  
  
  const UaInput = ['G', 'G', 'G', 'O', 'B', 'O', 'B', 'R', 'B', 'R', 'O', 'r']
  //const Ua = ['G', 'G', 'G', 'R', 'B', 'R', 'B', 'R', 'B', 'R', 'R', 'R']
  const Impossible = ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r']
  const Ua = workSomeMagic(UaInput)
  //console.log('result from func: ', JSON.stringify(Ua))
  console.log('Ua: ', Ua)
  
  const patterns = getSidePatterns('rbr')
  console.log(patterns)
  
  
  
  
  
  