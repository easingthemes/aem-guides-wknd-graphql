/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import {useState, useEffect} from 'react';
const {AEMHeadless } = require('@adobe/aem-headless-client')

// environment variable REACT_APP_GRAPHQL_ENDPOINT is used to point to endpoint in AEM
const {REACT_APP_GRAPHQL_ENDPOINT} = process.env;
const sdk = new AEMHeadless(REACT_APP_GRAPHQL_ENDPOINT || 'content/graphql/endpoint.gql')

/*
    Custom React Hook to perform a GraphQL query
-    query parameter is a GraphQL query

*/
function useGraphQL(query, path) {

    let [data, setData] = useState(null);
    let [errorMessage, setErrors] = useState(null);
    const request = query ? sdk.postQuery : sdk.getQuery;

    useEffect(() => {
      request(query || path)
        .then(({data}) => {
          //If data in the response set the data as the results
          if(data) {
            setData(data);
          }
        })
        .catch((error) => {
          setErrors(error);
        });
    }, [query, path]);

    return {data, errorMessage}
}

export default useGraphQL
