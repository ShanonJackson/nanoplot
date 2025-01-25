import React , {ComponentProps} from "react";
import { CustomButton } from "../Buttons/CustomButton";

import { Worldmap } from "@/export";
import { SliderControl } from "../Docs/Control/components/SliderControl/SliderControl";

type Props = {
    graphType?: 'WorldMap' | 'XYGraph' ,
    translate: ComponentProps<typeof Worldmap>['translate'] ,
    onChange: (translate: ComponentProps<typeof Worldmap>['translate']) => void 
}

export const NavControls = ({ graphType, translate, onChange }: Props) => {
    

    return (
        <div className="flex-row m-4 w-20 absolute top-2 right-2">
            <SliderControl value={translate?.scale ?? 0} vertical={true}
                onChange={(value) => onChange({ x:0 , y:0 , ...translate , scale: +value })}
                //description={"zoom"}
            />
            <div className="flex-col m-0">
                <CustomButton variation="plus" 
                    onClick={ () => onChange({ x:0 , y:0 , ...translate, scale: (translate?.scale ?? 0) + 1 }) } 
                />
                <CustomButton variation="home" 
                    onClick={ () => onChange({ y: 0, scale: 0, x: 0 }) } 
                />
                <CustomButton variation="minus" 
                    onClick={ () => onChange({ x:0 , y:0 , ...translate, scale: (translate?.scale ?? 0) - 1 }) } 
                />
            </div>
        </div>
    )

}