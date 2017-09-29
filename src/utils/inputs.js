import _ from 'lodash'

// List of all possible single sides
//  const possibleSides = {
//    fff: 1, ffr: 1, ffb: 1, frr: 1, frb: 1, frf: 1,
//    flf: 1, flr: 1, flb: 1, fbf: 1, fbb: 1, fbr: 1
//  }

// List of all possible side pairs
//  create this list programmatically and then store it for use as lookups

function getSolvedSide(input) {
    const values = { 0: 'Front', 3: 'Right', 6: 'Back', 9: 'Left' }
    const arr = input.split('')
    for (let i = 0; i < 12; i += 3) {
        if (arr[i] === arr[i+1] && arr[i] === arr[i+2]) return values[i]    
    }
    return 'None'
}

function getLights(input) {
    const values = { 0: 'Front', 3: 'Right', 6: 'Back', 9: 'Left' }
    const arr = input.split('')
    if (arr[0] === arr[2] && arr[3] === arr[5]) return 'All'
    for (let i = 0; i < 12; i += 3) {
        if (arr[i] === arr[i+2]) return values[i]    
    }
    return 'None'
}

function shift(input, by) {
    // take the first by out, and add them to the end
    return input.slice(by) + input.slice(0, by)
}

function shiftAndSlice(input, shiftBy, sliceTo) {
    return shift(input, shiftBy).slice(0, sliceTo)
}

function getSides(input) {
    return input.match(/.{1,3}/g)
}

function getPairs(input) {
    const result = {}
    for (let i = 0; i < 4; i++) {
        result[shiftAndSlice(input, 3 * i, 6)] = true
    }
    return _.keys(result)
}

