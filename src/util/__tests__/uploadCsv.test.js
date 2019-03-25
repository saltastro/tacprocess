import React from 'react'
import { priorityValue } from '../uploadCsv'

describe('priority value', () => {
  it('Should return value if value is not a number', () => {
    expect(priorityValue('aaa')).toBe('aaa')
    expect(priorityValue(null)).toBe(null)
    expect(priorityValue('a12d')).toBe('a12d')
    expect(priorityValue(undefined)).toBe(undefined)
    expect(priorityValue('12d')).toBe('12d')
  })
  it('should return a number as a string if value can be a number', () => {
    expect(priorityValue('12.0E+4')).toBe('120000')
    expect(priorityValue('12000')).toBe('12000')
  })
})
