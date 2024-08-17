import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [symbolAllowed, setSymbolAllowed]=useState(false)
  const [password, setPassword]=useState('')

  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passRef.current?.select()
  }
  const passRef=useRef(null)
  const generatePass=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(symbolAllowed)str+="!@#$%^&*()_+"
    for(let i=1;i<=length;i++){
     const ind=Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(ind)
    }
    setPassword(pass)
  },[length,numberAllowed,symbolAllowed])

useEffect (()=>{
  generatePass()
},[length,numberAllowed,symbolAllowed,])

  return (
    <>
      <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-4 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-centre my-3 text-2xl font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 font-medium'>
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPassword}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-centre gap-x-1'>
            <input type="range"
            min={8}
            max={25}
            value={length}
            className='cursor-pointer' 
            onChange={(e)=>setLength(e.target.value)}
            name=''
            id=''
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=>setNumberAllowed((prev)=>!prev)}
            name="" 
            id="numericInput" 
            />
            <label htmlFor="number">Numericals</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input type="checkbox" 
            defaultChecked={symbolAllowed}
            onChange={()=>setSymbolAllowed((prev)=>!prev)}
            name="" 
            id="symbolInput" 
            />
            <label htmlFor="symbol">symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
