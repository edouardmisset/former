import { describe, expect, it } from 'bun:test'
import { createFrenchGradeRegEx, currentHighestDegree } from './grade'

describe('Grade Regexp', () => {
  it('should pass for valid grades', () => {
    const validGrades = ['1b', '2c', '3a+', '6b', '7c+', '8b+', '8A', '9c+', '9A']

    expect(validGrades.every(test =>
      createFrenchGradeRegEx(1, currentHighestDegree).test(test),
    )).toBe(true)
  })

  it('should fail for invalid grades', () => {
    const invalidGrades = [
      '',
      '0+',
      '0a',
      '0A',
      '1',
      'A',
      'b',
      '2a++',
      '3a-',
      '04a',
      '04B+',
      '5f',
      '6BC',
      '7BC+',
      '8z',
      '10a',
      '11a',
    ]

    expect(invalidGrades.every(
      test => createFrenchGradeRegEx(1, currentHighestDegree).test(test),
    )).toBe(false)

  })
})