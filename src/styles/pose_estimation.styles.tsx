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

    .camera-focus{
        border: none;
    }

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
    width:100%;
    height:800px;

    .camera-focus{
        border: none;
    }


`

export const CameraFeed = Styled.img`

    width: 600px;
    height: 600px;
`
