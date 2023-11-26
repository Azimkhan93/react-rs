import React from 'react';
import Card from './card/Card';
import styles from './CardList.module.css'
import { UserDataResults } from '@/types/props.types';
import { MyRouter } from '../Info';
import { NextRouter } from 'next/router';
type Props = {
  router: NextRouter;
  products: UserDataResults[];
};

const CardList = ({ router, products }: Props) => {

  const handleCardClick = (id: string) => {
    const path = `/${ id }`;
    const entries = Object.entries(router.query as MyRouter)
    const searchArray: string[] = [];
    for (const entry of entries) {
      searchArray.push(entry.join('='));
    }
    
    router.push({
      pathname:  path,
      search: searchArray.join('&'),
    })
    console.log('searcharray', router)
  };
  const infoComponents =
    products.length === 0 ? (
      <h1 data-testid="found">Nothing was found</h1>
    ) : (
      products.map(
        (user: UserDataResults, index: React.Key | null | undefined) => (
          <Card
            onCardClick={() => handleCardClick(String(user.id))}
            key={index}
            brand={user.brand}
            title={user.title}
            category={user.category}
          />
        )
      )
    );
  console.log('datata', products.length, products);
  return (
    <div>
      <div className={styles.general_container}>
        <div className={styles.info_container}>{infoComponents}</div>
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default CardList;
