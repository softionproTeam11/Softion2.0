import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useUserContext} from '../context/UseContext'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';


function CodigoVer() {

  const cookies = new Cookies();
  

  const navigate = useNavigate();

  const { handleSubmit } = useForm();

  const {generalData,setAllData} = useUserContext();

  const onSubmit = (data) =>{
    console.log(data);
  }

  const [secretCode, setSecretCode] = useState('');
  
  const canceLar = () => {
    navigate("/")
  }
  
  const handleChange = e =>{
        setSecretCode(e.target.value);
        if(e.target.value.length < 8 || e.target.value.length > 8){
            document.getElementById('messageError').textContent = "FORMATO NO ACEPTADO"
        }
        else if(e.target.value.length === 8){
            document.getElementById("messageError").textContent = '';
        }
  }

  const forgetPass = async () =>{
    try{
      const res = await fetch(`https://proto-api2-0.vercel.app/api/auth/${(generalData.option === "register")?'signup':(generalData.option==="login")?'signin':'forgotPassword'}/confirm`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify((generalData.option==='login' || generalData.option ==='forgot')?{
          'email':generalData.email ,
          'secretCode': secretCode
        }:{ 
          'email':generalData.form.email ,
          'secretCode': secretCode,
          'name':generalData.form.name,
          'lastName':generalData.form.lastName,
          'password':generalData.form.password
        })
      })
      const json = await res.json();
      
      console.log(json)

      if(json.message === 'ok'){
        cookies.set('x-access-user', json.token);
        if(generalData.option ==='forgot'){
          navigate("/ResetPass");  
        }
        else{
          navigate("/App");
        }
        
      }
        else{
          
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: json.message,
        });
      }

     

    }
    catch(err){
      console.log(generalData,err )
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Error interno 500',
      });  
    }
}

  const Login = () => {
    navigate("/")
  }


  return (
    
<div className="flex flex-col justify-center bg-white py-8 md:py-16 mx-auto w-11/12 md:w-3/4 lg:w-2/4 xl:w-2/4 rounded-2xl border-2 my-8 md:my-24">
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full">
    <h1 className="text-3xl md:text-5xl font-semibold text-center mb-4">Verificación de Cuenta</h1>
    <h3 className='text-sm md:text-base text-center mb-4'>
      Se envió un correo electrónico a tu bandeja de entrada con el código de verificación.
    </h3>
    <div className='w-full px-36 flex flex-col mt-4 md:mt-6'>
      <label className="text-base md:text-lg font-medium ml-2.5 mb-1 items-center justify-center">Código</label>
      <input
        onChange={handleChange}
        type='text'
        name='email'
        className="w-full border-2 border-gray-100 rounded-xl p-2 md:p-4 mt-1 bg-transparent"
        placeholder="Introduce tu código"/>
      <h3 id="messageError" className='text-red-600 text-xs md:text-sm mt-1'></h3>
    </div>

    <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center items-center w-full">
      <button
        className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 md:py-3 pr-3 md:pr-5 pl-3 md:pl-5 rounded-xl bg-red-600 text-white text-sm md:text-lg font-bold mb-2 md:mb-0 md:mr-4"
        onClick={() => canceLar()}>
        Cancelar
      </button>
      <button
        type="submit"
        name='regis'
        className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 md:py-3 pr-3 md:pr-5 pl-3 md:pl-5 rounded-xl bg-blue-600 text-white text-sm md:text-lg font-bold"
        onClick={forgetPass}>
        Confirmar
      </button>
    </div>

    <div className="mt-6 md:mt-8 flex flex-col items-center w-full">
      <p className="font-medium text-sm md:text-base mb-1 md:mb-2">Probar otro método de verificación</p>
      <button
        className="text-blue-600 text-sm md:text-base font-medium"
        onClick={() => Login()}>
        Haz clic aquí
      </button>
    </div>
  </form>
</div>



  )
}

export default CodigoVer

