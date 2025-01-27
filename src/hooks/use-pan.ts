import { ComponentProps, useState } from "react";

import { Worldmap } from "@/components/Worldmap/Worldmap";

type useDragProps = {
    translate: ComponentProps<typeof Worldmap>['translate'];
    setTranslatePartial: Function
}

export const usePan = ({translate = { x: 0 , y: 0 , scale: 0 } , setTranslatePartial} : useDragProps) : Object => {
    const [dragging, setDragging] = useState<{ prev: { x: number , y: number } } | undefined>(undefined);
    
    return ({
        onMouseDown: (e: MouseEvent) => { 
            setDragging({ prev: { x: e.clientX , y: e.clientY } })
        } ,
        onMouseUp: (e: MouseEvent) => { 
            setDragging(undefined)
        } ,
        onMouseLeave: (e: MouseEvent) => {
            setDragging(undefined)
        } ,
        onMouseMove: (e: MouseEvent) => { 
            if(dragging === undefined) return
            setDragging({ prev: { x: e.clientX , y: e.clientY } })
            setTranslatePartial({
                    x: translate.x + e.clientX - dragging.prev.x , 
                    y: translate.y + e.clientY - dragging.prev.y , 
            })
        } ,
    })

}
