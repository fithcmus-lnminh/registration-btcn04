import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = (): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup.string().required().label("Full name"),
    email: yup.string().required().email().label("Your email"),
    password: yup.string().min(6).label("Password"),
    passwordConfirm: yup
      .string()
      .min(6)
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .label("Confirm Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data: any) => {
    setIsLoading(true);
    const res = await axios.post("/api/register", data);

    if (res.data && res.data.errorCode === 1)
      setSuccessMessage(res.data.message);
    else setErrorMessage(res.data.message);

    setIsLoading(false);
    reset();
  };

  return (
    <div className="form__wrapper">
      <form className="form__container" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="form__title">REGISTER</h2>
        <div className="message__error">{errorMessage}</div>
        <div className="message__success">{successMessage}</div>
        <div className="form__control">
          <label className="form__label">Email</label>
          <input className="form__input" {...register("email")}></input>
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form__control">
          <label className="form__label">Full Name</label>
          <input className="form__input" {...register("name")}></input>
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="form__control">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            {...register("password")}
          ></input>
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="form__control">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__input"
            type="password"
            {...register("passwordConfirm")}
          ></input>
          <p className="error">{errors.passwordConfirm?.message}</p>
        </div>
        <div className="form__submit">
          <button
            type="submit"
            className="btn__submit"
            disabled={isLoading ? true : false}
          >
            {!isLoading ? "Register" : "Registering..."}
          </button>
        </div>
        <div className="registered__link">
          <Link to="/list">See registered user list</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
