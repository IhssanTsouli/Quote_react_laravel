import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import star from './assets/star.svg';
import iconstar from './assets/iconstar.png';
import drop from './assets/drop.svg';



function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [datafavorite, setdatafavorite] = useState([]);
  // http://api.quotable.io/random

  useEffect(() => {
    fetch("http://api.quotable.io/random")
      .then(res => res.json())
      .then(
        (quote) => {
          setQuote(quote.content);  
          setAuthor(quote.author);
        }
      )
      getData();
      // axios.get("http://127.0.0.1:8000/api/index")
      // .then((res)=>{
      //   console.log(res.data);
      //   setdatafavorite(res.data);
      // })
    
  },[]);

  const getData = () => {
    axios.get(`http://127.0.0.1:8000/api/index`)
        .then((res) => {
          console.log(res.data);
          setdatafavorite(res.data);
         })
}
  /*useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/index")
      .then((res)=>{
        console.log(res.data);
        setDataSelected(res.data);
      })
    
  },[]);*/


  const addquote=(quote)=>{
    const user = datafavorite.find((user) => user.quote === quote);
    console.log(quote);
    if(!user){
      // console.log('n'existe pas');
        axios.post(`http://127.0.0.1:8000/api/ajouter`, {
          quote,author
        }).then(() => {
          getData();
      })
    }
    else{
      // console.log('déjà existe');
      alert('this quote is already exist');
    }
  

}
   

    let fetchNewQuote = () => {
      fetch("http://api.quotable.io/random")
        .then(res => res.json())
        .then(
          (quote) => {
            setQuote(quote.content);  
            setAuthor(quote.author);
          }
        )
    }
    const onDelete=(id)=>{
      axios.delete(`http://127.0.0.1:8000/api/destroy/${id}`)
      .then(() => {
         getData();
     })
    }

  return (
    <div>
    
      <nav class="navbar navbar-expand-lg bg-light navbar-dark bg-dark">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex" role="search">
                            <a class="jj" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style={{ color: 'red' }} fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z" />
                                </svg> */}
                                 <img src={iconstar} width="30" height="30" />
                               

                      
                            </a>
                        </form>
                    </div>
                </div>
            </nav>
 
            <div className="App">
         <div className="quote">
            <h2>{quote}</h2>
            <small>-{author}-</small>
         </div><br />
         <div className="btnf"> 
          
         
         <img src={star} onClick={()=>{addquote(quote)}} width="100" height="60" />
         
         <button className="btn" onClick={fetchNewQuote}>Generate New Quote</button>
                
          </div>   
    </div>
 
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">My favorite quotes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    {/* <div>
                        <h1>List favoris</h1>
                    </div> */}
                    <div class="container-fluid">
                    <table>
                    <tbody>
                    {datafavorite.map((data)=>{
                        return(
                          <tr>
                          <td class="quotef">{data.quote}</td>
                          <td class="authorf">{data.author}</td>
                          <td> 
                          <img src={drop}  onClick={() => onDelete(data.id)} width="60" height="30" />
                          </td>
                        
                      </tr>
                        )})}
                    </tbody>
                   </table>
                    </div>
                </div>
            </div>
    </div>  
  );
}
                        
                        

export default App;
