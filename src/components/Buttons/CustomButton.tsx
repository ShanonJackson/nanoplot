import React from "react";

type Props = {
    name?: string,
    svg?: SVGSVGElement,
    svgPath?: string,
    variation?: 'plus' | 'minus' | 'home',
    onClick?: () => void,
}

export const CustomButton = (props : Props) => {

    if(props.variation) {
        props = { ...variationProps[props.variation] , ...props }
    }

    var { svgPath , name , svg , onClick } = props
    onClick = onClick ?? (() => {})
    
    return (
        <div className="rounded p-1 m-4 size-fit text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-600 hover:cursor-pointer"
            onClick={() => onClick()}
        >
            {svg??
            svgPath?
                <svg 
                    className="stroke-white size-4">
                    <path d={svgPath}/>
                </svg>
            : <></>}
            {name?
                <div className=''>

                </div>
                :<></>
            }
        </div>
    )

}

const variationProps : Record< NonNullable<Props['variation']> , Exclude<Props,'variation'> > = {
    plus : {    name:'plus' , 
        svgPath: 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' 
    } ,
    minus : {   name: 'minus' ,
        svgPath: 'M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8'
    } ,
    home : {    name: 'home' ,
        svgPath: 'M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z'
    }
}
