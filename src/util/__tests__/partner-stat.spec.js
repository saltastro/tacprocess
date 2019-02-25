import { totalPriority, statusPriority } from '../partner-stat'

const blocks0 = []
const blocks1 = [
  {id: 'ID1-1', name: 'Block1-1', priority: 1, status: 'Active'}
]
const blocks2 = [
  {id: 'ID2-1', name: 'Block2-1', priority: 4, status: 'Completed'},
  {id: 'ID2-2', name: 'Block2-2', priority: 2, status: 'Active'}
]
const blocks3 = [
  {id: 'ID3-1', name: 'Block3-1', priority: 1, status: 'Superseded'},
  {id: 'ID3-2', name: 'Block3-2', priority: 3, status: 'Deleted'},
  {id: 'ID3-3', name: 'Block3-3', priority: 3, status: 'Superseded'},
  {id: 'ID3-4', name: 'Block3-4', priority: 2, status: 'Deleted'}
]

describe('returned values for the totalPriority function', () => {
  it('Should return zero', () => {
    expect(totalPriority(blocks0, 1)).toBe('0.00')
  })
  
  it('Should return 100.00', () => {
    expect(totalPriority(blocks1, 1)).toBe('100.00')
  })
  
  it('Should return 100.00', () => {
    expect(totalPriority(blocks2, 1)).toBe('0.00')
  })
  
  it('Should return 75.00', () => {
    expect(totalPriority(blocks3, 3)).toBe('50.00')
  })
})

describe('returned values for the statusPriority function', () => {
  it('Should return zero', () => {
    expect(statusPriority(blocks0, 1, '')).toBe('0.00')
  })
  
  it('Should return 0.00', () => {
    expect(statusPriority(blocks1, 1, 'Completed')).toBe('0.00')
  })
  
  it('Should return 100.00', () => {
    expect(statusPriority(blocks2, 4, 'Completed')).toBe('100.00')
  })
  
  it('Should return 100.00', () => {
    expect(statusPriority(blocks3, 3, 'Superseded')).toBe('50.00')
  })
})