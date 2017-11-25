import * as React from 'react';
import './MagicLink.css';

const STATUS = {
    HOVERED: 'magic-link-hover',
    NORMAL: 'magic-link-normal',
};

interface MagicLinkProps {
    href?: string;
}
interface MagicLinkState extends MagicLinkProps {
    class: string;
}
export default class MagicLink extends React.Component<MagicLinkProps, MagicLinkState> {

    constructor(props: MagicLinkProps) {
        super(props);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.state = {
            class: STATUS.NORMAL
        };
    }

    render() {
        return (
            <a
                className={this.state.class}
                href={this.props.href || '#'}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {this.props.children}
            </a>
        );
    }

    private onMouseEnter() {
        this.setState({ class: STATUS.HOVERED });
    }

    private onMouseLeave() {
        this.setState({ class: STATUS.NORMAL });
    }

}
