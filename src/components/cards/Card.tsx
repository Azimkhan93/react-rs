type Props = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
};

export const Card = ({
  name,
  age,
  email,
  password,
  gender,
  country,
  image,
}: Props) => {
  return (
    <>
      <div>
        <div>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Password: {password}</p>
          <p>Gender: {gender}</p>
          <p>Country: {country}</p>
          <img src={image} alt="image" />
        </div>
      </div>
    </>
  );
};

export default Card;
