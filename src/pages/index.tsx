/* eslint-disable @typescript-eslint/no-var-requires */
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { Link } from "gatsby"
import { observer } from "mobx-react"
import React, { useEffect } from "react"

import CarouselItem from "../components/CarouselItem/CarouselItem.component"
import WelcomePages from "../layouts/WelcomePages"
import UserStore from "../stores/UserStore"
import * as S from "../styles/index.styles"

const doodle1 = require("../images/doodle1.png")
const doodle2 = require("../images/doodle2.png")
const doodle3 = require("../images/doodle3.png")

const Items = [
  {
    key: 1,
    text: "It's a simple three step process",
    image: doodle1,
  },
  {
    key: 2,
    text: "We capture two photos",
    image: doodle2,
  },
  {
    key: 3,
    text: "And your fit preferences...",
    image: doodle3,
  },
]

function Index() {
  useEffect(() => {
    console.log(UserStore.terms)
    console.log(UserStore.age)
  }, [])

  return (
    <WelcomePages>
      <S.PageWrapper>
        <S.CarouselWrapper>
          <S.CustomCarousel>
            {Items.map(item => {
              return (
                <CarouselItem
                  key={item.key}
                  image={item.image}
                  text={item.text}
                />
              )
            })}
          </S.CustomCarousel>
        </S.CarouselWrapper>
        <S.ButtonWrapper>
          <Link to="/terms-and-conditions">
            <span>
              Get Started&nbsp;
              <ArrowForwardIcon />
            </span>
          </Link>
        </S.ButtonWrapper>
      </S.PageWrapper>
    </WelcomePages>
  )
}

export default observer(Index)
