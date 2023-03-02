import { useState } from 'react'
import AllQuestion from './components/allQuestion'
import yellowCircle from './assets/yellowCircle.svg'
import blueCircle from './assets/blueCircle.svg'

import './index.css'



function App() {

  const [ isGameStart, setIsGameStart ] = useState<boolean>(false)
  

  function setGameHandle() {
    setIsGameStart(prevStart => !prevStart)
  }

  return (
    <main>
      
      {isGameStart ? 
        <section>
          <AllQuestion setGameHandle={setGameHandle} /> 
        </section>

      : 
      <>
        <img src={yellowCircle} alt="Yellow cricle" className='absolute right-0'/>
            <section className='flex flex-col items-center justify-center h-screen'>
              <h1 className='font-Karla font-bold text-3xl decoration-blackIndigo mb-2'>Quizzical</h1>
              <h3 className='font-Inter text-base decoration-blackIndigo'>A random quiz application</h3>
              <button 
              className='btn mt-7 font-Inter'
              onClick={setGameHandle}
              >
                Start quiz
              </button>
            </section>
        <img src={blueCircle} alt="Blue cricle" className='absolute bottom-0'/>
      </>
      }
      
    </main>
  )
}

export default App
