import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const [inputs, setInputs] = useState({
    summonerName: ''
  });

  const handleResponse = (status, msg) => {
    if (status === 200) {
        setStatus({
            submitted: true,
            submitting: false,
            info: { error: false, msg: msg }
        })
        setInputs({
            summonerName: ''
        })
    } else {
        setStatus({
            info: { error: true, msg: msg }
        })
    }
  }

  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
        ...prev,
        summonerName: e.target.value
    }))
    setStatus({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setStatus(prevSatus => ({ ...prevSatus, submitting: true}))
    const res = await fetch('/api/fetchSummonerName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Gamevents</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Gamevents
        </h1>
        <form onSubmit={handleSubmit}>
          <input type='text' className={styles.input} onChange={handleOnChange}/>
          <button type='submit'>Fetch</button>
        </form>

        {status.info.error && (
          <div variant={'danger'}>Something went wrong</div>
        )}
        {!status.info.error && status.info.msg && (
          <div variant={'success'}>{status.info.msg}</div>
        )}

      </main>
    </div>
  )
}