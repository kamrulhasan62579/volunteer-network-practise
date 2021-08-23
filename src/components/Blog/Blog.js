import React, { useEffect, useState } from 'react';

const Blog = () => {
    const [allRegister, setAllRegister]  = useState([])
    console.log(allRegister);
    useEffect(() => {
        fetch('http://localhost:4005/registerdData')
        .then(res => res.json())
        .then(data => setAllRegister(data))
    }, [])
    return (
        <div>
            {
                allRegister.map(all => <li key={all._id}>Name: {all.displayName}, Email: {all.email}, Date: {all.registatingDate}</li> )
            }
        </div>
    );
};

export default Blog;