import { Component, html, useCallback } from "uland";
import { useStyles } from "../../utils/useStyles";

const styles = {
    btn: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        background: '#5e99cf',
        borderRadius: 4,
    }
}

export const Button = Component((props: {
    class?: string,
    children?: any,
    onClick?: VoidFunction
}) => {
    const s = useStyles(styles);
    const onclick = props.onClick ? useCallback(props.onClick) : undefined;
    const className = `${s.btn} ${props.class}`;

    return html`
        <div class="${className}" onclick=${onclick}>
            ${props.children}
        </div>
    `;
});