import { Component, html } from 'uland';
import { createAddSaveAction, createLoadNextSaveAction, createLoadPrevSaveAction } from '../../../src';
import { Stack, TStackItem } from '../Stack';
import { StackNames } from '../../store/stackReducer';
import { useDispatch } from '../../utils/useDispatch';
import { useStyles } from '../../utils/useStyles';
import { Button } from '../Button';

export type TGroup = {
    name: string,
    stacks: {
        name: StackNames,
        items: TStackItem[]
    }[]
};

const styles = {
    group: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 30,
    },
    stacks: {
        display: 'flex',
        margin: 5,
        border: '1px solid #eee',
        borderTop: 'none',
        borderBottom: 'none',

        '& > *': {
            margin: 5,
        }
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        margin: 5,
    }
}

let saveIndex = 0;
export const Group = Component((group: TGroup) => {
    const s = useStyles(styles);
    const dispatch = useDispatch();
    const onsave = () => dispatch(
        createAddSaveAction({ groupKeys: [group.name], saveKey: `my-save-${saveIndex++}` })
    );
    const onloadprev = () => dispatch(createLoadPrevSaveAction());
    const onnextsave = () => dispatch(createLoadNextSaveAction());

    return html`
        <div class=${s.group}>
            <div class=${s.stacks}>
                ${group.stacks.map((stack) => Stack(stack.name, stack.items))}
            </div>
            <div class=${s.name}>
                ${group.name}
            </div>
            <div class=${s.actions}>
                ${Button({ class: s.btn, children: 'Add Save', onClick: onsave })}
                ${Button({ class: s.btn, children: 'Load Prev Save', onClick: onloadprev })}
                ${Button({ class: s.btn, children: 'Load Next Save', onClick: onnextsave })}
            </div>
        </div>
    `;
});
