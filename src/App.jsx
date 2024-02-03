import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")
  //REFF hook
  const passwordRef=useRef(null)

//Password Generator Function

const passwordGenerator =useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllowed) str+="0123456789"
//May have error due to ""''
  if(charAllowed) str+="!@#$%^&*()-=_+[]{}|;:',.<>?/"

  for (let i = 1; i < length; i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
1   
  }
  setPassword(pass)

},[length,numAllowed,charAllowed,setPassword])

const copyPasswordtoClipboard=useCallback(()=>{
  passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=> {
  passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator] )
  return (
    
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordtoClipboard}>
        Copy
        </button>
      </div>
      <div className='=flex tex-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={80}
          value={length}
          className='cussor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {
              setNumAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
     </div>
   
  )
}

export default App
