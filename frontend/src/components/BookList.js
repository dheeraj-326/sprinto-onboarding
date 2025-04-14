'use client';

import {gql, useQuery} from '@apollo/client';
import Loading from './Loading';
import Error from './Error';

const GET_HELLO = gql`
query {
    hello
}`;

export default function BookList() {
    const {loading, error, data} = useQuery(GET_HELLO);

    if (loading)
        return <Loading/>;
    if (error) 
        return <Error error={error} />;

    return (
        <p>{data.hello}</p>
    )
}