import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Type = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const [sectionList, setSectionList] = useState([])
  const categoryTypeId = searchParams.get('categoryTypeId')
  
  useEffect(() => {
    axios
          .get(`http://localhost:8000/categories/${categoryId ?? 0}/category_types`, {
            headers: { Authorization: localStorage.getItem("jwt") },
          })
          .then((response) => {
            console.log(response.data);
            setSectionList(response.data);
          });
  },[categoryId])

  const handleSectionChange = (event) => {
    const url = new URL('http://localhost:8000');
    url.pathname = '/home';
    Number(categoryId) && url.searchParams.append('categoryId', categoryId);
    Number(event.target.value) && url.searchParams.append('categoryTypeId', event.target.value);
    navigate(`${url.pathname}${url.search}`, {replace: true})
   
    axios
      .get(
        `http://localhost:8000/categories/${event.target.value}/category_types`,
        { headers: { Authorization: localStorage.getItem("jwt") } }
      )
      .then((response) => {
        console.log("this one");
        console.log(response.data);

      });
  };

  return (
    <div id='filterborders' className='font-gsr mr-3 tracking-wide flex'>
        Interest: 
        <div className="font-bold ml-1">
        <select id='custom-select2' value={categoryTypeId ?? 0} 
          onChange={handleSectionChange}
          required={true}>
          <option value='0'>Show all</option>
          {sectionList.map((section) => {
            return (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            );
          })}
        </select>
      </div>
        </div>
  )
}

export default Type