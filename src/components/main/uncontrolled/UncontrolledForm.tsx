import React, { SyntheticEvent, useRef } from 'react';
import { countries } from '../../../data/country';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordOneRef = useRef<HTMLInputElement | null>(null);
  const passwordTwoRef = useRef<HTMLInputElement | null>(null);
  const maleRef = useRef<HTMLInputElement | null>(null);
  const femaleRef = useRef<HTMLInputElement | null>(null);
  const tcRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event?.preventDefault();
    console.log(nameRef.current?.value);
    console.log(ageRef.current?.value);
    console.log(emailRef.current?.value);
    console.log(passwordOneRef.current?.value);
    console.log(passwordTwoRef.current?.value);

    const selectedGender = maleRef.current?.checked
      ? maleRef.current.value
      : femaleRef.current?.checked
        ? femaleRef.current.value
        : null;

    if (selectedGender !== null) {
      console.log('Selected Value:', selectedGender);
    }

    const tcIsChecked = tcRef.current?.checked;
    if (tcIsChecked !== undefined) {
      console.log('Checkbox is checked:', tcIsChecked);
    }
    const selectedCountry = countryRef.current?.value;

    if (selectedCountry !== undefined) {
      console.log('Selected Country:', selectedCountry);
    }
  };

  return (
    <div>
      <form className="form uncontrolled" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" ref={ageRef} />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="password-one">Password:</label>
          <input
            type="password"
            id="password-one"
            name="password-one"
            ref={passwordOneRef}
          />
        </div>
        <div>
          <label htmlFor="password-two">Confirm password:</label>
          <input
            type="password"
            id="password-two"
            name="password-two"
            ref={passwordTwoRef}
          />
        </div>
        <div>
          <span>Gender: </span>
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
        </div>
        <div>
          <label htmlFor="tc">Agree to Terms and Conditions:</label>
          <input type="checkbox" id="tc" name="tc" ref={tcRef} />
        </div>

        <div>
          <label htmlFor="country">Country:</label>

          <select id="country" autoComplete="on" ref={countryRef}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
