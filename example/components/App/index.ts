import { Component, html } from 'uland';
import { Group, TGroup } from '../Group';
import { StackNames, TStackItem, TStacksState } from '../../store/stackReducer';
import { useSelector } from '../../utils/useSelector';
import { useStyles } from '../../utils/useStyles';

const styles = {
    app: {
        display: 'flex',
    }
}
export const App = Component(() => {
    const s = useStyles(styles);
    const stacks = useSelector((state) => {
        return state.stacks;
    });

    const g1: TGroup = createGroupProps('group 1', [StackNames.stack1], stacks);
    const g2: TGroup = createGroupProps('group 2', [StackNames.stack2], stacks);
    const g3: TGroup = createGroupProps('group 3', [StackNames.stack3, StackNames.stack4], stacks);

    return html`
        <div class=${s.app}>
            ${Group(g1)}
            ${Group(g2)}
            ${Group(g3)}
        </div>
    `;
});

function createGroupProps(groupName: string, stackNames: StackNames[], stacks: TStacksState): TGroup {
    return {
        name: groupName,
        stacks: stackNames.map((stackName) => {
            return {
                name: stackName,
                items: stacks[stackName]
            };
        }),
    }
}