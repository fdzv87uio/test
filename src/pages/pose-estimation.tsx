import React, { useEffect, useRef, useState } from "react"
// Netpose tensor flow dependencies
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import "@tensorflow/tfjs-backend-webgl"
// import { Camera } from "react-camera-pro"
import * as S from "../styles/pose_estimation.styles"
import WelcomePages from "../layouts/WelcomePages"
import { observer } from "mobx-react"
// import UserStore from "../stores/UserStore"
import { drawKeypoints, drawPoint } from "../utils/tensorflow-utils"
import useDimensions from "react-use-dimensions"
import UserStore from "../stores/UserStore"

const PoseEstimation = observer(() => {
  //to be run on load
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined" 
    ) {
      runPosenet()
    }
  }, [])
  // refs for both the webcam and canvas components
  const camRef = useRef(null)
  const canvasRef = useRef(null)
  const targetsRef = useRef(null)

  // //load rotation coordinates

  // // // load and run posenet function

  async function runPosenet() {
    const net = await posenet.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: 257,
      multiplier: 0.5,
    })

    setInterval(() => {
      detect(net)
    }, 1000)
  }

  const detect = async net => {
    if (
      typeof camRef.current !== "undefined" &&
      camRef.current !== null &&
      typeof camRef.current.camRef.current !== "undefined" &&
      camRef.current.camRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = camRef.current.camRef.current
      const videoWidth = camRef.current.camRef.current.width
      const videoHeight = camRef.current.camRef.current.height

      // Make detections
      const pose = await net.estimateSinglePose(video)
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
      console.log(pose)
      //detect if the current pose is aligned with the target area to fire screen capture

      const rightWrist = pose.keypoints[10]
      const x = rightWrist.position.x
      const y = rightWrist.position.y
      if (x >= 100 && x <= 160 && y >= 100 && y <= 160) {
        camRef.current.capture()
      }
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    if (typeof pose !== "undefined") {
      const ctx = canvas.current.getContext("2d")
      canvas.current.width = videoWidth
      canvas.current.height = videoHeight
      var kp = pose["keypoints"]
      drawKeypoints(kp, 0.35, ctx)
    }
  }

  // draw targets to enable screen capture
  const drawTarget = () => {
    if (targetsRef.current !== null) {
      const ctx = targetsRef.current.getContext("2d")
      targetsRef.current.width = width
      targetsRef.current.height = height
      drawPoint(ctx, 100, 100, 60, "green")
    }
  }

  function capture(imgSrc) {
    UserStore.setScreenCapture(imgSrc)
    console.log(imgSrc)
  }

  const [ref, { x, y, width, height }] = useDimensions()

  drawTarget()

  return (
    <WelcomePages>
      <S.PageWrapper ref={ref}>
        {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined" &&
        typeof width !== "undefined" &&
        typeof height !== "undefined" ? (
          <S.CustomCamera
            capture={capture}
            ref={camRef}
            front={false}
            width={width}
            height={height}
          />
        ) : null}
        {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined" &&
        typeof width !== "undefined" &&
        typeof height !== "undefined" ? (
            <canvas
              id="keypoints"
              ref={canvasRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                zIndex: 99,
              }}
              width={width}
              height={height}
            ></canvas>
        ) : null}
        <canvas
          id="targets"
          ref={targetsRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            zIndex: 18,
          }}
          width="100%"
          height="800px"
        ></canvas>
      </S.PageWrapper>
    </WelcomePages>
  )
})

export default PoseEstimation
