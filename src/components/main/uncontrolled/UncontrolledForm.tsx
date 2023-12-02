import React, { SyntheticEvent, useRef, useState } from 'react';
import { countries } from '../../../data/country';
import { userSchema } from '../../../validation/UserValidation';
import * as yup from 'yup';

// type SpecType = {
//   strip: boolean;
//   strict: boolean;
//   abortEarly: boolean;
//   recursive: boolean;
//   disableStackTrace: boolean;
//   nullable: boolean;
//   optional: boolean;
//   coerce: boolean;
// };

// type Paramstype = {
//   value: string;
//   originalValue: string;
//   path: string;
//   spec: SpecType;
// };

// // type ValidationErrorType = {
// //   value: string;
// //   path: string;
// //   type: string;
// //   errors: string[];
// //   params: Paramstype;
// //   inner: [];
// //   name: string;
// //   message: string;
// // };

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const maleRef = useRef<HTMLInputElement | null>(null);
  const femaleRef = useRef<HTMLInputElement | null>(null);
  const tcRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<yup.ValidationError[]>();

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
      tc: tcIsChecked,
      country: selectedCountry,
    };
    console.log(data);

    try {
      await userSchema.validate(data, { abortEarly: false });

      console.log('Form data:', data);
      setValidationErrors([]);
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        console.error('Validation error:', error.inner);
        setValidationErrors(error.inner || []);
        console.log('test', validationErrors);
        const nameErr = validationErrors?.map((validationError) =>
          validationError.path === 'name' ? validationError.message : null
        );
        console.log(nameErr);
      } else {
        console.error('Other error:', error);
      }
    }
  };

  return (
    <div>
      <form className="form uncontrolled" onSubmit={handleSubmit}>
        <div>
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
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="text" id="age" name="age" ref={ageRef} />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'age' ? (
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
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
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'password' ? (
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            ref={confirmPasswordRef}
          />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'confirmPassword' ? (
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
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
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <div>
          <label htmlFor="tc">Agree to Terms and Conditions</label>
          <input type="checkbox" id="tc" name="tc" ref={tcRef} />
          {validationErrors?.map((validationError, index) =>
            validationError.path === 'tc' ? (
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>

        <div>
          <label>
            Upload image
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              name="myImage"
            />
          </label>
        </div>

        <div>
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
              <p key={index}>{`${validationError.message}`}</p>
            ) : null
          )}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
