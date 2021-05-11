import React, { useState } from "react"
import * as S from "../styles/terms_and_conditions.styles"
import WelcomePages from "../layouts/WelcomePages"
import WhiteHeader from "../components/white-header/white-header.component"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Collapse from "@material-ui/core/Collapse"
import Alert from "@material-ui/lab/Alert"
import { navigate } from "gatsby"

import UserStore from "../stores/UserStore"

const TermsAndConditions = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>()
  const [terms, setTerms] = useState(false)
  const [age, setAge] = useState(false)

  const validateInputs = () => {
    if (terms == false) {
      setAlertMessage("Error: you must agree with our terms and conditions")
      setShowAlert(true)
      return
    } else if (age == false) {
      setAlertMessage("Error: you must be at least 18 years of age to enter")
      setShowAlert(true)
      return
    } else {
      UserStore.setAge(age)
      UserStore.setTerms(terms)
      navigate("/pose-estimation")
    }
  }

  return (
    <WelcomePages>
      <S.PageWrapper>
        <WhiteHeader url={"/"} />
        <Collapse in={showAlert}>
          <Alert
            onClose={() => {
              setShowAlert(false)
            }}
            variant="filled"
            severity="error"
          >
            {alertMessage}
          </Alert>
        </Collapse>
        <S.LogoContainer>
          <img src="/assets/images/logo.png" alt="Picture of the author" />
        </S.LogoContainer>
        <S.FormWrapper>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={() => {
                    if (terms == false) {
                      setTerms(true)
                    } else {
                      setTerms(false)
                    }
                  }}
                  name="terms-and-conditions"
                />
              }
              label={
                <p>
                  I agree to the <a href="#">terms and conditions</a>
                </p>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={() => {
                    if (age == false) {
                      setAge(true)
                    } else {
                      setAge(false)
                    }
                  }}
                  name="age"
                />
              }
              label={<p>I am 18 years of age or older</p>}
            />
          </FormGroup>
        </S.FormWrapper>
        <S.CustomButton
          onClick={() => {
            validateInputs()
          }}
          variant="contained"
          color="primary"
        >
          Next
        </S.CustomButton>
      </S.PageWrapper>
    </WelcomePages>
  )
}

export default TermsAndConditions
