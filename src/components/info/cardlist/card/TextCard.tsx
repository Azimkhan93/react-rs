import React from 'react';
import styles from './TextCard.module.css';

type Props = {
  brand: string;
  title: string;
  category: string;
};
const TextCard = ({ brand, title, category }: Props) => {
  return (
    <div className={styles.textcard}>
      <span>
        <b>Title: </b>
      </span>
      {title}
      <br />
      <span>
        <b>Brand: </b>
      </span>
      {brand}
      <br />
      <span>
        <b>Category: </b>
      </span>
      {category}
    </div>
  );
};

export default TextCard;
