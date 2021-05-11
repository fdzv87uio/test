import Styled from "styled-components"
import Carousel from "react-material-ui-carousel"

export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    background-color: #FFD733;
    width:100%;
    height:670px;

`

export const CarouselWrapper = Styled.div`

    width: 100%;
    height: 550px;
    border-radius: 0px 0px 15px 15px;
    background-color: #ffffff;
    box-shadow: 0px 20px 15px -15px gray;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;

`
//TODO: Delete this style, it was created for testing purposes only
export const FullPageCanvas = Styled.div`

    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;

`
export const CustomCarousel = Styled(Carousel)`

    width: 100%;
    height: 550px;
    border-radius: 0px 0px 15px 15px;

`

export const ButtonWrapper = Styled.div`

    span{
    font-family: 'Montserrat', sans-serif;
    color: #1958BC;
    font-size: 1.5rem;
    text-decoration: none;
    }
`
