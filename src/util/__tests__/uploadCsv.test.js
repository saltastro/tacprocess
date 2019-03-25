import React from 'react'
import { checkColumns, getIndexOfColumns, priorityValue } from '../uploadCsv'

describe('check columns', () => {
  it('Should return true if p0 to p4 proposal code and tac comment  columns exist else false', () => {
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposalcode', 'tac comment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposalCode', 'tac comment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'code', 'tac comment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposal code', 'tac comment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'code', 'tac comment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'code', 'tacComment'])).toBeTruthy()
   expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'code', 'taccomment'])).toBeTruthy()
  })
  it('Should return false if any of p0 to p4 proposal code and tac comment  columns are missing', () => {
    expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposalcode'])).toBeFalsy()
    expect(checkColumns(['p1', 'p2', 'p3', 'p4', 'proposalCode', 'tac comment'])).toBeFalsy()
    expect(checkColumns(['p0', 'p1', 'p2', 'any', 'p4', 'proposal code', 'tac comment'])).toBeFalsy()
    expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4',  'tacComment'])).toBeFalsy()
  })
  it('Should return true additional columns', () => {
    expect(checkColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposalcode', 'tac comment', 'any'])).toBeTruthy()
    expect(checkColumns(['p0', 'something', 'p1', 'p2', 'p3', 'p4', 'proposalCode', 'tac comment'])).toBeTruthy()
  })
})

describe('check columns', () => {
  it('Should return index of p0 to p4 proposal code and tac comment  columns in the array', () => {
    expect( getIndexOfColumns(['p0', 'p1', 'p2', 'p3', 'p4', 'proposalcode', 'tac comment'])).toEqual(
      {"P0": 0, "P1": 1, "P2": 2, "P3": 3, "P4": 4, "proposalCode": 5, "tacComment": 6}
      )
    expect( getIndexOfColumns(['p0', 'p2', 'p3', 'proposalcode', 'tac comment', 'p1', 'p4',])).toEqual(
      {"P0": 0, "P1": 5, "P2": 1, "P3": 2, "P4": 6, "proposalCode": 3, "tacComment": 4}
    )
    expect( getIndexOfColumns(['proposalcode', 'p4','p0', 'p1', 'p2', 'p3',  'tac comment'])).toEqual(
      {"P0": 2, "P1": 3, "P2": 4, "P3": 5, "P4": 1, "proposalCode": 0, "tacComment": 6}

    )
    expect(getIndexOfColumns(['p0', 'something', 'p1', 'p2', 'p3', 'p4', 'proposalCode', 'tac comment'])).toEqual(
      {"P0": 0, "P1": 2, "P2": 3, "P3": 4, "P4": 5, "proposalCode": 6, "tacComment": 7}
    )
  })
})


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