function getQuartets(input) {
    const result = {}
    for (let i = 0; i < 4; i++) {
        result[shift(input, 3 * i)] = true
    }
    return _.keys(result)
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
      frf: { lights: { adjacent: 'right' } },
      flf: { lights: { adjacent: 'left' } },
      fbf: { lights: { opposite: true } },
      ffr: { bar: { left: true, adjacent: 'right' }},
      ffb: { bar: { left: true, opposite: true }},
      frr: { bar: { right: true, adjacent: 'right' }},
      fbb: { bar: { right: true, opposite: true }},
      frb: { diverse: true },
      fbr: { diverse: true },
      flb: { diverse: true },
      flr: { diverse: true },
    }
    return patterns[normalize(side)]
  }
  
  export function getSidePairPatterns(pair) {
    // Make sure side is normalized
    const n = normalize(pair)
    // console.log(n)
    const sides = getSides(n)

    const p1 = getSidePatterns(sides[0])
    const p2 = getSidePatterns(sides[1])

    const result = {}

    // result.front = p1
    // result.right = p2

    if (p1.solved && p2.solved) {
        result.cubeSolved = true
    } else if (p1.solved) {
        result.solved = 'front'
    } else if (p2.solved) {
        result.solved = 'right'
    }

    if (p1.lights && p2.lights) {
        result.doubleLights = {}
        if (p1.lights.adjacent && p2.lights.adjacent) {
            if (p1.lights.adjacent === p2.lights.adjacent) {
                // result.adjacentDoubleLights = p1.lights.adjacent
                result.doubleLights.adjacent = p1.lights.adjacent
            } else {
                result.doubleLights.adjacent = 'mixed'
            }
        } else if (p1.lights.opposite && p2.lights.opposite) {
            result.doubleLights.opposite = true
        } else {
            result.doubleLights.mixed = true
        }
    } else if (p1.lights) {
        result.lights = { front: true }
        if (p1.lights.adjacent) result.lights.adjacent = p1.lights.adjacent
        if (p1.lights.opposite) result.lights.opposite = true
    }
    else if (p2.lights) {
        result.lights = { right: true }
        if (p2.lights.adjacent) result.lights.adjacent = p2.lights.adjacent
        if (p2.lights.opposite) result.lights.opposite = true
    }

    if (p1.bar && p2.bar) {
        result.doubleBar = {}
        if (p1.bar.left && p2.bar.right) {
            result.doubleBar.outer = true
            result.doubleBar.opposite = true
        } else {
            if (p1.bar.right && p2.bar.left) {
                result.doubleBar.inner = true
            } else {
                if (p1.bar.left) result.doubleBar.sameSide = 'left'
                if (p1.bar.right) result.doubleBar.sameSide = 'right'
            }
            if (p1.bar.adjacent && p2.bar.adjacent) {
                result.doubleBar.adjacent = true
            } else if (p1.bar.opposite && p2.bar.opposite) {
                result.doubleBar.opposite = true
            } else {
                result.doubleBar.mixed = true
            }
        }
    } else if (p1.bar) {
        result.bar = { front: true }
        if (p1.bar.left) result.outerBar = true
        if (p1.bar.right) result.innerBar = true
        if (p1.bar.adjacent) result.bar.adjacent = p1.bar.adjacent
        if (p1.bar.opposite) result.bar.opposite = p1.bar.opposite
    } else if (p2.bar) {
        result.bar = { right: true }
        if (p2.bar.left) result.innerBar = true
        if (p2.bar.right) result.outerBar = true
        if (p2.bar.adjacent) result.bar.adjacent = p2.bar.adjacent
        if (p2.bar.opposite) result.bar.opposite = p2.bar.opposite
    }

    if (p1.diverse && p2.diverse) {
        result.completelyDiverse = true
    } else if (p1.diverse) {
        result.diverse = 'front'
    } else if (p2.diverse) {
        result.diverse = 'right'
    }

    const arr = (deNormalize(pair)).split('')

    if (arr[0] === arr[5]) result.bookends = true

    // No checkers or such on a solved cube
    if (!result.cubeSolved) {
        // do we have at least 1,3,5 (2:1) pattern
        if (arr[2] === 'f' && arr[4] === 'f') {
            if (arr[1] === arr[3] && arr[1] === arr[5]) {
                result.checkerBoard = true
            } else if (arr[1] === arr[3]) {
                result.checker = { front: true, length: 5}
            } else {
                result.twoOne = 'front'
            }
        } else if (arr[1] === arr[3] && arr[1] === arr[5]) {
            if (arr[2] === arr[4]) {
                result.checker = { right: true, length: 5}
            } else {
                result.twoOne = 'right'
            }

        // test for a 4 checker
        } else if (arr[2] === 'f' && arr[1] === arr[3]) {
            result.checker = { front: true, length: 4 }
        } else if (arr[3] === arr[5] && arr[2] === arr[4]) {
            result.checker = { right: true, length: 4 }
        
        // check for outer checker
        } else if (arr[4] === 'f' && arr[1] === arr[5]) {
            result.outerChecker = true
        
        // check for inner checker
        } else if (arr[1] === arr[3] && arr[2] === arr[4]) {
            result.innerChecker = true

        // check for 5 checker with odd middle
        } else if (!result.bookends && arr[4] === 'f' && arr[1] === arr[3]) {
            result.oddMiddleChecker = 'front'
        } else if (!result.bookends && arr[1] === arr[5] && arr[2] === arr[4]) {
            result.oddMiddleChecker = 'right'
        
        
        // check for partial inner checkers
        } else if (arr[1] === arr[3]) {
            result.partialInnerChecker = { front: true }
            if (arr[1] === 'b') {
                result.partialInnerChecker.opposite = true
            } else if (arr[1] === 'r') {
                result.partialInnerChecker.adjacent = 'right'
            } else {
                result.partialInnerChecker.adjacent = 'left'
            }
        } else if (arr[2] === arr[4]) {
            // todo: check if arr[4] is adjacent or opposite to arr[5]
            result.partialInnerChecker = { right: true }
            if (shiftLeft(arr[4]) === arr[5]) {
                result.partialInnerChecker.adjacent = 'left'
            } else if (shiftRight(arr[4]) === arr[5]) {
                result.partialInnerChecker.adjacent = 'right'
            } else {
                result.partialInnerChecker.opposite = true
            }
        }
    }
    
    // color counts
    // const counter = { f: 1, r: 0, b: 0, l: 0 }
    result.colorCount = _.size(arr.reduce((r, v) => {r[v] = 1; return r}, {}))
    // counter[arr[2]] = 1
    // counter[arr[3]] = 1
    // counter[arr[5]] = 1

    // // const cornerColorCount = _.sum(_.values(counter))

    // counter[arr[1]] = 1
    // counter[arr[4]] = 1

    // result.colorCount = _.sum(_.values(counter))

    // Corner data
    // result.corners = { colorCount: cornerColorCount }

    // if (cornerColorCount === 2) {
    //     result.corners.solved = true
    //     result.corners.lights = 'All'
    // } else if (cornerColorCount === 4) {
    //     result.corners.diagonal = true
    //     result.corners.lights = 'None'
    // } else {
    //     result.corners.adjacent = true
    //     if (arr[2] === 'f') {
    //         result.corners.lights = 'Front'
    //     } else if (arr[2] === 'b') {
    //         result.corners.lights = 'Back'
    //     } else if (arr[5] === 'b') {
    //         result.corners.lights = 'Right'
    //     } else {
    //         result.corners.lights = 'Left'
    //     }
    // }

    // result.edges = {}

    // // edge data
    // if (shiftRight(arr[1]) === arr[4]) {
    //     result.edges.solved = true
    // } else if (shiftLeft(arr[4]) === arr[1]) {
    //     result.edges.reversed = true
    // } else {
    //     result.edges.opposite = true
    // }
    // 
    
    return result
  }

  export function getRecognitions(pair) {
      const p = getSidePairPatterns(pair)
      const result = {}

      if (p.solved) {
          result.category = {
              name: '3-Bar',
              bold: p.solved === 'front'
                ? [true, true, true, false, false, false]
                : [false, false, false, true, true, true],
          }
          if (p.lights) {
              result.lookFor = 'lights'
              result.cases = 'U'
          } else if (p.bar) {
              result.lookFor = '2-bar'
              result.cases = 'J'
          } else {
              result.lookFor = '4-colors'
              result.cases = 'F'
          }
      } else if (p.doubleLights) {
          result.category = {
              name: 'Double Lights',
              bold: [true, false, true, true, false, true],
          }
          if (p.checkerBoard) {
              result.lookFor = '2-color 6-checker'
              result.cases = 'Z'
          } else if (p.colorCount === 4 && p.doubleLights.adjacent) {
              result.lookFor = 'adj edges & 4-colors'
              result.cases = 'Z'
          } else if (p.colorCount === 4 && p.doubleLights.opposite) {
              result.lookFor = 'opp edges & 4-colors'
              result.cases = 'H'
          } else {
              result.lookFor = '2:1 pattern & 3-colors'
              result.cases = 'U'
          }
      } else if (p.lights && p.bar) {
          result.category = {
              name: 'Lights + 2-Bar',
              bold: p.bar.front
                ? p.outerBar ? [true, true, false, true, false, true] : [false, true, true, true, false, true]
                : p.outerBar ? [true, false, true, false, true, true] : [true, false, true, true, true, false],
          }
          if (p.innerBar && p.colorCount === 3) {
              result.lookFor = 'inside bar & 3-colors'
              result.cases = 'T'
          } else if (p.innerBar) {
              result.lookFor = 'inside bar & 4-colors'
              result.cases = 'R'
          } else if (p.outerBar && p.colorCount === 3) {
              result.lookFor = 'outer bar & 3-colors'
              result.cases = 'A'
          } else {
              result.lookFor = 'outer bar & 4-colors'
              result.cases = 'Ga/c'
          }
      } else if (p.lights) {
          result.category = {
              name: 'Lone Lights',
              bold: p.lights.front
                ? [true, false, true, false, false, false]
                : [false, false, false, true, false, true]
          }
          if (p.checker && p.checker.length === 5) {
              result.lookFor = '5-checker'
              result.cases = 'R'
          } else if (p.checker && p.checker.length === 4) {
            result.lookFor = '4-checker'
            result.cases = 'Ga/c'
          } else if (p.lights.opposite) {
            result.lookFor = 'lights enclose opp'
            result.cases = 'Gb/d'
          } else {
            result.lookFor = 'lights enclose adj (but no checker)'
            result.cases = 'A'
          }
      } else if (p.doubleBar) {
          result.category = {
              name: 'Double Bar',
              bold: p.doubleBar.outer
                ? [true, true, false, false, true, true]
                : p.doubleBar.inner
                    ? [false, true, true, true, true, false]
                    : p.doubleBar.sameSide === 'left'
                        ? [true, true, false, true, true, false]
                        : [false, true, true, false, true, true],
          }
          if (p.doubleBar.outer) {
            result.lookFor = 'both outside'
            result.cases = 'Y'
          } else if (p.doubleBar.inner && p.bookends) {
            result.lookFor = 'both inside & bookends'
            result.cases = 'A'
          } else if (p.doubleBar.inner) {
            result.lookFor = 'bothn inside & no bookends'
            result.cases = 'V'
          } else if (p.bookends) {
            result.lookFor = 'same side & bookends'
            result.cases = 'J'
          } else {
            result.lookFor = 'same side & no bookends'
            result.cases = 'N'
          }
      } else if (p.outerBar) {
          result.category = {
              name: 'Outside 2-Bar',
              bold: p.bar.front
                ? [true, true, false, false, false, false]
                : [false, false, false, false, true, true],
          }
          if (!p.bookends) {
            result.lookFor = 'no bookends'
            result.cases = 'V'
          } else if (p.partialInnerChecker && p.partialInnerChecker.adjacent) {
            result.lookFor = 'adj appears twice'
            result.cases = 'R'
          } else if (p.partialInnerChecker) {
            result.lookFor = 'opp appears twice'
            result.cases = 'Gb/d'
          } else if (p.bar.adjacent) {
            result.lookFor = 'adj by bar & 4-colors'
            result.cases = 'T'
          } else {
            result.lookFor = 'opp by bar & 4-colors'
            result.cases = 'A'
          }
      } else if (p.innerBar) {
          result.category = {
              name: 'Inside 2-Bar',
              bold: p.bar.front
                ? [false, true, true, false, false, false]
                : [false, false, false, true, true, false],
          }
          if (p.bookends && p.bar.adjacent) {
            result.lookFor = 'bookends adj color'
            result.cases = 'Ga/c'
          } else if (p.bookends) {
            result.lookFor = 'bookends opp color'
            result.cases = 'Gb/d'
          } else {
            result.lookFor = 'no bookends'
            result.cases = 'Y'
          }
      } else if (p.bookends) {
          result.category = {
              name: 'Bookends',
              bold: [true, false, false, false, false, true],
          }
          if (p.innerChecker) {
            result.lookFor = 'enclosed 4-checker'
            result.cases = 'F'
          } else if (p.partialInnerChecker && p.partialInnerChecker.adjacent) {
            result.lookFor = 'adj appears twice'
            result.cases = 'R'
          } else {
            result.lookFor = 'opp appears twice'
            result.cases = 'Ga/c'
          }
      } else {
          result.category = {
              name: 'No Bookends',
              bold: [true, false, false, false, false, true],
          }
          if (p.innerChecker) {
            result.lookFor = 'inner 4-checker'
            result.cases = 'V'
          } else if (p.outerChecker) {
            result.lookFor = 'outer 4-checker'
            result.cases = 'Y'
          } else {
            result.lookFor = '5-checker w/opp middle'
            result.cases = 'E'
          }
      }
      return result
  }
  
