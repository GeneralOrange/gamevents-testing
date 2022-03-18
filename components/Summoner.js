import React from 'react'
import styles from './Summoner.module.css'

export default function Summoner({ data }) {
    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch('/api/fetchSummonerMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await res.text();
        console.log(result);
    }

  return (
    <div className={styles.summoner}>
        <div className={styles.name}>{ data.name }</div>
        <div className={styles.level}>Level: { data.summonerLevel }</div>
        <div className={styles.button} onClick={handleSubmit}>Find recent matches</div>
    </div>
  )
}
