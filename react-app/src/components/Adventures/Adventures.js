/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useGraphQL from '../../api/useGraphQL';
import Error from '../Error';
import Loading from '../Loading';
import { allAdventuresQuery, filterQuery, persistentPath } from './config';
import './Adventures.scss';



function Adventures() {
    
    //Use React Hooks to set the initial GraphQL query to a variable named `query`
    const [query, setQuery] = useState('');
    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(query, persistentPath);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading state...
    if(!data) return <Loading />;
    
    return (
        <div className="adventures">
          <button onClick={() => setQuery(allAdventuresQuery)}>All</button>
          <button onClick={() => setQuery(filterQuery('Camping'))}>Camping</button>
          <button onClick={() => setQuery(filterQuery('Surfing'))}>Surfing</button>
          <ul className="adventure-items">
            {
                //Iterate over the returned data items from the query
                data.adventureList.items.map((adventure, index) => {
                    return (
                        <AdventureItem key={index} {...adventure} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureItem(props) {
  return (
        <li className="adventure-item">
          <Link to={`/adventure:${props._path}`}>
            <AdventureItemImage image={props.adventurePrimaryImage} alt={props.adventureTitle}/>
          </Link>
          <div className="adventure-item-length-price">
            <div className="adventure-item-length">{props.adventureTripLength}</div>
            <div className="adventure-item-price">{props.adventurePrice}</div>
          </div>
          <div className="adventure-item-title">{props.adventureTitle}</div>
      </li>
      );
}

function AdventureItemImage(props) {
  if (!props.image) {
    return <></>;
  }

  return (
    <img className="adventure-item-image" src={props.image._path}
         alt={props.alt}/>
  );
}




export default Adventures;
