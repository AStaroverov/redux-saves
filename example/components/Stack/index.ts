import { Component, html, useCallback } from 'uland';
import { actions, ReducerNames } from '../../store';
import { useDispatch } from '../../utils/useDispatch';
import { useStyles } from '../../utils/useStyles';
import { Button } from '../Button';

export type TStackItem = {
    value: string,
};

const stackStyles = {
    stack: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 300,
        padding: 5,
        border: '1px solid #eee',
        borderTop: 'none',
    },
    item: {
        margin: 5
    },
    name: {
        padding: 10
    }
}

let itemIndex = 0;
export const Stack = Component((stack: ReducerNames, items: TStackItem[]) => {
    const s = useStyles(stackStyles);
    const dispatch = useDispatch();
    const addItem = () => {
        dispatch(actions[stack].add({ value: `item-${itemIndex++}` }));
    };
    return html`
        <div class=${s.stack}>
            ${items.map((item) => StackItem({ class: s.item, stack, item }))}
            ${Button({ children: 'Add Item', onClick: addItem })}
            <div class="${s.name}">
                Reducer: ${stack}
            </div>
        </div>
    `;
});

const stackItemStyles = {
    item: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        padding: 5,
        borderRadius: 4,
        border: '1px solid',

        '&:hover $operations': {
            pointerEvents: 'auto',
            opacity: 1,
        },
    },

    operations: {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0,
    },

    operation: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        padding: 0,
    }
}

export const StackItem = Component((props: { class: string, stack: ReducerNames, item: TStackItem }) => {
    const s = useStyles(stackItemStyles);
    const dis = useDispatch();
    const onDelete = useCallback(() => dis(
        actions[props.stack].delete({ value: props.item.value })
    ));
    const cn = `${s.item} ${props.class}`;

    return html`
        <div class=${cn}>
            ${props.item.value}
            <div class=${s.operations}>
                ${Button({ children: '✖', class: s.operation, onClick: onDelete })}
            </div>
        </div>
    `;
});

