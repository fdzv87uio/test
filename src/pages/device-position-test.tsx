import React, { useEffect, useRef, useState } from "react"
import { Canvas } from "../components/Canvas/Canvas.component";
import { OrientationAxis } from "../components/OrientationAxis/OrientationAxis.component";
import useDimensions from "../hooks/use-dimensions";
import * as S from "../styles/index.styles"
import { Button } from "@material-ui/core";

export class DeviceOrientationInfo {
    absolute: boolean = false;
    alpha: number | null = null;
    beta: number | null = null;
    gamma: number | null = null;
}

export default function DevicePositionTest() {
    const [ref, { width, height, dpr }] = useDimensions();
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationInfo>();

    function grantPermissionForDeviceOrientation() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        setPermissionGranted(true);
                        window.addEventListener('deviceorientation', handleDeviceOrientationEvent);
                    }
                })
                .catch(console.error);
        } else {
            // handle regular non iOS 13+ devices
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleDeviceOrientationEvent);
        }
    }

    function handleDeviceOrientationEvent(ev: DeviceOrientationEvent) {
        setDeviceOrientation({
            absolute: ev.absolute,
            alpha: ev.alpha,
            beta: ev.beta,
            gamma: ev.gamma
        })
    }

    return permissionGranted ? (
        <>
            <S.FullPageCanvas ref={ref}>
                {width === undefined || height === undefined || dpr === undefined ? (
                    <div>{"🤔"}</div>
                ) : (
                    <Canvas width={width} height={height} dpr={dpr} isAnimating={true}>
                        <OrientationAxis beta={deviceOrientation?.beta} gamma={deviceOrientation?.gamma}></OrientationAxis>
                    </Canvas>
                )}
            </S.FullPageCanvas>
        </>
    ): <>
    <Button onClick={grantPermissionForDeviceOrientation}>Authorize Orientation</Button>
    </>;
};