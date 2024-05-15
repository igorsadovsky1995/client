import React,{useState} from "react";
import axios from "axios";
import { useParams ,Link} from 'react-router-dom';
import './formPage.css'
import'materialize-css'

function FormPage(){

    const [form,setForm] = useState({
        name:'',
        email:'',
        dateOfBirth:'',
        heardFrom:''
    });
    const [loading, setLoading] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState(false);
    const { eventId } = useParams();

    const changeHandler = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const registerHandler= async()=>{
        setLoading(true);
        try{
            await axios.post('https://forevent-eacbb67b7d4f.herokuapp.com/api/registration',{eventId,...form},{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response=>response)
            setSubmited(true)
        }catch(e){
            console.log('error:'+e)
            setError(false)
        }finally {
            setLoading(false);
        }
    }

    return(
        <React.Fragment>
            <div className="formPage row">
                <h1>Event registration</h1>
                <div >
                    <form className="row" onSubmit={e=>e.preventDefault()} >
                        <div class="input-field row">
                            <div className="col s12 m6s l6">
                                <label>
                                    Name: 
                                </label>
                                <input type="text" name="name" onChange={changeHandler}/>
                            </div>
                        </div>
                        <div className="input-field row">
                            <div className="col s12 m6s l6">
                                <label>
                                    Email:   
                                </label>
                                <input type="email" name="email" onChange={changeHandler} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6s l6">
                                <label>
                                    Date of birth 
                                </label>
                                <input type="date" name="dateOfBirth" className="datepicker" onChange={changeHandler} />
                            </div>
                        </div>
                        <div>
                            <label className="col s12">
                                How did know?
                            </label>
                            <div className="row">
                                <p className="col s12 m4 l4">
                                    <label>
                                        <input type="radio" name="heardFrom" value="Social Media" onChange={changeHandler} />
                                        <span> Social Media</span>
                                    </label>
                                </p>
                                <p className="col s12 m4 l4">
                                    <label>
                                        <input type="radio" name="heardFrom" value="Friends" onChange={changeHandler} />
                                        <span>Friends</span>
                                    </label>
                                </p>
                                <p className="col s12 m4 l4">
                                    <label>
                                        <input type="radio" name="heardFrom" value="Found myself" onChange={changeHandler} />
                                        <span> Found myself</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        
                        {loading && <div className="form-res">Loading...</div>}
                        {submited && <div className="form-res">Your form has been submitted</div>}
                        {error && <div className="form-res">Something went wrong, check the filled fields!</div>}
                        
                        <div className="row">
                            <button onClick={registerHandler} className="btn waves-effect waves-light button-send">
                                SEND
                            </button>
                            <Link className="btn waves-effect waves-light" to={'/'}>Back</Link>
                        </div>
                    </form>
                </div> 
            </div>
        </React.Fragment>
    )
}

export default FormPage;