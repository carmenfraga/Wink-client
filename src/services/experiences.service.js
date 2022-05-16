import axios from 'axios'

class ExperiencesService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/experience` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createOneExperience = data => {
        return this.api.post('/create', data)
    }

    getAllExperiences = () => {
        return this.api.get('/list')
    }

    getOneExperience = _id => {
        return this.api.get(`/${_id}`)
    }

    deleteOneExperience = id => {
        return this.api.delete(`/${id}/delete`)
    }

    updaOneExperience = (id, experienceData) => {
        return this.api.put(`/${id}/edit`, experienceData)
    }
}

const experiencesService = new ExperiencesService()
export default experiencesService
