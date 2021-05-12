import Styled from "styled-components"
import { Camera } from "react-cam"

interface CameraProps {
  width: string
  height: string
}

export const CustomCamera = Styled(Camera)<CameraProps>`

    position: absolute;
    left: 0;
    top: 0;
    width:${props => props.width};
    height:${props => props.height};


`


export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    background-color: #FFD733;
    width:100%;
    height:900px;



`
