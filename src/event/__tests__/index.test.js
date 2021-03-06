//@flow

import {from} from 'most'
import {createEvent, type Event} from '..'

import {getSpyCalls, spy} from 'effector/fixtures'

import {show} from 'effector/fixtures/showstep'

describe('symbol-observable support', () => {
  test('most.from(event) //stream of events', () => {
    expect(() => {
      from(createEvent(''))
    }).not.toThrow()
    const ev1 = createEvent('ev1')
    const ev2 = createEvent('ev2')
    const ev1$ = from(ev1)
    ev1$.observe(spy)
    ev1(0)
    ev1(1)
    ev1(2)
    ev2('should ignore')
    expect(spy).toHaveBeenCalledTimes(3)

    expect(spy.mock.calls).toEqual([[0], [1], [2]])
  })
})

test('event.watch(fn)', () => {
  const click = createEvent('click')
  click.watch(spy)
  click()
  click(1)
  click(2)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(getSpyCalls()).toEqual([
    [undefined, 'click'],
    [1, 'click'],
    [2, 'click'],
  ])
})

test('event.prepend(fn)', () => {
  const click = createEvent('click')
  const preclick = click.prepend(([n]) => n)
  click.watch(spy)
  preclick([])
  preclick([1])
  preclick([2])
  /**
   * TODO: It's a bug! Prepend should not skip empty returns
   *
   * should be
   *
   *     expect(spy).toHaveBeenCalledTimes(3)
   *     expect(getSpyCalls()).toEqual([
   *       [undefined, 'click'],
   *       [1, 'click'],
   *       [2, 'click'],
   *     ])
   *
   */
  expect(spy).not.toHaveBeenCalledTimes(3)
  expect(spy).toHaveBeenCalledTimes(2)
  expect(getSpyCalls()).not.toEqual([
    [undefined, 'click'],
    [1, 'click'],
    [2, 'click'],
  ])
  expect(getSpyCalls()).toEqual([
    // [undefined, 'click'],
    [1, 'click'],
    [2, 'click'],
  ])
})

test('event.map(fn)', () => {
  const click = createEvent('click')
  const postclick = click.map(n => [n])
  postclick.watch(spy)
  click()
  click(1)
  click(2)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(getSpyCalls()).toEqual([
    [[undefined], 'click → *'],
    [[1], 'click → *'],
    [[2], 'click → *'],
  ])
})

test('event.filter should infer type', () => {
  const num: Event<number | '-1'> = createEvent('number')

  const evenNum = num.filter(n => {
    if (n !== '-1') return n
  })

  evenNum.watch(e => spy(e))

  num(0)
  num('-1')
  num(2)
  num('-1')
  num(4)
  ;(evenNum: Event<number>) //Should not fail

  expect(getSpyCalls()).toEqual([[0], [2], [4]])
})

test('event.filter should drop undefined values', () => {
  const num: Event<number> = createEvent('number')
  const evenNum = num.filter(n => {
    if (n % 2 === 0) return n * 2
  })

  evenNum.watch(e => spy(e))

  num(0)
  num(1)
  num(2)
  num(3)
  num(4)

  expect(getSpyCalls()).toEqual([[0], [4], [8]])

  expect(show(num.graphite.seq)).toMatchSnapshot('num event graph')
  expect(show(evenNum.graphite.seq)).toMatchSnapshot('evenNum event graph')
})
