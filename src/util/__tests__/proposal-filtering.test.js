import {isLiaisonAstronomerUpdated} from '../proposal-filtering'

const proposals = [
  {
    proposalCode: 'code-1',
    liaisonAstronomer: 'astro-1'
  },
  {
    proposalCode: 'code-2',
    liaisonAstronomer: 'astro-1'
  },
  {
    proposalCode: 'code-3',
    liaisonAstronomer: 'astro-2'
  },
  {
    proposalCode: 'code-4',
    liaisonAstronomer: 'astro-3'
  },
  {
    proposalCode: 'code-5',
    liaisonAstronomer: null
  },
  {
    proposalCode: 'code-6',
    liaisonAstronomer: undefined
  },
  {
    proposalCode: 'code-7',
  }

]

describe('get correct name for astronomers', () => {


  it('should be false if L.A did not change', () => {
    const proposal = {proposalCode: 'code-1', liaisonAstronomer: 'astro-1'}
    expect(isLiaisonAstronomerUpdated(proposal, proposals)).toBe(false)
  })

  it('should be true if L.A did change', () => {
    const proposal1 = {proposalCode: 'code-2', liaisonAstronomer: 'astro-2'}
    expect(isLiaisonAstronomerUpdated(proposal1, proposals)).toBe(true)
    const proposal2 = {proposalCode: 'code-3', liaisonAstronomer: 'astro-3'}
    expect(isLiaisonAstronomerUpdated(proposal2, proposals)).toBe(true)
  })

  it('should be true if assign new LA', () => {
    const proposal = {proposalCode: 'code-5', liaisonAstronomer: 'astro'}
    const proposal2 = {proposalCode: 'code-6', liaisonAstronomer: 'astro'}
    const proposal3 = {proposalCode: 'code-7', liaisonAstronomer: 'astro'}
    expect(isLiaisonAstronomerUpdated(proposal, proposals)).toBe(true)
    expect(isLiaisonAstronomerUpdated(proposal2, proposals)).toBe(true)
    expect(isLiaisonAstronomerUpdated(proposal3, proposals)).toBe(true)

  })

})
