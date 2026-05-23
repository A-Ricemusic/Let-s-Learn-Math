import { Effect } from "effect";

export function runEffect<A>(program: Effect.Effect<A, Error, never>) {
  return Effect.runPromise(program);
}
