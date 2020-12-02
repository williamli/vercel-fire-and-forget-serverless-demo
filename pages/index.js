import { useState } from 'react';

import Head from 'next/head'
import axios from 'axios'

import styles from '../styles/Home.module.css'

export default function Home() {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = () => {
    console.log('calling /api/message-slack...', {message})
    setLoading(true)
    axios.post('/api/message-slack', {
      message
    }).then(function (res) {
      console.log('server response', res.data)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error)
      setLoading(false)
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Fire and Forget Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        

        <p className={styles.description}>
          Send a message to Slack channel:{' '}
          <code className={styles.code}><a href="https://vercel.slack.com/archives/C3UU3UG12" target="_blank">#testing</a></code>
          { loading === false ?
              <>
                <textarea className={styles.textarea} value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                <div className={styles.buttonContainer}>
                  <button onClick={()=>setMessage("")} disabled={message === ""}>Clear</button>
                  <button onClick={()=>sendMessage()} disabled={message === ""}>Send</button>
                </div>
              </>
            : <div className={styles.loading}>Loading...</div>
          }
          
        </p>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
