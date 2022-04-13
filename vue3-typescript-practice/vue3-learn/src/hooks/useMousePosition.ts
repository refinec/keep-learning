import { reactive, onMounted, onUnmounted } from "vue"

function useMousePosition(){
    const position = reactive({
        x: 0,
        y: 0
    });
    function updateMouse(e: MouseEvent) {
        position.x = e.pageX;
        position.y = e.pageY;
    }
    onMounted(() => {
        document.addEventListener("click", updateMouse);
    })
    onUnmounted(() => {
        document.removeEventListener("click", updateMouse);
    })
    return position;
}

export default useMousePosition;