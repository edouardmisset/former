import { z } from 'zod'

export const frenchGradeRegEx = /^\d{1}([abc]|[ABC]){1}\+?$/

const grades = [
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
] as const

export const gradeSchema = z.enum(grades)

export type Grade = z.infer<typeof gradeSchema>

export const GRADE_TO_NUMBER: Record<Grade, number> = {
  '6c': 11,
  '6c+': 12,
  '7a': 13,
  '7a+': 14,
  '7b': 15,
  '7b+': 16,
  '7c': 17,
  '7c+': 18,
  '8a': 19,
  '8a+': 20,
  '8b': 21,
  '8b+': 22,
} as const

export const NUMBER_TO_GRADE: Record<number, Grade> = Object.fromEntries(
  Object.entries(GRADE_TO_NUMBER).map(([grade, number]) => ([number, grade] as [number, Grade])),
)

export const convertAscentGradeToNumber = (grade: Grade): number =>
  GRADE_TO_NUMBER[grade]

export const convertNumberToAscentGrade = (gradeNumber: number): Grade =>
  NUMBER_TO_GRADE[gradeNumber]
