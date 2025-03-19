import React, { useEffect, useState } from 'react'

function Countdown({time}) {

    const [currentTime, setCurrentTime] = useState(Date.now());

    const timeLeft = time - currentTime;

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
    const hours = Math.floor((timeLeft / 1000 / 60 / 60))

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now())
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    if (timeLeft <= 0) {
        return null;
    }

  return (
    <div className='de_countdown'>{ hours + 'h ' + minutes + "m " + seconds + 's' }</div>
  )
}

export default Countdown