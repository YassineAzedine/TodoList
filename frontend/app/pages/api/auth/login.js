import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      const response = await axios.post('http://localhost:4040/auth/login', { email, password })
      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