//   function getPllFromPatterns(pattern) {
//       if (pattern.solved) {
//           if (pattern.lights) {
//               return 'U'
//           }
//           if (pattern.bar) {
//               return 'J'
//           }
//           return 'F'
//       }

//       if (pattern.doubleLights) {
//           if (pattern.checkerBoard) {
//               return 'Z'
//           }
//           if (pattern.colorCount === 4) {
//               if (pattern.lights.adjacent) {
//                   return 'Z'
//               }
//               return 'H'
//           }
//           return 'U'
//       }

//       if (pattern.lights && pattern.bar) {
//           if (pattern.innerBar) {
//               if (pattern.colorCount === 3) {
//                   return 'T'
//               }
//               return 'R'
//           }
//           if (pattern.outerBar) {
//               if (pattern.colorCount === 3) {
//                   return 'A'
//               }
//               return 'Ga/c'
//           }
//       }

//       if (pattern.lights) {
//           if (pattern.checker && pattern.checker.length === 5) {
//               return 'R'
//           }
//           if (pattern.checker && pattern.checker.length === 4) {
//             return 'Ga/c'
//           }
//           if (pattern.ligths.opposite) {
//               return 'Gb/d'
//           }
//           return 'A'
//       }

//       if (pattern.doubleBar) {
//           if (pattern.doubleBar.outer) {
//               return 'Y'
//           }
//           if (pattern.doubleBar.inner) {
//               if (pattern.bookends) {
//                   return 'A'
//               }
//               return 'V'
//           }
//           if (pattern.doubleBar.sameSide) {
//               if (pattern.bookends) {
//                   return 'J'
//               }
//               return 'N'
//           }
//       }

