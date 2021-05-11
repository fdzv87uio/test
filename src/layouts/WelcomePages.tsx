import React, { ReactNode } from "react"

function WelcomePages({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        <title>UI-Stack for StyleCard</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
      </head>
      {children}
    </>
  )
}

export default WelcomePages
