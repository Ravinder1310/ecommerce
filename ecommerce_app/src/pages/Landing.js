import React from 'react'
import Layout from '../components/layouts/Layout';
import { useAuth } from '../context/auth';

const Landing = () => {
  const [auth, setAuth] = useAuth()
  return (
    <div>
        <Layout>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    </div>
  )
}

export default Landing