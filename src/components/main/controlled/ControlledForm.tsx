import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema, IFormInput } from '../../../validation/UserValidation';
import { countries } from '../../../data/country';
import './ControlledForm.css';

export const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });
  console.log(errors);
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label>Age</label>
          <input {...register('age')} />
          <p>{errors.age?.message}</p>
        </div>

        <div>
          <label>E-mail</label>
          <input {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input {...register('password')} />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label>Confirm password</label>
          <input {...register('confirmPassword')} />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        <div className="gender-container">
          <label>Gender </label>
          <div style={{ display: 'inline' }}>
            Male
            <input type="radio" value="male" {...register('gender')} />
          </div>
          <div style={{ display: 'inline' }}>
            Female
            <input type="radio" value="female" {...register('gender')} />
          </div>
          <p>{errors.gender?.message}</p>
        </div>

        <div>
          <label>Agree to Terms and Conditions</label>
          <input type="checkbox" {...register('tc')} />
          <p>{errors.tc?.message}</p>
        </div>

        {/* <div>
          <label>
            Upload image
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              name="myImage"
            />
          </label>
        </div> */}

        <div>
          <label>Country</label>
          <select {...register('country')}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default ControlledForm;
