import Styled from "styled-components"
import Button from "@material-ui/core/Button"

export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    background-color: #FFCD00;
    width:100%;
    height:670px;

`

export const LogoContainer = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    width:100%;
    height:150px;

`

export const FormWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    width:90%;

    p{
    font-family: 'Montserrat', sans-serif;
    color: #000000;
    font-size: 0.8rem;
    }

    a{
    font-family: 'Montserrat', sans-serif;
    color: #000000;
    font-size: 0.8rem;
    text-decoration: underline;
    }

    svg{
        background: #ffffff!important;
      } 


`

export const CustomButton = Styled(Button)`
    font-family: 'Montserrat', sans-serif;
    color: #000000;
    font-size: 1.3rem;
    width: 90%;
    height: 40px;
`
