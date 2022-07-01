import { useState } from 'react';
import './App.css';

const people_dat = [{
    fistName: 'John',
    lastName: 'Doe',
    age: "50",
    uid: "001"
  },
  {
    fistName: 'Davis',
    lastName: 'Gaunt',
    age: "22",
    uid: "002"
  },
  {
    fistName: 'Megan',
    lastName: 'Gaunt',
    age: "22",
    uid: "003"
  }
]



const PeopleRend = (props) =>{

  return(
    <>
      <h1>First Name {people_dat[props.idx].fistName}</h1>
      <h2>Last Name {people_dat[props.idx].lastName}</h2>
      <h3>Age {people_dat[props.idx].age}</h3>
      <h6><small>uid {people_dat[props.idx].uid}</small></h6>
    </>
  )

}

const Counter = () =>{
  const [ctr, setCtr] = useState(0)

  return(
    <>
      <button onClick={() => setCtr((prevCounter) => prevCounter - 1)}>-</button>
      <h1>{ctr}</h1>
      <button onClick={() => setCtr((prevCounter) => prevCounter + 1)}>+</button>
    </>
  )

}

function App() {
  return (
    <div className="App">
      <PeopleRend idx={0} />
      <PeopleRend idx={1} />
      <PeopleRend idx={2} />
      <Counter />
    </div>
  );
}

export default App;
