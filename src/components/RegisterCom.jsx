import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useUserContext} from '../context/UseContext'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


//Icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function RegisterCom() {

  const navigate = useNavigate();
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { handleSubmit, register, formState: { errors } } = useForm();
  
  const [showPassword, setShowPassword] = useState(false);
  const {setGeneralData} = useUserContext();

  const onSubmit = async () =>{
    if (termsAccepted) {
      try {
        const response = await fetch("https://proto-api2-0.vercel.app/api/auth/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            'email': form.email,
            'name':form.name,
            'lastName':form.lastName
         })
        });
        const json = await response.json();
        if (json.message === 'ok') {
          setGeneralData({ option: 'register', form });
          navigate("/CodigoVer");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: json.message,
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Error interno 500',
        });
      }
    } else {
      // Muestra una alerta indicando que el usuario debe aceptar los términos y condiciones
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debes aceptar los términos y condiciones para registrar.",
      });
    }
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


  const Login = () => {
    navigate("/")
  }


  
  const prueba = e =>{
    setTermsAccepted(e.target.checked);
  }


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  return (
    
      <div className="flex justify-center bg-white py-6 mx-auto md:w-[50%] w-96 rounded-2xl border-2 m-20">
        <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex w-[50%] py-8 flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-center">Registro</h1>
            <div className='w-full flex flex-col mt-10'>
              <label className="text-lg font-medium">Nombre</label>
              <input
                name='name'
                type='text'
                {...register('name', {
                  required: 'El nombre es obligatorio.',
                  minLength:3,
                  pattern: /^[A-Za-z\s]{3,}$/
                })}
                onChange={handleChange}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Introduce tu nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic text-center">
                  Tu nombre debe ser mayor de 3 caracteres, puede incluir mayúsculas y minúsculas
                </p>
              )}
            </div>
            <div className='w-full flex flex-col'>
              <label className="text-lg font-medium">Apellidos</label>
              <input
                {...register('lastName', {
                  required: 'Los apellidos son obligatorios.',
                  validate: (value) =>
                    /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/.test(value) &&
                    value.trim().split(' ').length === 2 ||
                    'Los apellidos deben ser exactamente dos palabras, solo pueden contener letras mayúsculas, minúsculas, y espacios. No debe contener números ni caracteres especiales.'
                })}
                onChange={handleChange}
                type='text'
                name='lastName'
                id="lastName"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Introduce tus dos apellidos"
              />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic text-center">
                    {errors.lastName.message}
                  </p>
                )}
            </div>
            <div className='w-full flex flex-col '>
                <label className="text-lg font-medium">Email</label>
                <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} onChange={handleChange} type='email' name='email' className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                placeholder="Introduce tu correo electrónico" /> 
                {errors.email && <p className="text-red-500 text-xs italic text-center">Introduce un correo electrónico válido.</p>}
            </div>
            <div className='w-full flex flex-col '>
              <label className="text-lg font-medium">Password</label>
              <div className="relative w-full">
                <input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name='password'
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Introduce tu contraseña"
                />
                {showPassword ? (
                  <FaRegEye onClick={handleShowPassword} className="absolute inset-y-0 right-0 mr-4 my-auto hover:cursor-pointer" />
                ) : (
                  <FaRegEyeSlash onClick={handleShowPassword} className="absolute inset-y-0 right-0 mr-4 my-auto hover:cursor-pointer" />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic text-center">
                  La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un símbolo y un número.
                </p>
              )}
            </div>
            <div className="flex  justify-center mt-4 w-full">
                <input type="checkbox" name="terms" id="terms" className="mr-2" onChange={prueba}/>
                <label htmlFor="terms" className="text-sm font-medium">Acepto los términos y condiciones</label>
            </div>

            <div className="mt-8 flex gap-x-4 justify-center w-full">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 pr-5 pl-5 rounded-xl bg-red-600 text-white text-lg font-bold" onClick={()=>canceLar()}>Cancelar</button>
                <button type="submit" name='regis' className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 pr-5 pl-5 rounded-xl bg-blue-600 text-white text-lg font-bold" >Registrar</button>
            </div>
            <div className="mt-8 flex justify-center items-center w-full">
              <p className="font-medium text-base">Ya tienes una cuenta?</p>
              <Link className=" text-blue-600 text-base font-medium ml-2" to="/ ">Ingresa</Link>
            </div>
        </form>
      </div>
  )
}

export default RegisterCom

