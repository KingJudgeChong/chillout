import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [categoriesList, setCategoriesList] = useState([]);
  const categoryId = searchParams.get('categoryId')
  console.log(categoryId)
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        console.log(localStorage.getItem("jwt"));
        console.log(response.data);
        setCategoriesList(response.data);
      });
  }, []);

  const handleCategoryChange = (event) => {
    // const name_index = event.target.selectedIndex
    // const name = document.getElementById('category').options[name_index].text
    // alert(`you selected category ${name} with category_id ${event.target.value}`)
    navigate(`/home?categoryId=${event.target.value}`, {replace: true})
    axios
      .get(
        `http://localhost:8000/categories/${event.target.value}/category_types`,
        { headers: { Authorization: localStorage.getItem("jwt") } }
      )
      .then((response) => {
        console.log("CATEGORY POST");
        console.log(response.data);

      });
  };

  return (
    <div id="filterborders" className="font-gsr mr-3 tracking-wide flex">
      Category:
      <div className="font-bold ml-1">
        <select id='custom-select' value={categoryId ?? 0}
          onChange={handleCategoryChange}
          required={true}>
          <option value='0'>Show all</option>
          {categoriesList.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Category;
