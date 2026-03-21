'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from "@mui/material"

export default function Card({massageshopName, imgSrc, rating, onRatingChange} : 
    {massageshopName:string, imgSrc:string, rating?:number, onRatingChange?:(value:number)=>void}) {

    return (
        <InteractiveCard contentName={massageshopName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc} alt='Product Picture' fill={true} className='object-cover rounded-t-lg'/>
            </div>

            <div className='w-full h-[15%] p-[10px]'>{massageshopName}</div>

            {rating !== undefined && (
                <Rating value={rating}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(event, newValue) => {if(newValue != null && onRatingChange) {
                        onRatingChange(newValue)
                    }}}
                    id={massageshopName + " Rating"}
                    name={massageshopName + " Rating"}
                    data-testid={massageshopName + " Rating"}
                />
            )}
        </InteractiveCard>
    )
}
