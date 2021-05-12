import Styled from "styled-components"
import { Camera } from "react-cam"

interface CameraProps {
  x: string
  y: string
  width: string
  height: string
}

export const CustomCamera = Styled(Camera)<CameraProps>`

    position: absolute;
    left: ${props => props.x};
    top: ${props => props.y};
    width:${props => props.width};
    height:${props => props.height};


`

interface CanvasProps {
  x: string
  y: string
  width: string
  height: string
}

export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    background-color: #FFD733;
    width:400px;
    height:800px;



`
