import './ExperienceMenu.css'
import { useContext, useEffect, useState } from 'react'
import experiencesService from '../../services/experiences.service'
import { AuthContext } from './../../context/auth.context'
import ExperienceCard from './../../components/ExperienceCard/ExperienceCard'
import Loader from './../../components/Loader/Loader'
import { Row, Col, Container } from 'react-bootstrap'

const ExperienceMenu = () => {

    const [experiences, setExperiences] = useState([])


    useEffect(() => loadExperiences(), [])

    const loadExperiences = () => {
        experiencesService
            .getAllExperiences()
            .then(({ data }) => {
                setExperiences(data)
            })
            .then(err => console.log(err))
    }

    const { isLoggedIn } = useContext(AuthContext)

    return (
        experiences.length
            ?
            <Container>

                <Row>
                    <h4 className='experiencemenutitle'>Fall in love with our experiences</h4>
                    {
                        experiences.slice(0, 4).map(experience => {
                            return (
                                <Col md={3} key={experience._id}>
                                    <ExperienceCard {...experience} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </Container>
            :
            <Loader />
    )
}

export default ExperienceMenu