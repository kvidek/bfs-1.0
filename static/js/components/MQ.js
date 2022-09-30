import 'ab-interchange';
import abMediaQuery from 'ab-mediaquery';

export default class MQ {

    constructor() {}

    init() {

        AB.plugins.mediaQuery({
            bp: {
                sm:  'screen and (max-width: 480px)',
                md:     'screen and (max-width: 1024px)',
                lg:     'screen and (max-width: 1140px)',
                xl:      'screen and (max-width: 1440px)',
                xxl:      'screen and (min-width: 4000px)'
            }
        });

        if(AB.mediaQuery.is('md') ) {
            document.body.classList.add('is-mobile');
        } else {
            document.body.classList.remove('is-mobile');
        }

        window.addEventListener('changed.ab-mediaquery', () => {
            if(AB.mediaQuery.is('md') ) {
                document.body.classList.add('is-mobile');
            } else {
                document.body.classList.remove('is-mobile');
            }
        });
    }
}
