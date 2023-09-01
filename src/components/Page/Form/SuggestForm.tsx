import React, { useContext, useState } from 'react';
import { CategoriesList, CenturiesList, TagsList } from '../../contexts';
import Cookies from 'js-cookie';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Tags = {
  id: number;
  name: string;
};

type Centuries = {
  id: number;
  period: string;
  century: string;
};

const SuggestForm = () => {
  const [name, setName] = useState<string>('');
  const [postcode, setPostcode] = useState<string>();
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoriesId, setCategoriesId] = useState<string[]>([]);
  const [centuriesId, setCenturiesId] = useState<string[]>([]);
  const [tagsId, setTagsId] = useState<string[]>([]);

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categoriesList = useContext(CategoriesList);
  const centuriesList = useContext(CenturiesList);
  const tagsList = useContext(TagsList);

  const resetForm = () => {
    setName('');
    setPostcode('');
    setCity('');
    setCountry('');
    setDescription('');
    setCategoriesId([]);
    setCenturiesId([]);
    setTagsId([]);
    setError('');
    setIsSubmitting(false);
  };
  const token = Cookies.get('jwtToken');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    try {
      const response = await fetch(
        'http://ludoviclebris-server.eddi.cloud/api/api/places/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            coordinate: '45.71301/5.12916',
            postcode: postcode,
            city: city,
            country: country,
            pictures: [],
            slug: name,
            description: description,
            is_valid: 0,
            categoriesId: categoriesId,
            centuriesId: centuriesId,
            tagsId: tagsId,
          }),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      resetForm();
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la soumission du formulaire."
      );
      console.error(error);
    }
  };
  console.log(categoriesId);
  console.log(centuriesId);
  console.log(tagsId);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom du lieu:</label>
        <input
          type="text"
          aria-label="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="postcode">Code Postal:</label>
        <input
          type="string"
          aria-label="postcode"
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="city">Ville:</label>
        <input
          type="text"
          aria-label="city"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Pays:</label>
        <input
          type="country"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="categories">Catégories:</label>
        <select
          multiple
          id="categories"
          value={categoriesId}
          onChange={(e) =>
            setCategoriesId(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          required
        >
          {categoriesList.map((category: Category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags">Tags:</label>
        <select
          multiple
          id="tags"
          value={tagsId}
          onChange={(e) =>
            setTagsId(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          required
        >
          {tagsList.map((tag: Tags) => (
            <option value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="centuries">Siècles:</label>
        <select
          multiple
          id="centuries"
          value={centuriesId}
          onChange={(e) =>
            setCenturiesId(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          required
        >
          {centuriesList.map((century: Centuries) => (
            <option value={century.id}>{century.century}</option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        Envoyer
      </button>
    </form>
  );
};

export default SuggestForm;
