import './App.css';
import SuperGroup from './Components/SuperGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <div className='my-4'>
      <SuperGroup />
      </div>
    </div>
  );
}

export default App;



// import React, { useState } from 'react'
// // import './styles.css'

// const App = () => {

//     const [formValues, setFormValues] = useState([{ name: "", email : ""}])

//     let handleChange = (i, e) => {
//         let newFormValues = [...formValues];
//         newFormValues[i][e.target.name] = e.target.value;
//         setFormValues(newFormValues);
//       }
    
//     let addFormFields = () => {
//         setFormValues([...formValues, { name: "", email: "" }])
//       }
    
//     let removeFormFields = (i) => {
//         let newFormValues = [...formValues];
//         newFormValues.splice(i, 1);
//         setFormValues(newFormValues)
//     }
    
//     let handleSubmit = (event) => {
//         event.preventDefault();
//         alert(JSON.stringify(formValues));
//     }

//     return (
//         <form  onSubmit={handleSubmit}>
//           {formValues.map((element, index) => (
//             <div className="form-inline" key={index}>
//               <label>Name</label>
//               <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
//               <label>Email</label>
//               <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
//               {
//                 index ? 
//                   <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
//                 : null
//               }
//             </div>
//           ))}
//           <div className="button-section">
//               <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
//               <button className="button submit" type="submit">Submit</button>
//           </div>
//       </form>
//     )
// }

// export default App