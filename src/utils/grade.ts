import { z } from "zod"

export const currentHighestDegree = 9

export const createFrenchGradeRegEx = (start = 1, end = 9) => {
  if (end < start) throw new Error("'End' must be greater than 'start'")

  const numberRegExp = end === 10 ? `^([${start}-9]|10)` : `^[${start}-${end}]`
  return new RegExp(`${numberRegExp}([abcABC]){1}\\+?$`)
}

export const degreeSchema = z.number().int().positive().max(currentHighestDegree)
export type Degree = z.infer<typeof degreeSchema>

export const letterSchema = z.enum(['a', 'b', 'c'])
export type RouteGradeLetter = z.infer<typeof letterSchema>
type BoulderGradeLetter = Uppercase<RouteGradeLetter>
type Letter = BoulderGradeLetter | RouteGradeLetter

export const maybePlusSchema = z.enum(['', '+'])
export type OptionalPlus = z.infer<typeof maybePlusSchema>


const gradeSchema = z.custom<`${Degree}${Letter}${OptionalPlus}`>(val => createFrenchGradeRegEx().test(val as string))
export type Grade = z.infer<typeof gradeSchema>




