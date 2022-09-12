import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {FaCheck} from 'react-icons/fa';
function App() {
  const [cardholderName,setName]=useState('JANE APPLESEED')
  const [cardNumber,setNumber]=useState('0000 0000 0000 0000')
  const [cardMonth,setMonth]=useState('00')
  const [cardYear,setYear]=useState('00')
  const [cardCVC,setCVC]=useState('000')
  const { height, width } = useWindowDimensions();
  function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
      if(textbox!=null){
        textbox.addEventListener(event, function(e) {
          if (inputFilter(this.value)) {
            // Accepted value
            if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
              this.classList.remove("input-error");
              this.setCustomValidity("");
            }
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            // Rejected value - restore the previous one
            this.classList.add("input-error");
            this.setCustomValidity(errMsg);
            this.reportValidity();
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            // Rejected value - nothing to restore
            this.value = "";
          }
        });
      }
    });
  }
  
  function handleName(e){
    setName(e.target.value)
  }
  function handleNumber(e){
    setNumber(e.target.value)
  }
  function handleMonth(e){
    setMonth(e.target.value)
  }
  function handleYear(e){
    setYear(e.target.value)
  }
  function handleCVC(e){
    setCVC(e.target.value)
  }
  function checkName(name){
    
    if(/\d/.test(name) || name=="JANE APPLESEED" || name==""){
      document.querySelector('.invalid-name').classList.remove('none')
      return false;
    }else{
      document.querySelector('.invalid-name').classList.add('none')
      return true;
    }
    
  }
  function checkNumber(number){
    if(number.length!=16){
      document.querySelector('.invalid-number').classList.remove('none')
      return false;
    }else{
      document.querySelector('.invalid-number').classList.add('none')
      return true;
    }
  }
  function checkMonth(month){
    if(parseInt(month)>=13 || parseInt(month)<=0){
      return false;
    }else{
      return true;
    }
  }
  function checkYear(year){
    if(parseInt(year)<=21){
      return false;
    }else{
      return true;
    }
  }
  function checkDate(checkMonth,checkYear){
    if(checkMonth && checkYear){
      document.querySelector('.invalid-date').classList.add('none')
    }else{
      document.querySelector('.invalid-date').classList.remove('none')
    }
  }
  function checkCVC(cvc){
    if(!/\d/.test(cvc)){
      document.querySelector('.invalid-cvc').classList.remove('none')
      return false;
    }else{
      document.querySelector('.invalid-cvc').classList.add('none')
      return true;
    }
  }
  function handleSubmit(){
    checkName(cardholderName);
    checkNumber(cardNumber);
    checkMonth(cardMonth);
    checkYear(cardYear);
    checkDate(checkMonth(cardMonth),checkYear(cardYear))
    checkCVC(cardCVC);
    console.log(checkName(cardholderName))
    console.log(checkNumber(cardNumber))
    console.log(checkMonth(cardMonth))
    console.log(checkYear(cardYear))
    console.log(checkCVC(cardCVC))
    if(checkName(cardholderName) && checkNumber(cardNumber) && checkMonth(cardMonth) && checkYear(cardYear) && checkCVC(cardCVC)){
      document.querySelector('#form-section').classList.add('none')
      document.querySelector('#confirmed-section').classList.remove('none')
    }
  }
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }
  setInputFilter(document.getElementById("card-number"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  }, "Only digits are allowed");
  return (
  <div className='row'>
    <div className="col-md-4">
      <div className='img-box'>
        <img src={require('./images/bg-main-desktop.png')} alt="bg" className='bg'/>
      </div>
      <div className='card-images d-flex flex-column gap-3'>
      <div className="container">
        <img src={require('./images/bg-card-front.png')} alt="bg" className='bg'/>
        <div className="bottom-left">{cardholderName}</div>
        <div className="bottom-right">{cardMonth}/{cardYear}</div>
        <div className="centered">{cardNumber}</div>
      </div>
      <div className="container">
        <img src={require('./images/bg-card-back.png')} className='push-left'/>
        <div className="centered-sec">{cardCVC}</div>
      </div>

      </div>
    </div>
    <div className='col-md-8'>
      <div id='form-section' className=''>
        <form id="form1" className='form-group d-flex flex-column gap-3 has-danger' >
          <label className='form-title' for="cardholder-name">Cardholder Name</label>
          <input type="text" id="cardholder-name" placeholder='e.g. Jane Appleseed' className='rounded form-control' onChange={handleName} required/>
          <div className="invalid-name none">Please provide a name.</div>
          <label className='form-title' for="card-number">Card Number</label>
          <input type="text" id="card-number"  placeholder='e.g. 1234 5678 9123 0000' className='rounded form-control' onChange={handleNumber} maxLength={16}required/>
          <div className="invalid-number none">Please provide a valid number.</div>

          
          <div className='row'>
            <div className='col-md-6 d-flex flex-column gap-3'>
              <label className='form-title' for="mm-yy">Exp. Date (MM/YY)</label>
              <div className='d-flex flex-row gap-2'>
                <input type="text" id="mm-yy"  placeholder='MM' className='rounded col-md-6' onChange={handleMonth} maxLength={2} required/>
                <input type="text" id="mm-yy"  placeholder='YY' className='rounded col-md-6' onChange={handleYear} maxLength={2} required/>
              </div>
              <div className="invalid-date none">Please provide a valid date.</div>
            </div>
            <div className='col-md-6 d-flex flex-column  gap-3'>
              <label className='form-title' for="cvc">Card Number</label>
              <input type="text" id="cvc"  placeholder='e.g. 123'className='rounded col-md-12' onChange={handleCVC} maxLength={3} required/>
              <div className="invalid-cvc none">Please provide a valid CVC.</div>
            </div>
          </div>
          <button className='button rounded' type="button" value="Submit" onClick={handleSubmit}>Confirm</button>
        </form>
      </div>
      <div className='d-flex flex-column gap-3'>
        <div id='confirmed-section' className='none'>
          <div id='circle-tick'>
            <svg viewBox="0 0 180 180">
                <defs>
                  <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                      <stop offset="10%" stop-color="var(--color-stop)" />
                      <stop offset="10%" stop-color="var(--color-stop)" />
                      <stop offset="100%" stop-color="var(--color-bot)" />
                    </linearGradient>
                </defs>
                  <path 
                        d="
                          M 100, 100
                          m -75, 0
                          a 75,75 0 1,0 150,0
                          a 75,75 0 1,0 -150,0
                          "
                        />
                <text x="50" y="110" fill="white" className='tick-text'>Done</text>

              </svg>
          </div>
          <div id='confirmed-text'>
            <h1>Thank You!</h1>
            <h4>We've added your card details</h4>
            <button className='button rounded w-25 mt-3' type="button">Continue</button>
          </div>

        </div>
        
        
      </div>
    </div>
  </div>
    
  );
}

export default App;
