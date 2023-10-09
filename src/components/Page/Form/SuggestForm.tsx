import React, { useContext, useState } from 'react';
import { CategoriesList, CenturiesList, TagsList } from '../../contexts';
import Cookies from 'js-cookie';
import './SuggestForm.scss';
import { ICategories, ICenturies, ITags } from '../../../@types/index';
import FieldInput from '../../Utils/Field/FieldInput';
import FieldTextarea from '../../Utils/Field/FieldTextarea';
import apiUrl from '../../App/config';

const SuggestForm = () => {
  const [name, setName] = useState<string>('');
  const [adress, setAdress] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
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
    setAdress('');
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
      const response = await fetch(`${apiUrl}/places/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          coordinate: '45.71301/5.12916',
          adress: adress,
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
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      resetForm();
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la soumission du formulaire."
      );
      console.error(error);
    }
  };

  const changeField = (
    value: string,
    name: 'name' | 'adress' | 'postcode' | 'city' | 'country' | 'description'
  ) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'adress') {
      setAdress(value);
    } else if (name === 'postcode') {
      setPostcode(value);
    } else if (name === 'city') {
      setCity(value);
    } else if (name === 'country') {
      setCountry(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleChangeField =
    (
      name: 'name' | 'adress' | 'postcode' | 'city' | 'country' | 'description'
    ) =>
    (value: string) => {
      changeField(value, name);
    };

  return (
    <div className="suggestForm-mainContainer">
      <form className="suggestForm-container" onSubmit={handleSubmit}>
        <h1 className="suggestForm-title">Proposez-nous un lieu</h1>
        <p>
          <span className="asterisk">*</span> champ obligatoire
        </p>
        <div className="container-container">
          <div className="first-container">
            <FieldInput
              type="text"
              placeholder="Nom du lieu"
              value={name}
              onChange={handleChangeField('name')}
              id="name"
              required
            />
            <FieldInput
              type="text"
              placeholder="Adresse"
              value={adress}
              onChange={handleChangeField('adress')}
              id="adress"
            />
            <FieldInput
              type="text"
              placeholder="Code Postal"
              value={postcode}
              onChange={handleChangeField('postcode')}
              id="postcode"
              required
            />
            <FieldInput
              type="text"
              placeholder="Ville"
              value={city}
              onChange={handleChangeField('city')}
              id="city"
              required
            />
            <FieldInput
              type="text"
              placeholder="Pays"
              value={country}
              onChange={handleChangeField('country')}
              id="country"
              required
            />
            <FieldTextarea
              placeholder="Description"
              value={description}
              onChange={handleChangeField('description')}
              id="description"
              required
            />
          </div>
          <div className="second-container">
            <div className="item-container">
              <label className="label-item" htmlFor="categories">
                Catégories<span className="asterisk">*</span>:
              </label>
              <select
                className="input-item"
                multiple
                id="categories"
                value={categoriesId}
                onChange={(e) =>
                  setCategoriesId(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required
              >
                {categoriesList.map((category: ICategories) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="item-container">
              <label className="label-item" htmlFor="tags">
                Tags<span className="asterisk">*</span>:
              </label>
              <select
                className="input-item"
                multiple
                id="tags"
                value={tagsId}
                onChange={(e) =>
                  setTagsId(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required
              >
                {tagsList.map((tag: ITags) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="item-container">
              <label className="label-item" htmlFor="centuries">
                Siècles<span className="asterisk">*</span>:
              </label>
              <select
                className="input-item"
                multiple
                id="centuries"
                value={centuriesId}
                onChange={(e) =>
                  setCenturiesId(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required
              >
                {centuriesList.map((century: ICenturies) => (
                  <option key={century.id} value={century.id}>
                    {century.century}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button className="btn-style-var" type="submit" disabled={isSubmitting}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default SuggestForm;
