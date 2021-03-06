import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { Col, Container, Form, Row } from "react-bootstrap"
import './PaymentForm.css'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#ffff",
            color: "#ffff",
            fontWeight: 500,
            fontFamily: "Raleway",
            fontSize: "18px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#ffff" },
            "::placeholder": { color: "#ffff" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }

    }
}

const PaymentForm = () => {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:5005/api/payment/checkout", {
                    amount: 99000,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className='mb-3' md={{ span: 6, offset: 3 }}>
                        {!success ?
                            <Form onSubmit={handleSubmit}>
                                <fieldset className="FormGroupStripe">
                                    <div className="FormRowStripe">
                                        <CardElement options={CARD_OPTIONS} />
                                    </div>
                                </fieldset>
                                <button className="stripeBtn">Pay</button>
                            </Form>
                            :
                            <div>
                                <h5>You just bought an amazing experience!</h5>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PaymentForm