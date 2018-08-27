import {getSaltAstronomerName, hasLiaison} from '../salt-astronomer';

const SALTAstronomers = [
    {username: 'astro-1', name: 'Astro-1'},
    {username: null, name: 'Astro-2'},
    {username: '', name: 'Astro-3'},
    {username: 'astro-4', name: ''},
    {username: 'astro-5', name: 'Astro-5'},
    {username: 'astro-6', name: null},
];

const proposals = [
  {proposalCode: 'code-1', liaisonAstronomer: 'astro-1'},
  {proposalCode: 'code-2', liaisonAstronomer: null},
  {proposalCode: 'code-3', liaisonAstronomer: undefined},
  {proposalCode: 'code-4'},
  {proposalCode: 'code-5', liaisonAstronomer: ''}
]

describe('get correct name for astronomers', () => {


    it('should be Astro-1', () => {
        expect(getSaltAstronomerName('astro-1', SALTAstronomers)).toBe('Astro-1');
    });

    it('should be null', () => {
        expect(getSaltAstronomerName(null, SALTAstronomers)).toBe(null);
    });

    it('should not be Astro-3', () => {
        expect(getSaltAstronomerName('', SALTAstronomers)).toBe(null);
    });

    it('should be ""', () => {
        expect(getSaltAstronomerName('astro-4', SALTAstronomers)).toBe('');
    });

    it('should be Astro-5', () => {
        expect(getSaltAstronomerName('astro-5', SALTAstronomers)).toBe('Astro-5');
    });

    it('should be null again', () => {
        expect(getSaltAstronomerName('astro-6', SALTAstronomers)).toBe(null);
    })
})

describe( ' checking if proposals has a liaison astronomers', () => {
  it ('should be true if salt astronomer exists', () => {
    expect(hasLiaison('code-1', proposals)).toBe(true)
  })
  it ('should be false if salt astronomer is null undefined or saltAstronomer attribute does not exist', () => {
    expect(hasLiaison('code-2', proposals)).toBe(false)
    expect(hasLiaison('code-3', proposals)).toBe(false)
    expect(hasLiaison('code-4', proposals)).toBe(false)
  })
  it ('should be false if the liaison astronomer has an empty string', () => {
    expect(hasLiaison('code-5', proposals)).toBe(false)
  })
  it ('should be false if proposal code not in proposals', () => {
    expect(hasLiaison('code-6', proposals)).toBe(false)
  })
})