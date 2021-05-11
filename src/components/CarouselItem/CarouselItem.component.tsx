import React from "react"

import * as S from "./CarouselItem.style"

interface CarouselItemProps {
  text: string
  key: number
  image: any
}

const CarouselItem = ({ image, text, key }: CarouselItemProps) => {
  return (
    <S.Slide key={key} image={image}>
      <S.SlideText>{text}</S.SlideText>
    </S.Slide>
  )
}

export default CarouselItem
