import React, { useEffect, useRef, useState, ReactElement } from 'react'
import './App.css'

function App() {
  const buttonRef = useRef(null);
  const buttonChangeRef = useRef(null);
  const initialRef = useRef(null);
  const colorChangeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [message, setMessage] = useState('');
  const [updatedMessage, setUpdatedMessage] = useState(message)

  const [isDisabled, setIsDisabled] = useState(true);

  const [total, setTotal] = useState(0);

  const [color, setColor] = useState('');
  const [divList, setDivList] = useState<ReactElement[]>([]);
  const [isAddDivDisabled, setIsAddDivDisabled] = useState(false);

  const [changeCount, setChangeCount] = useState(0);
  const [changingInput, setChangingInput] = useState('');
  const [initialPageLoad, setInitialPageLoad] = useState(0);

  const [initialCount, setInitialCount] = useState(0);
  const [changingInitialInput, setChangingInitialInput] = useState('');

  const [changeWords, setChangeWords] = useState('Add Color')

  const handleChange = (event) => {
    event.preventDefault();

    setMessage(event.target.value)
  }

  const handleSaveClick = () => {
    setUpdatedMessage(message);

    buttonRef.current.focus();
    
    setMessage('')
  }

  const handleDisabledButton = () => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false)
    }, 5000)
  }

  const handleCount = () => {
    setTotal(total + 1)
  }

  const randomColor = () => {
    const randomColorNumber = Math.floor(Math.random() * 16777215).toString(16);

    return '#' + randomColorNumber;
  }

  const handleDropdownColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setColor(selectedValue);
  };

  const handleAddDiv = () => {
    if (color === '') {
      return;
    }

    if (color === 'Random') {
      const newDiv = <div 
        key={divList.length} 
        className={'div'.toLowerCase()} 
        style={{backgroundColor: randomColor()}}></div>;
        setDivList([...divList, newDiv])

    } else {
      const newDiv = <div key={divList.length} className={color.toLowerCase()}></div>;
      setDivList([...divList, newDiv]);
    }
  }

  const disableAddDivButton = () => {
    setIsAddDivDisabled(true);
  }

  const handleChangeCount = () => {
    console.log('Changing Count')
    setChangeCount(changeCount + 1)
  }

  const handleChangeInput = (event) => {
    event.preventDefault();

    setChangingInput(event.target.value)
    console.log('Input change')
  }

  const handleAddToInitialCount = () => {
    setInitialCount(initialCount + 1);
  }

  const handleInitialInput = (event) => {
    event.preventDefault();

    document.title = event.target.value;
    setChangingInitialInput(event.target.value);
  }

  const handleBoxColorClick = () => {
    const currentRef = colorChangeRef.current;
  
    if (currentRef) {

      if (currentRef.style.backgroundColor !== 'gold') {
        currentRef.style.backgroundColor = 'gold'
      } else {
        const clonedDiv: HTMLDivElement = currentRef.cloneNode(true) as HTMLDivElement;
  
        currentRef.insertAdjacentElement('afterend', clonedDiv)
      }
    }

    setChangeWords('Clone Box');
  };

  useEffect(() => {
    if (initialPageLoad === 0) {
      setInitialPageLoad(initialPageLoad + 1)
      setInitialCount(100)
      console.log('First Render')
    } else {
      console.log('Render')
    }
    
    handleDisabledButton();
  }, [])

  return (
    <>
      <div className='input-wrapper'>
        <input 
        type="text" 
        autoFocus
        />
      </div>
      <form>
        <input 
        type="text" 
        onChange={handleChange}
        value={message}
        ref={buttonRef}
        />
        <button type='button' onClick={handleSaveClick}>Update</button>
        <h2>{message}</h2>
        <h2>Updated: {updatedMessage}</h2>
      </form>
      <button
      disabled={isDisabled}
      className={isDisabled ? 'disabled' : ''}
      >
        POGA
      </button>

      <button type='button' onClick={handleCount}>
        Count: {total}
      </button>
      <div className='button-div'>
        {total * 2}
      </div>

      <button
        type='button' 
        onClick={divList.length < 10 ? handleAddDiv : disableAddDivButton}
        disabled={divList.length < 10 ? isAddDivDisabled : !isAddDivDisabled}
        > + 
      </button>
      <select onChange={handleDropdownColor}>
        <option value="">Choose color</option>
        <option value="Blue">Blue</option>
        <option value="Yellow">Yellow</option>
        <option value="Orange">Orange</option>
        <option value="Random">Random Color</option>
      </select>
      <div className='div-wrapper'>
      {divList.map((div, index) => (
        <React.Fragment key={index}>{div}</React.Fragment>
      ))}
      </div>
      <br /><br />
      
      <button onClick={handleChangeCount}> + </button>
        <h3>Count: {changeCount}</h3>
      <form>
        <input 
          type="text"
          onChange={handleChangeInput}
          value={changingInput}
          ref={buttonChangeRef}
        />
        <h3>{changingInput}</h3>
      </form>

      <button onClick={handleAddToInitialCount}> + </button>
        <h3 style={{fontSize: `${initialCount - 80}px`}}>Count: {initialCount}</h3>
      <form>
        <input 
          type="text"
          onChange={handleInitialInput}
          value={changingInitialInput}
          ref={initialRef}
        />
        <h3>{changingInitialInput}</h3>
      </form>

      <div className='color-change-wrapper'>
        <div className='color__change-box' ref={colorChangeRef}></div>
      </div>
      <button
      onClick={handleBoxColorClick}>{changeWords}</button>
    </>
  )
}

export default App
