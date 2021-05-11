import React from "react"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import * as S from "./white-header.styles"
import { Link } from "gatsby"

function WhiteHeader({ url } : { url: string}) {
  return (
    <S.HeaderWrapper>
      <Link to={url}>
        <a>
          <ArrowBackIcon style={{ color: "#1958BC", fontSize: "inherit" }} />
        </a>
      </Link>
    </S.HeaderWrapper>
  )
}

export default WhiteHeader
