import { Component, html } from 'uland';
import { Group, TGroup } from '../Group';
import { useSelector } from '../../utils/useSelector';
import { useStyles } from '../../utils/useStyles';
import { ReduceGroups, ReducerNames, TState } from '../../store';

const styles = {
    app: {
        display: 'flex',
    }
}
export const App = Component(() => {
    const s = useStyles(styles);
    const state = useSelector((state) => state);

    const g1: TGroup = createGroupProps(ReduceGroups.group1, [ReducerNames.stack1], state);
    const g2: TGroup = createGroupProps(ReduceGroups.group2, [ReducerNames.stack2], state);
    const g3: TGroup = createGroupProps(ReduceGroups.group3, [ReducerNames.stack3, ReducerNames.stack4], state);

    return html`
        <div class=${s.app}>
            ${Group(g1)}
            ${Group(g2)}
            ${Group(g3)}
        </div>
    `;
});

function createGroupProps(groupName: string, reducerNames: ReducerNames[], state: TState): TGroup {
    return {
        name: groupName,
        stacks: reducerNames.map((reducerName) => {
            return {
                name: reducerName,
                items: state[reducerName]
            };
        }),
    }
}