//       if (pattern.outerBar) {
//           if (!pattern.bookends) {
//               return 'V'
//           }
//           if (pattern.partialInnerChecker) {
//               if (pattern.bar.adjacent) {
//                   return 'R'
//               }
//               return 'Gb/d'
//           }
//           if (pattern.bar.adjacent) {
//               return 'T'
//           }
//           return 'A'
//       }

//       if (pattern.innerBar) {
//           if (pattern.bookends) {
//               if (pattern.bar.adjacent) {
//                   return 'Ga/c'
//               }
//               return 'Gb/d'
//           }
//           return 'Y'
//       }

//       if (pattern.bookends) {
//           if (pattern.innerChecker) {
//               return 'F'
//           }
//           return 'R/Ga/c'
//       }

//       if (pattern.innerChecker) {
//           return 'V'
//       }
//       if (pattern.outerChecker) {
//           return 'Y'
//       }
//       return 'E'
//   }

  function getStats(s, size) {
    const result = {
        id: s.slice(0, size),
        remainder: s.slice(size, 12),
        lightsOn: getLights(s),
        solvedOn: getSolvedSide(s),
    }
    if (size === 3) {
        result.patterns = getSidePatterns(s.slice(0,3))
    } else if (size === 6) {
        const neutralized = deNormalize(s.slice(0,6))
        result.patterns = getSidePairPatterns(neutralized)
    }
    return result
}

  function workSomeMagic(name, input) {
    
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
    
    // console.log(testProcess(input))

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

    const qs = getQuartets(neutralized)
    // const sTemp = qs.map(v => getStats(v, 3))
    // const pTemp = qs.map(v => getStats(v, 6))
    // const qTemp = qs.map(v => getStats(v, 12))
    
    const resul = {
      id: name,
    //   neutralized: {
    //     sides: getSides(neutralized),
    //     pairs: getPairs(neutralized),
    //     quartets: getQuartets(neutralized)
    //   },
    //   normalized: {
    //     sides: getSides(normalized),
    //     pairs: getPairs(normalized),
    //     quartets: getQuartets(normalized)
    //   },
      sides: qs.map(v => getStats(normalize(v), 3)),
      pairs: qs.map(v => getStats(normalize(v), 6)),
      quartets: qs.map(v => getStats(normalize(v), 12)),
    }
    // console.log('result ', resul)
    
    // Since we have reached this state, we have at least what seems to be a legal input
    // But it could still be illegal in the sence that this particular order of sides does not
    // exist in reality (see fx the Impossible input: ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r'])
    // But this is something that will be taken into account at a later stage
    return resul
  }
  
  
  
