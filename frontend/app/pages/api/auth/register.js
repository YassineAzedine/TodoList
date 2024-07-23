import axios from 'axios'

export default async function handler(req, res) {

    const { email, password , username} = req.body
    try {
      const response = await axios.post('http://localhost:4040/api/auth/register', {username ,  email, password  })
      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to register' })
    }
 
}
