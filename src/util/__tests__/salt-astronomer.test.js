import { getSaltAstronomerName} from "../salt-astronomer";

const SALTAstronomers = [
    {username: 'astro-1', name: 'Astro-1'},
    {username: null, name: 'Astro-2'},
    {username: '', name: 'Astro-3'},
    {username: 'astro-4', name: ''},
    {username: 'astro-5', name: 'Astro-5'},
    {username: 'astro-6', name: null},
];

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
