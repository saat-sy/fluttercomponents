export function dropzone(node: HTMLHeadingElement, options) {
    let state = {
        dropEffect: 'move',
        dragOverClass: 'droppable',
        ...options
    };

    function dragEnter(e) {
        e.target.classList.add(state.dragOverClass);
    }

    function dragLeave(e) {
        e.target.classList.remove(state.dragOverClass);
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = state.dropEffect;
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        e.target.classList.remove(state.dragOverClass);
        console.log(state.index);
        state.onDropped(Number(data), state.index, e);
    }

    node.addEventListener("dragenter", dragEnter);
    node.addEventListener('dragleave', dragLeave);
    node.addEventListener('dragover', dragOver);
    node.addEventListener('drop', drop);   

    return {
        update(options) {
            state = {
                dropEffect: 'move',
                dragOverClass: 'droppable',
                ...options
            };
        },
        destroy() {
            node.removeEventListener('dragenter', dragEnter);
            node.removeEventListener('dragleave', dragLeave);
            node.removeEventListener('dragover', dragOver);
            node.removeEventListener('drop', drop);
        }
    };
}