interface TreeModel {
    component: ComponentModel,
    index: Array<number>,
    children: TreeModel[],
};