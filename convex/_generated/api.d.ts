/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as algebraOneCurriculum from "../algebraOneCurriculum.js";
import type * as curriculum from "../curriculum.js";
import type * as eighthGradeCurriculum from "../eighthGradeCurriculum.js";
import type * as fifthGradeCurriculum from "../fifthGradeCurriculum.js";
import type * as firstGradeCurriculum from "../firstGradeCurriculum.js";
import type * as fourthGradeCurriculum from "../fourthGradeCurriculum.js";
import type * as games from "../games.js";
import type * as hello from "../hello.js";
import type * as lib_auth from "../lib/auth.js";
import type * as seventhGradeCurriculum from "../seventhGradeCurriculum.js";
import type * as sixthGradeCurriculum from "../sixthGradeCurriculum.js";
import type * as sync from "../sync.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  algebraOneCurriculum: typeof algebraOneCurriculum;
  curriculum: typeof curriculum;
  eighthGradeCurriculum: typeof eighthGradeCurriculum;
  fifthGradeCurriculum: typeof fifthGradeCurriculum;
  firstGradeCurriculum: typeof firstGradeCurriculum;
  fourthGradeCurriculum: typeof fourthGradeCurriculum;
  games: typeof games;
  hello: typeof hello;
  "lib/auth": typeof lib_auth;
  seventhGradeCurriculum: typeof seventhGradeCurriculum;
  sixthGradeCurriculum: typeof sixthGradeCurriculum;
  sync: typeof sync;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