// const UaInput = ['G', 'G', 'G', 'O', 'B', 'O', 'B', 'R', 'B', 'R', 'O', 'r'].join('')
// //const Ua = ['G', 'G', 'G', 'R', 'B', 'R', 'B', 'R', 'B', 'R', 'R', 'R']
// const Impossible = ['G', 'G', 'G', 'O', 'R', 'O', 'B', 'B', 'B', 'R', 'O', 'r'].join('')
// const Ua = workSomeMagic('Ua', UaInput)
// //console.log('result from func: ', JSON.stringify(Ua))
// console.log('Ua: ', Ua)

// const patterns = getSidePatterns('rbr')
// console.log(patterns)
  
// console.log(testProcess('rbg'))
// console.log(testProcess('rbgorr'))
// // const pair = 'fbbllr'
// const pair = 'frbllr'
// const p = getSidePairPatterns(pair)
// console.log(pair + ' patterns', p)
// console.log(getPllFromPatterns(p))

const inputs = {
    Aa: 'bbgorbrgrgoo',
    Ab: 'bbrgrgogbroo',
    E: 'obrgrbrgobog',
    Ua: 'gggobobrbror',
    Ub: 'gggorobobrbr',
    H: 'bgbrorgbgoro',
    Z: 'gogogobrbrbr',
    Ja: 'bbbrrgoorggo',
    Jb: 'bbbrggorrgoo',
    T: 'rrgobrgoobgb',
    Rb: 'rgrgrobogobb',
    Ra: 'ggobogorbrbr',
    F: 'bbbrogogrgro',
    Ga: 'rggobrgrobob',
    Gb: 'orbroobgrgbg',
    Gc: 'gbobrgoobrgr',
    Gd: 'rbgoorgrobgb',
    V: 'bogogrgbbrro',
    Na: 'bggorrgbbroo',
    Nb: 'bbgoorggbrro',
    Y: 'ggbroobrgobr'
}

