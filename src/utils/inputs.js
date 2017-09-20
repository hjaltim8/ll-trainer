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
    const codes = ['f', 'r', 'b', 'l']
    let a = codes.indexOf(side) + 1
    if (a > 3) a = 0
    return codes[a]
  }
  
  function shiftLeft(side) {
    const codes = ['f', 'r', 'b', 'l']
    let a = codes.indexOf(side) - 1
    if (a < 0) a = 3
    return codes[a]
  }
  
  function neutralize(input, colorOnTop = 'Y') {
    // need to know what color is on top, to know how the colors relate to one another
    // can probably create only one for each and then create the rest programmatically by shifting
    // the keys...
    const neutralizationMaps = {
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
    let key = input.charAt(0).toUpperCase()
    return input.split('').map(value => neutralizationMaps[colorOnTop][key][value.toUpperCase()]).join('')
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
    return neutralizedInput.split('').map(value => {
        counter += 1
        if (counter === 1 || counter === 4 || counter === 7 || counter === 10) key = value
        return normalizationMaps[key][value]
      }
    ).join('')
  }

  function deNormalize(normalizedInput, startOn = 'f') {
    const deNormalizationMaps = {
        f: { f: 'f', r: 'r', b: 'b', l: 'l'},
        r: { f: 'r', r: 'b', b: 'l', l: 'f'},
        b: { f: 'b', r: 'l', b: 'f', l: 'r'},
        l: { f: 'l', r: 'f', b: 'r', l: 'b'}
    }
    let key = startOn
    let counter = 0
    return normalizedInput.split('').reduce((res, value) => {
        counter += 1
        if (counter === 4 || counter === 7 || counter === 10) key = shiftRight(res.slice(-1)[0])
        res.push(deNormalizationMaps[key][value])
        return res
    }, []).join('')
  }
  
  function deNeutralize(neutralizedInput, startOn, colorOnTop = 'Y') {
      const deNeutralizationMaps = {
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
    let key = startOn
    return neutralizedInput.split('').map(value => deNeutralizationMaps[colorOnTop][key][value]).join('')
  }

  function testProcess(input, colorOnTop = 'Y') {
      const startOn = input.charAt(0).toUpperCase()
      const upperCased = input.toUpperCase()
      const neutralized = neutralize(input, colorOnTop)
      const normalized = normalize(neutralized)
      const deNormalized = deNormalize(normalized) // should be same as neutralized
      const deNeutralized = deNeutralize(deNormalized, startOn, colorOnTop) // should be same as upperCased
      return {
          input,
          startOn,
          colorOnTop,
          upperCased,
          neutralized,
          normalized,
          deNormalized,
          deNeutralized,
          normalizationSuccessful: neutralized === deNormalized,
          neutralizationSuccessful: upperCased === deNeutralized
      }
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
    
    return patterns[normalize(side)]
  }
  
  function getSidePairPatterns(pair) {
    
    const patterns = {
      fff: { solved: true },
      frf: { lights: { adjacent: true, right: true } },
      flf: { lights: { adjacent: true, left: true } },
      fbf: { lights: { opposite: true } },
      ffr: { bar: { left: true, adjacent: true }},
      ffb: { bar: { left: true, opposite: true }},
      frr: { bar: { right: true, adjacent: true }},
      fbb: { bar: { right: true, opposite: true }},
      frb: { diverse: true },
      fbr: { diverse: true },
      flb: { diverse: true },
      flr: { diverse: true },
    }
    
    // Make sure side is normalized
    const n = normalize(pair)
    console.log(n)
    const sides = getSides(n)

    p1 = patterns[sides[0]]
    p2 = patterns[sides[1]]

    const result = {}

    if (p1.solved && p2.solved) {
        result.solved = true
    }

    if (p1.solved && p2.lights) {
        result.solved = 'left'
        result.lights.right = true
        if (p2.lights.opposite) {
            result.lights.opposite = true
        } else if (p2.lights.adjacent.right) {
            result.lights.adjacent = 'right'
        } else {
            result.lights.adjacent = 'left'
        }
    }

    if (p2.solved && p1.lights) {
        result.solved = 'right'
        result.lights.left = true
        if (p1.lights.opposite) {
            result.lights.opposite = true
        } else if (p1.lights.adjacent.right) {
            result.lights.adjacent = 'right'
        } else {
            result.lights.adjacent = 'left'
        }
    }

    if (p1.solved && p2.bar) {
        result.solved = 'left'
        result.bar.right = true
        if (p2.bar.left) {
            result.bar.inner = true
        } else {
            result.bar.outer = true
        }
        if (p2.bar.adjacent) {
            result.bar.adjacent = true
        } else {
            result.bar.opposite = true
        }
    }

    if (p2.solved && p1.bar) {
        result.solved = 'right'
        result.bar.left = true
        if (p1.bar.left) {
            result.bar.outer = true
        } else {
            result.bar.inner = true
        }
        if (p1.bar.adjacent) {
            result.bar.adjacent = true
        } else {
            result.bar.opposite = true
        }
    }

    if (p1.lights && p2.lights) {
        result.lights.double = true
        if (p1.lights.adjacent) {
            if (p1.lights.right) {
                result.lights.left.adjacent = 'right'
            } else {
                result.lights.left.adjacent = 'left'
            }
        } else {
            result.lights.left.opposite = true
        }
        if (p2.lights.adjacent) {
            if (p2.lights.right) {
                result.lights.right.adjacent = 'right'
            } else {
                result.lights.right.adjacent = 'left'
            }
        } else {
            result.lights.right.opposite = true
        }
        if (result.lights.left.adjacent && result.lights.right.adjacent) {
            result.lights.adjacent = result.lights.left.adjacent
        } else if (result.lights.left.opposite && result.lights.opposite) {
            result.lights.opposite = true
        }
    }

    if (p1.lights && p2.bar) {

    }

    if (p2.lights && p1.bar) {

    }

    if (p1.lights && p2.diverse) {

    }

    if (p2.lights && p1.diverse) {
        
    }

    if (p1.bar && p2.bar) {

    }

    if (p1.bar && p1.bar.left && p2.diverse) {

    }

    if (p2.bar && p2.bar.right && p1.diverse) {
        
    }

    if (p1.bar && p1.bar.right && p2.diverse) {

    }

    if (p2.bar && p2.bar.left && p1.diverse) {
        
    }

    if (p1.diverse && p2.diverse) {
        result.diverse = true
    }

    const arr = pair.split('')

    if (arr[0] === arr[5]) result.bookends = true

    // add checkers and such...

    return result
  }
  
  function workSomeMagic(input) {
    
    if (input == null) {
      return `Invalid input (${input})`
    }
    
    if (input.length === undefined || input.length !== 12) {
      return `Invalid input (incorrect input length) (${input})`
    }
    
    // first reduce to this format { B: 3, G: 3, O: 3, R: 3 }
    const sanityChecks = _.reduce(input.split(''), (result, value) => {
      const key = value.toUpperCase()
      if (result[key] === undefined) {
        result[key] = 0
      }
      result[key] += 1
      return result
    }, {})
  
    //console.log(sanityChecks)
    if (_.keys(sanityChecks).length !== 4) {
      return `Invalid input (incorrect amount of total colors) (${input})`
    }
    
    const colorsCorrectCounts = _.reduce(sanityChecks, (res, value, key) => {
      res = res && value === 3
      return res
    }, true)
    
    if (!colorsCorrectCounts) {
      return `Invalid input (incorrect recurrence of colors) (${input})`
    }
    
    console.log(testProcess(input))

    const neutralized = neutralize(input)
    const normalized = normalize(neutralized)
    
    const possibleSides = {
      fff: 1, ffr: 1, ffb: 1, frr: 1, frb: 1, frf: 1,
      flf: 1, flr: 1, flb: 1, fbf: 1, fbb: 1, fbr: 1
    }
      
    const normalizedSides = getSides(normalized)
    const sidesAreLegal = normalizedSides.reduce((res, val) => {
      res = res && (possibleSides[val] != null)
      return res
    }, true)
    
    if (!sidesAreLegal) {
      return `Invalid input (illegal sides) (${input})`
    }
    
    const resul = {
      //input: list,
      //colorOnTop: 'Y',
      //baseColor: list[0].toUpperCase(),
      neutralized: neutralized,
      normalized: normalized,
      // Neutralized can be created from normalized
      //   f on side 2 is the color to the right of normalized[2]
      //   f on side 3 is the color to the right of normalized[5]
      //   f on side 4 is the color to the right of normalized[8]
      sidePairs: {
        [normalizedSides[0]+normalizedSides[1]]: 1,
        [normalizedSides[1]+normalizedSides[2]]: 2,
        [normalizedSides[2]+normalizedSides[3]]: 3,
        [normalizedSides[3]+normalizedSides[0]]: 4,
      },
      sides: {
        [normalizedSides[0]]: 1,
        [normalizedSides[1]]: 2,
        [normalizedSides[2]]: 3,
        [normalizedSides[3]]: 4,
      }
    }
    
    // Since we have reached this state, we have at least what seems to be a legal input
    // But it could still be illegal in the sence that this particular order of sides does not
    // exist in reality (see fx the Impossible input: ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r'])
    // But this is something that will be taken into account at a later stage
    return resul
  }
  
  
  
  const UaInput = ['G', 'G', 'G', 'O', 'B', 'O', 'B', 'R', 'B', 'R', 'O', 'r'].join('')
  //const Ua = ['G', 'G', 'G', 'R', 'B', 'R', 'B', 'R', 'B', 'R', 'R', 'R']
  const Impossible = ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r'].join('')
  const Ua = workSomeMagic(UaInput)
  //console.log('result from func: ', JSON.stringify(Ua))
  console.log('Ua: ', Ua)
  
  const patterns = getSidePatterns('rbr')
  console.log(patterns)
  
console.log(testProcess('rbg'))
console.log(testProcess('rbgorr'))
  
  
  
  