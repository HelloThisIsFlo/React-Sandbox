import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import MagicLink from './MagicLink';
import * as React from 'react';

describe('Magic Link', () => {
    let link: ReactWrapper | ShallowWrapper;

    const NORMAL = 'magic-link-normal';
    const HOVERED = 'magic-link-hover';

    beforeEach(() => {
        link = shallow((
            <MagicLink>Hello</MagicLink>
        ));
    });

    it('contains text', () => {
        expect(link.text()).toContain('Hello');
    });

    describe('Hovered', () => {
        beforeEach(() => {
            link.simulate('mouseenter');
        });

        it(`uses the '${HOVERED}' class`, () => {
            expect(link.find('a').hasClass(HOVERED)).toBeTruthy();
        });
    });

    describe('Hovered then Leave', () => {
        beforeEach(() => {
            link.simulate('mouseenter');
            link.simulate('mouseleave');
        });

        it(`uses the '${NORMAL}' class`, () => {
            expect(link.find('a').hasClass(NORMAL)).toBeTruthy();
        });
    });

});