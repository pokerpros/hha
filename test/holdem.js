/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const test = require('tape')
const spok = require('spok')
const analyze = require('../')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
function diagnosePositions(players) {
  players.forEach(diagnosePosition)
  function diagnosePosition(p) {
    const pos = p.sb ? 'sb' : p.bb ? 'bb' : p.bu ? 'bu' : 'na'
    console.log('[ seat: %d, [ %s ], pref: %d, post: %d, %s ] \t(%s)',
                p.seatno, pos, p.preflopOrder, p.postflopOrder, p.pos, p.name)
  }
}
/* eslint-enable no-unused-vars */

test('\naction on all streets', function(t) {
  t.pass('original HH for reference: https://github.com/thlorenz/hhp/blob/7ab748013ff7b2f762497abbd55f04d25d387701/test/fixtures/holdem/pokerstars/actiononall.txt')
  const hand = require('./fixtures/holdem/actiononall.json')
  const res = analyze(hand)

  spok(t, res.info,
    { $topic: 'info'
    , room: 'pokerstars'
    , handid: '149651992548'
    , gametype: 'tournament'
    , gameno: '1495192630'
    , currency: '$'
    , donation: 0.91
    , rake: 0.09
    , buyin: 1
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'xi '
    , sb: 400
    , bb: 800
    , year: 2016
    , month: 3
    , day: 1
    , hour: 1
    , min: 29
    , sec: 41
    , timezone: 'ET'
    , ante: 50
    , players: 4
    , anyInvested: true
    , anySawFlop: true })

  spok(t, res.table, { $topic: 'table', tableno: 3, maxseats: 9, button: 3 })
  spok(t, res.board,
    { $topic: 'board', card1: '3c', card2: 'Jc', card3: '3h', card4: '6h', card5: '3d' })

  t.equal(res.players.length, 4, '4 players')

  spok(t, res.players[0],
    { $topic: 'player 0'
    , seatno: 4
    , chips: 15451
    , chipsPreflop: 15001
    , chipsFlop: 15001
    , chipsTurn: 15001
    , chipsRiver: 15001
    , chipsShowdown: 15001
    , chipsAfter: 15001
    , m: 11
    , preflop:
      [ { type: 'fold'
        , bet: 2
        , pot: 4600
        , potAfter: 4600
        , chips: 15001
        , chipsAfter: 15001 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown: []
    , sb: true
    , preflopOrder: 2
    , postflopOrder: 0
    , pos: 'sb'
    , exactPos: 'sb'
    , name: 'DmelloH'
    , invested: true
    , sawFlop: false
    , sawShowdown: false })

  spok(t, res.players[1],
    { $topic: 'player 1'
    , seatno: 9
    , chips: 22060
    , chipsPreflop: 21210
    , chipsFlop: 21210
    , chipsTurn: 21210
    , chipsRiver: 21210
    , chipsShowdown: 21210
    , chipsAfter: 21210
    , m: 16
    , preflop:
      [ { type: 'fold'
        , bet: 2
        , pot: 4600
        , potAfter: 4600
        , chips: 21210
        , chipsAfter: 21210 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown: []
    , hero: true
    , cards: { card1: '4c', card2: '2d' }
    , bb: true
    , preflopOrder: 3
    , postflopOrder: 1
    , pos: 'bb'
    , exactPos: 'bb'
    , name: 'held'
    , invested: true
    , sawFlop: false
    , sawShowdown: false })

  spok(t, res.players[2],
    { $topic: 'player 2'
    , seatno: 1
    , chips: 15875
    , chipsPreflop: 15825
    , chipsFlop: 14225
    , chipsTurn: 11825
    , chipsRiver: 10225
    , chipsShowdown: 7025
    , chipsAfter: 7025
    , m: 11
    , preflop:
      [ { type: 'raise'
        , ratio: 2
        , bet: 2
        , allin: false
        , amount: 1600
        , pot: 1400
        , potAfter: 3000
        , chips: 15825
        , chipsAfter: 14225 } ]
    , flop:
      [ { type: 'bet'
        , ratio: 0.5
        , bet: 1
        , allin: false
        , amount: 2400
        , pot: 4600
        , potAfter: 7000
        , chips: 14225
        , chipsAfter: 11825 } ]
    , turn:
      [ { type: 'check'
        , bet: 1
        , pot: 9400
        , potAfter: 9400
        , chips: 11825
        , chipsAfter: 11825 }
      , { type: 'call'
        , ratio: 0.1
        , bet: 1
        , allin: false
        , amount: 1600
        , pot: 11000
        , potAfter: 12600
        , chips: 11825
        , chipsAfter: 10225 } ]
    , river:
      [ { type: 'check'
        , bet: 1
        , pot: 12600
        , potAfter: 12600
        , chips: 10225
        , chipsAfter: 10225 }
      , { type: 'call'
        , ratio: 0.2
        , bet: 1
        , allin: false
        , amount: 3200
        , pot: 15800
        , potAfter: 19000
        , chips: 10225
        , chipsAfter: 7025 } ]
    , showdown: []
    , preflopOrder: 0
    , postflopOrder: 2
    , pos: 'co'
    , exactPos: 'co'
    , cards: { card1: 'Td', card2: 'Tc' }
    , name: 'Fischersito'
    , invested: true
    , sawFlop: true
    , sawShowdown: true })

  spok(t, res.players[3],
    { $topic: 'player 3'
    , seatno: 3
    , chips: 14114
    , chipsPreflop: 14064
    , chipsFlop: 12464
    , chipsTurn: 10064
    , chipsRiver: 8464
    , chipsShowdown: 5264
    , chipsAfter: 24264
    , m: 10
    , preflop:
      [ { type: 'call'
        , ratio: 0.5
        , bet: 2
        , allin: false
        , amount: 1600
        , pot: 3000
        , potAfter: 4600
        , chips: 14064
        , chipsAfter: 12464 } ]
    , flop:
      [ { type: 'call'
        , ratio: 0.3
        , bet: 1
        , allin: false
        , amount: 2400
        , pot: 7000
        , potAfter: 9400
        , chips: 12464
        , chipsAfter: 10064 } ]
    , turn:
      [ { type: 'bet'
        , ratio: 0.2
        , bet: 1
        , allin: false
        , amount: 1600
        , pot: 9400
        , potAfter: 11000
        , chips: 10064
        , chipsAfter: 8464 } ]
    , river:
      [ { type: 'bet'
        , ratio: 0.3
        , bet: 1
        , allin: false
        , amount: 3200
        , pot: 12600
        , potAfter: 15800
        , chips: 8464
        , chipsAfter: 5264 } ]
    , showdown:
      [ { type: 'collect'
        , ratio: 1
        , winall: true
        , amount: 19000
        , chips: 5264
        , chipsAfter: 24264 } ]
    , button: true
    , preflopOrder: 1
    , postflopOrder: 3
    , pos: 'bu'
    , exactPos: 'bu'
    , cards: { card1: 'Qs', card2: 'Jh' }
    , name: 'Irisha2'
    , invested: true
    , sawFlop: true
    , sawShowdown: true })

  t.end()
})

test('\npreflop allin', function(t) {
  t.pass('original HH for reference: https://github.com/thlorenz/hhp/blob/master/test/fixtures/holdem/pokerstars/allin-preflop.txt')
  const hand = require('./fixtures/holdem/allin-preflop.json')
  const res = analyze(hand)

  spok(t, res.info,
    { $topic: 'info'
    , room: 'pokerstars'
    , handid: '149652059422'
    , gametype: 'tournament'
    , gameno: '1495192630'
    , currency: '$'
    , donation: 0.91
    , rake: 0.09
    , buyin: 1
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'xi '
    , sb: 400
    , bb: 800
    , year: 2016
    , month: 3
    , day: 1
    , hour: 1
    , min: 33
    , sec: 54
    , timezone: 'ET'
    , ante: 50
    , players: 4
    , anyInvested: true
    , anySawFlop: false })

  spok(t, res.table,
    { $topic: 'table', tableno: 3, maxseats: 9, button: 3 })
  spok(t, res.board,
    { $topic: 'board', card1: '8h', card2: 'Kd', card3: '2s', card4: '6s', card5: '4s' })

  t.equal(res.players.length, 4, '4 players')
  spok(t, res.players[0],
    { $topic: 'player 0'
    , seatno: 4
    , chips: 33302
    , chipsPreflop: 32852
    , chipsFlop: 26893
    , chipsTurn: 26893
    , chipsRiver: 26893
    , chipsShowdown: 26893
    , chipsAfter: 26893
    , m: 24
    , preflop:
      [ { type: 'call'
        , ratio: 0.6
        , bet: 2
        , allin: false
        , amount: 3025
        , pot: 4825
        , potAfter: 7850
        , chips: 32852
        , chipsAfter: 29827 }
      , { type: 'call'
        , ratio: 0.2
        , bet: 3
        , allin: false
        , amount: 2934
        , pot: 14209
        , potAfter: 17143
        , chips: 29827
        , chipsAfter: 26893 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown: []
    , sb: true
    , preflopOrder: 2
    , postflopOrder: 0
    , pos: 'sb'
    , exactPos: 'sb'
    , cards: { card1: '7h', card2: '7d' }
    , name: 'DmelloH'
    , invested: true
    , sawFlop: false
    , sawShowdown: false })

  spok(t, res.players[1],
    { $topic: 'player 1'
    , seatno: 9
    , chips: 6409
    , chipsPreflop: 5559
    , chipsFlop: 0
    , chipsTurn: 0
    , chipsRiver: 0
    , chipsShowdown: 0
    , chipsAfter: 16343
    , m: 5
    , preflop:
      [ { type: 'raise'
        , ratio: 1.9
        , bet: 3
        , allin: true
        , amount: 5559
        , pot: 7850
        , potAfter: 13409
        , chips: 5559
        , chipsAfter: 0 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , ratio: 1
        , winall: true
        , amount: 16343
        , chips: 0
        , chipsAfter: 16343 } ]
    , hero: true
    , cards: { card1: 'Qd', card2: 'Qs' }
    , bb: true
    , preflopOrder: 3
    , postflopOrder: 1
    , pos: 'bb'
    , exactPos: 'bb'
    , name: 'held'
    , invested: true
    , sawFlop: false
    , sawShowdown: true })

  spok(t, res.players[2],
    { $topic: 'player 2'
    , seatno: 1
    , chips: 3475
    , chipsPreflop: 3425
    , chipsFlop: 0
    , chipsTurn: 0
    , chipsRiver: 0
    , chipsShowdown: 0
    , chipsAfter: 0
    , m: 2
    , preflop:
      [ { type: 'raise'
        , ratio: 4.3
        , bet: 2
        , allin: true
        , amount: 3425
        , pot: 1400
        , potAfter: 4825
        , chips: 3425
        , chipsAfter: 0 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown: []
    , preflopOrder: 0
    , postflopOrder: 2
    , pos: 'co'
    , exactPos: 'co'
    , cards: { card1: 'Ad', card2: '2c' }
    , name: 'Fischersito'
    , invested: true
    , sawFlop: false
    , sawShowdown: false })

  spok(t, res.players[3],
    { $topic: 'player 3'
    , seatno: 3
    , chips: 24314
    , chipsPreflop: 24264
    , chipsFlop: 24264
    , chipsTurn: 24264
    , chipsRiver: 24264
    , chipsShowdown: 24264
    , chipsAfter: 24264
    , m: 17
    , preflop:
      [ { type: 'fold'
        , bet: 2
        , pot: 4825
        , potAfter: 4825
        , chips: 24264
        , chipsAfter: 24264 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown: []
    , button: true
    , preflopOrder: 1
    , postflopOrder: 3
    , pos: 'bu'
    , exactPos: 'bu'
    , name: 'Irisha2'
    , invested: false
    , sawFlop: false
    , sawShowdown: false })

  t.end()
})
