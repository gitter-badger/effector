//@flow

import invariant from 'invariant'
import {type Store, createStoreObject} from 'effector/store'

//eslint-disable-next-line no-unused-vars
declare export function combine<R>(fn: () => R): Store<R>
declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
declare export function combine<A, B, R>(
  a: Store<A>,
  b: Store<B>,
  fn: (a: A, b: B) => R,
): Store<R>
declare export function combine<A, B, C, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  fn: (a: A, b: B, c: C) => R,
): Store<R>
declare export function combine<A, B, C, D, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  fn: (a: A, b: B, c: C, d: D) => R,
): Store<R>
declare export function combine<A, B, C, D, E, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, J, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, J, K, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  k: Store<K>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
): Store<R>

export function combine(...args: Array<Store<any>>): Store<any> {
  invariant(args.length > 0, 'at least one argument required')
  const handler: Function = (args[args.length - 1]: any)
  const stores = args.slice(0, -1)
  const structStore = createStoreObject(stores)

  return structStore.map(list => handler(...list))
}
