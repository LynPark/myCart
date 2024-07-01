import { useRef } from "react";
import "./LoginPage.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services/userServices";

const LoginPage = () => {
  //const passwordRef = useRef(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = async (formData) => {
    try {
      await login(formData);
      window.location = "/";
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(submitData)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Please enter your email." })}
              className="form_text_input"
              placeholder="Enter Email..."
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              //ref={passwordRef}
              id="password"
              {...register("password", {
                required: "Please enter your password.",
                minLength: {
                  value: 4,
                  message: "Password should contain at list 4 letters.",
                },
              })}
              className="form_text_input"
              placeholder="Enter Password..."
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {/* <button
            type="button"
            // onClick={() => console.log(passwordRef.current)}
            onClick={() => (passwordRef.current.type = "password")}
          >
            Hide Password
          </button>
          <button
            type="button"
            onClick={() => (passwordRef.current.type = "text")}
          >
            Show Password
          </button> */}
          {formError && <em className="form_error">{formError}</em>}
          <button
            type="submit"
            // onClick={handleSubmit}
            className="search_button form_submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
