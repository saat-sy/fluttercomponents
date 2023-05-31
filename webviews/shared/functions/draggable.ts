export function draggable(node: HTMLHeadingElement, data: number) {
    let state = data;
    
    node.draggable = true;
    node.style.cursor = 'grab';

    function dragStart(e) {
        e.target.classList.add("dragging");
        e.dataTransfer.setData('text/plain', state);
    }

    node.addEventListener("dragstart", dragStart);

    return {
        update(data: number) {
            state = data;
        },
        destroy() {
            node.removeEventListener('dragstart', dragStart);
        }
    };
}