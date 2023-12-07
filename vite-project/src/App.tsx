import React, { useEffect, useRef, useState, ReactElement } from 'react'
import './App.css'

function App() {
  const buttonRef = useRef(null);
  const buttonChangeRef = useRef(null);
  const initialRef = useRef(null);
  const colorChangeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const divToCornerRef = useRef<HTMLDivElement>(null);

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

  const [changeWords, setChangeWords] = useState('Add Color');
  const [coloredDivs, setColoredDivs] = useState(2);
  const [disableColoredButton, setDisableColoredButton] = useState(false);
  const [wordsInsideDiv, setWordsInsideDiv] = useState('');
  const [divToCornerText, setDivToCornerText] = useState('Send Div To Corner')

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
        className={'add__div-box'.toLowerCase()} 
        style={{backgroundColor: randomColor()}}></div>;
        setDivList([...divList, newDiv])

    } else {
      const newDiv = <div key={divList.length} className={color.toLowerCase() + " " + 'add__div-box'}></div>;
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

  const handleSubToInitialCount = () => {
    if (initialCount > 100) {
      setInitialCount(initialCount - 1);
    }
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

        setChangeWords('Clone Box');
      } else if (coloredDivs <= 7) {
        const clonedDiv: HTMLDivElement = currentRef.cloneNode(true) as HTMLDivElement;
        currentRef.insertAdjacentElement('afterend', clonedDiv)

        setColoredDivs(coloredDivs + 1)
      }
    }
  };

  const handleDisableColorButton = () => {
    setDisableColoredButton(true);
  } 

  const handleDivToCornerClick = () => {
    const currentRef = divToCornerRef.current;

    if (currentRef) {
      if (currentRef.className === 'color__corner-box') {
        currentRef.className = 'corner'
        setWordsInsideDiv('Got Sent To Corner');
        setDivToCornerText('Send Div Back')
      } else {
        currentRef.className = 'color__corner-box'
        setWordsInsideDiv('');
        setDivToCornerText('Send Div To Corner')
      }
    }
  }

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
    <section className='main-wrapper'>
      <div className='main__input-wrapper'>
        <h2 className='main-header'>Updated Messages</h2>
        <input 
            type="text" 
            autoFocus
            className='wrapper__input'
            placeholder='Auto focused...'
          />
        <form>
          <input 
            type="text" 
            className='wrapper__updated-input'
            placeholder='Update text below...'
            onChange={handleChange}
            value={message}
            ref={buttonRef}
          />
          <button 
            type='button'
            className='wrapper__button'
            onClick={handleSaveClick}
            >
            Update
          </button>
          <h2>{message}</h2>
          <h2 className='updated'>Updated: {updatedMessage}</h2>
        </form>
      </div>
     
     <div className='count-wrapper'>
        <div className='count-button-wrapper'>
          <h2 className='main-header'>Multiply</h2>
          <button
            disabled={isDisabled}
            className={isDisabled ? 'disabled' : 'count__button'}
            >
            POGA
          </button>

          <button 
            type='button' 
            className='count__button'
            onClick={handleCount}>
            Count: {total}
          </button>
          </div>
          <div className='count__div'>
            <h3 className='count__div-title'>{total * 2}</h3>
          </div>
      </div>

      <div className='add-div-wrapper'>
        <button
          type='button'
          className='add__div-button'
          onClick={divList.length < 10 ? handleAddDiv : disableAddDivButton}
          disabled={divList.length < 10 ? isAddDivDisabled : !isAddDivDisabled}
          > + 
        </button>
        <select 
          className='add__div-selection'
          onChange={handleDropdownColor}
          >
            <option value="">Choose Color</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Random">Random Color</option>
        </select>
      </div>
        <div className='added-div-wrapper'>
          {divList.map((div, index) => (
            <React.Fragment key={index}>{div}</React.Fragment>
          ))}
        </div>
      
      <div className='add-wrapper'>
        <h2 className='main-header'>Add Count</h2>
        <button 
          className='count-button'
          onClick={handleChangeCount}>
          + 
        </button>
          <h3 className='add-count-text'>Count: {changeCount}</h3>
        <form>
          <input 
            type="text"
            className='change-count-input'
            onChange={handleChangeInput}
            value={changingInput}
            ref={buttonChangeRef}
          />
          <h3>{changingInput}</h3>
        </form>
      </div>
      <div className='add-container'>
        <h2 className='main-header'>Increase Size</h2>
        <div className='add-size-wrapper'>
          <button
            className='size__add-button'
            onClick={handleAddToInitialCount}
            >
            +
          </button>
          <button
            className='size__remove-button'
            onClick={handleSubToInitialCount}
            disabled={initialCount === 100 ? true : false}
            >
            -
          </button>
        </div>
          <h3 style={{fontSize: `${initialCount - 70}px`, margin: 0}}>Count: {initialCount}</h3>
        <form>
          <input 
            type="text"
            className='change-count-input'
            onChange={handleInitialInput}
            value={changingInitialInput}
            ref={initialRef}
          />
          <h3>{changingInitialInput}</h3>
        </form>
      </div>  

      <div className='color-change-wrapper'>
        <div className='color__change-box' ref={colorChangeRef}></div>
      </div>
      <button
        className='color__change-button'
        onClick={coloredDivs <= 7 ? handleBoxColorClick : handleDisableColorButton}
        disabled={coloredDivs <= 7 ? disableColoredButton : !disableColoredButton}
        >
          {coloredDivs <= 7 ? changeWords : 'Disabled'}
      </button>

      <div className='color__corner-box' ref={divToCornerRef}>
        <h3>{wordsInsideDiv}</h3>
      </div>
      <button
        className='corner__button'
        onClick={handleDivToCornerClick}
        >
          {divToCornerText}
      </button>
    </section>
  )
}

export default App
