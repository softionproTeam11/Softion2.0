import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useUserContext} from '../context/UseContext'
import Swal from 'sweetalert2'


function ForgetPassword() {
  const  {setGeneralData} = useUserContext();

  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) =>{
    console.log(data);
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
    lastName:'',
    name:''
  });
  
  const canceLar = () => {
    navigate("/")
  }
  
  const handleChange = e =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const forgetPass = async () =>{

    try{
      const response = await fetch("https://proto-api2-0.vercel.app/api/auth/forgotPassword",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(form)
      });
      const json = await response.json();
      setGeneralData({option:'forgot',email:form.email})
      console.log(json)
      navigate("/CodigoVer")
    }
    catch (err){
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
    
      <div className="flex justify-center bg-white py-6 mx-auto w-96 rounded-2xl border-2 m-40">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-center">Recuperacion</h1>
            <div className='w-full flex flex-col mt-10'>
                <label className="text-lg font-medium">Email</label>
                <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} onChange={handleChange} type='email' name='email' className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                placeholder="Introduce tu correo electrónico" /> 
                {errors.email && <p className="text-red-500 text-xs italic text-center">Introduce un correo electrónico válido.</p>}
            </div>

            <div className="mt-8 flex gap-x-4 justify-center w-full">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 pr-5 pl-5 rounded-xl bg-red-600 text-white text-lg font-bold" onClick={()=>canceLar()}>Cancelar</button>
                <button type="submit" name='regis' className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 pr-5 pl-5 rounded-xl bg-blue-600 text-white text-lg font-bold" onClick={forgetPass} >Recuperar</button>
            </div>
            <div className="mt-8 flex justify-center items-center w-full">
              <p className="font-medium text-base">Ya tienes una cuenta?</p>
              <button className=" text-blue-600 text-base font-medium ml-2" onClick={()=>Login()} >Ingresa</button>
          </div>
        </form>
      </div>
  )

}
export default ForgetPassword

