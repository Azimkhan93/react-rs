import './Card.css';

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
      <div className="card-container">
        <div className="card-subcontainer">
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Password: {password}</p>
          <p>Gender: {gender}</p>
          <p>Country: {country}</p>
          <img src={image} width={150} height={150} alt="image" />
        </div>
      </div>
    </>
  );
};

export default Card;
