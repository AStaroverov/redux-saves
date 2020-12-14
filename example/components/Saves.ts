import { Component, html, useCallback } from 'uland';
import { createLoadSaveAction, createRemoveSavesAction } from '../../src';
import { useDispatch } from '../utils/useDispatch';
import { useStyles } from '../utils/useStyles';
import { Button } from './Button';

const saveStyles = {
    saves: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
        height: 300,
        padding: 5,
        margin: 5,
        border: '1px solid #eee',
        borderBottom: 'none',
    },
    row: {
        display: 'flex',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        border: '1px solid #eee',
        borderBottom: 'none',
    },
    save: {
        margin: 5
    },
    name: {
        padding: 10
    }
}

export const Saves = Component((props: {
    group: string,
    saves: (string | number)[] | void,
    currentSave: (string | number | void),
    branchSaves: (string | number)[] | void,
}) => {
    const s = useStyles(saveStyles);
    const { group, currentSave, saves, branchSaves } = props;
    const shouldRender = Array.isArray(saves) && Array.isArray(branchSaves);

    return shouldRender ? html`
        <div class=${s.saves}>
            <div class=${`${s.row} ${s.name}`}>
                Current save: ${currentSave ? Save({ group, save: currentSave }) : '-'}
            </div>
            <div class=${s.row}>
                <div class=${s.col}>
                    <div class=${s.name}>All saves</div>
                    ${(saves as (string | number)[])
                        .map((save) => Save({ class: s.save, group, save }))}
                </div>
                <div class=${s.col}>
                    <div class=${s.name}>Branch saves</div>
                    ${(branchSaves as (string | number)[])
                        .map((save) => Save({ class: s.save, group, save }))}
                </div>
            </div>
        </div>
    ` : null;
});

const saveItemStyles = {
    item: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        padding: 5,
        borderRadius: 4,
        border: '1px solid',

        '&:hover $actions': {
            pointerEvents: 'auto',
            opacity: 1,
        },
    },

    actions: {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        opacity: 0,
    },

    action: {
        width: 30,
        height: 30,
        padding: 0,
        marginRight: 2,
    }
}

export const Save = Component((props: { class?: string, group: string, save: string | number | void }) => {
    const s = useStyles(saveItemStyles);
    const dis = useDispatch();
    const onLoad = props.save ? useCallback(() => dis(
        createLoadSaveAction({ groupKeys: [props.group], saveKey: props.save as string | number })
    )) : noop;
    const onRemove = props.save ? useCallback(() => dis(
        createRemoveSavesAction({ groupKeys: [props.group], saveKeys: [props.save as string | number] })
    )) : noop;
    const cn = `${s.item} ${props.class || ''}`;

    return props.save
        ? html`
            <div class=${cn}>
                ${String(props.save).replace('@@REDUX-SAVE@@/', '')}
                <div class=${s.actions}>
                    ${Button({ children: '⤓', title: 'set', class: s.action, onClick: onLoad })}
                    ${Button({ children: '✖', title: 'remove', class: s.action, onClick: onRemove })}
                </div>
            </div>
          `
        : null;
});


const noop = () => {};