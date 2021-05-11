import Styled from "styled-components";
import { Paper } from "@material-ui/core";

interface slideProps {
    image: any;
  }

export const Slide = Styled(Paper)<slideProps>`

    width: 100%;
    height: 470px;
    border-radius: 0px 0px 15px 15px;
    background-image: url(${(props) => props.image});
    background-repeat: no-repeat;
    background-position: center; 
    box-shadow: none !important;
    
`;

export const SlideText = Styled.div`

    font-family: 'Montserrat', sans-serif;
    color: #1958BC;
    font-size: 1.5rem;
    margin: 40px 25px 0px 25px;

`;
