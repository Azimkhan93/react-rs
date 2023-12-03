import React, { SyntheticEvent, useRef, useState } from 'react';
import { countries } from '../../data/country';
import { userSchema } from '../../validation/UserValidation';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData } from '../../store/formSlice';
import { RootState } from '../../store/store';
import { convertBase64 } from '../../imageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const maleRef = useRef<HTMLInputElement | null>(null);
  const femaleRef = useRef<HTMLInputElement | null>(null);
  const tcRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<yup.ValidationError[]>();

  const [base64Img, setBase64Img] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event?.preventDefault();
    const selectedGender = maleRef.current?.checked
      ? maleRef.current.value
      : femaleRef.current?.checked
        ? femaleRef.current.value
        : null;

    if (selectedGender !== null) {
      console.log('Selected Value:', selectedGender);
    }

    const tcIsChecked = tcRef.current?.checked;
    console.log(tcIsChecked);
    if (tcIsChecked !== undefined) {
      console.log('Checkbox is checked:', tcIsChecked);
    }
    const selectedCountry = countryRef.current?.value;

    if (selectedCountry !== undefined) {
      console.log('Selected Country:', selectedCountry);
    }

    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: selectedGender,
      image: imageRef.current,
      tc: tcIsChecked,
      country: selectedCountry,
    };

    try {
      await userSchema.validate(data, { abortEarly: false });
      setValidationErrors([]);
      dispatch(setFormData({ ...data, image: base64Img }));
      navigate('/');
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        setValidationErrors(error.inner || []);
      } else {
        console.error('Other error:', error);
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files !== null ? event.target.files[0] : null;
    const base64 = await convertBase64(file);
    setBase64Img(base64 as string);
  };
  const formData = useSelector((state: RootState) => state.form.formData);
  console.log('formData', formData);

  return (
    <div>
      <form className="form uncontrolled" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            autoComplete="on"
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'name' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <label htmlFor="age">Age</label>
          <input type="text" id="age" name="age" ref={ageRef} />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'age' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            autoComplete="on"
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'email' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'password' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            ref={confirmPasswordRef}
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'confirmPassword' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <span>Gender </span>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            ref={maleRef}
          />

          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            ref={femaleRef}
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'gender' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div className="input-container">
          <label htmlFor="tc">Agree to Terms and Conditions</label>
          <input type="checkbox" id="tc" name="tc" ref={tcRef} />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'tc' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>

        <div className="input-container">
          <label>
            Upload image
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              name="myImage"
              onChange={handleImageUpload}
              ref={imageRef}
            />
          </label>
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'image' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>

        <div className="input-container">
          <label htmlFor="country">Country</label>

          <select id="country" autoComplete="on" ref={countryRef}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'tc' ? (
              <p
                className="error-message"
                key={index}
              >{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