const plls = _.mapValues(inputs, (i,k) => workSomeMagic(k,i))
// const sideCases = _.reduce(plls, (r, v, k) => {
//     v.normalized.sides.map(s => (r[s] || (r[s] = {}))[v.id] = true)
//     return r
// }, {})
// const pairCases = _.reduce(plls, (r, v, k) => {
//     v.normalized.pairs.map(s => r[s] = v.id)
//     return r
// }, {})
// const quartetCases = _.reduce(plls, (r, v, k) => {
//     v.normalized.quartets.map(s => r[s] = v.id)
//     return r
// }, {})


// console.log('plls', plls)
// console.log('sideCases', sideCases)
// console.log('pairCases', pairCases)
// console.log('quartetCases', quartetCases)
function toResult(id, value) { //id, s, size) {
    // const result = {
    //     id,
    //     match: s.slice(0, size),
    //     remainder: s.slice(size, 12),
    //     lightsOn: getLights(s),
    //     solvedOn: getSolvedSide(s),
    // }
    // if (size === 3) {
    //     result.patterns = getSidePatterns(s.slice(0,3))
    // } else if (size === 6) {
    //     const neutralized = deNormalize(s.slice(0,6))
    //     result.patterns = getSidePairPatterns(neutralized)
    // }
    // return result
    const clone = _.cloneDeep(value)
    clone.match = value.id
    clone.id = id
    return clone
}

const q2 = _.reduce(plls, (r, v, k) => {
    v.sides.map(s => (r[s.id] || (r[s.id] = {}))[v.id] = toResult(v.id, s))
    // v.normalized.quartets.map(s => {
    //     if (r[s.slice(0,3)] == null) r[s.slice(0,3)] = {}
    //     r[s.slice(0,3)][v.id] = toResult(v.id, s, 3)
    // })
    return r
}, {})
console.log('sides', q2)
const q3 = _.reduce(plls, (r, v, k) => {
    v.pairs.map(p => r[p.id] = toResult(v.id, p))
    // v.normalized.quartets.map(s => r[s.slice(0,6)] = toResult(v.id, s, 6))
    return r
}, {})
console.log('pairs', q3)
const q4 = _.reduce(plls, (r, v, k) => {
    v.quartets.map(q => r[q.id] = toResult(v.id, q))
    // v.normalized.quartets.map(s => r[s] = toResult(v.id, s, 12))
    return r
}, {})
console.log('quartets', q4)

function toPll(input) {
    const neutralized = neutralize(input, 'Y')
    // rather fix so that we use neutralized in the lookups
    const normalized = normalize(neutralized)
    return q4[normalized]
}

export function getRandomPll() {
    const random = _.sample(_.keys(q4))
    const deNormalized = deNormalize(random)
    const deNeutralized = deNeutralize(deNormalized, _.sample(['R','G','B','O']), 'Y')
    // lbrbllfrfrfb GRBRGGOBOBOR returning undefined but should return Ra
    const pll = toPll(deNeutralized)
    console.log('random', random, deNormalized, deNeutralized, pll)
    pll.colored = deNeutralized
    return pll
}

function testing(pll, input) {
    const n = normalize(neutralize(input))
    console.log(pll + ' (side)', q2[n.slice(0,3)])
    console.log(pll + ' (pair)', q3[n.slice(0,6)])
    console.log(pll, q4[n])
}

console.log(testing('F', 'gbobogogbrrr'))
getRandomPll()

// Ra: OBOBORGRBRGG
console.log('recognition (Ra) frfflrflbfrr', getRecognitions('frfflrflbfrr'), getSidePairPatterns('frfflrflbfrr'))