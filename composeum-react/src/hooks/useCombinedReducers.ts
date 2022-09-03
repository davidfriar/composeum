import { Dispatch } from "react"

const useCombinedReducers = <T, A = any>(
  slices: Record<keyof T, [T[keyof T], Dispatch<A>]>
): [T, Dispatch<A>] => {
  const keys = Object.keys(slices) as Array<keyof T>

  const state: T = keys.reduce(
    (acc, key) => ({ ...acc, [key]: slices[key][0] }),
    {}
  ) as T

  const dispatch = (action: A) => {
    const keys = Object.keys(slices) as Array<keyof T>
    keys.map((key) => slices[key][1]).forEach((fn) => fn(action))
  }

  return [state, dispatch]
}

export default useCombinedReducers
