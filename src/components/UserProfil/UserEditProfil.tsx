import { IoIosArrowBack } from 'react-icons/io';
import './UserEditProfil.scss';
import { useContext } from 'react';
import { Context } from '../App/App';

const UserEditProfil = () => {
  const context = useContext(Context);

  if (!context) {
    // Le contexte n'est pas encore défini, vous pouvez choisir de rendre un état de chargement
    return <div>Loading...</div>;
  }

  const { setEditVisible } = context;
  return (
    <>
      <div
        className="edit-profil-bg"
        onClick={() => setEditVisible(false)}
      ></div>
      <form className="profil-edit-container">
        <div className="profil-edit-header">
          <label
            className="profil-edit-back-btn"
            onClick={() => setEditVisible(false)}
          >
            <IoIosArrowBack />
          </label>
          <h2>Mon profil</h2>
        </div>
        <div className="profil-edit-content">
          <label className="profil-edit-avatar" htmlFor="edit-profile-image">
            Télécharger une image
          </label>
          <input
            type="file"
            id="edit-profile-image"
            name="profileImage"
            accept="image/*"
          />
          <div className="profil-edit-pseudo">
            <input type="text" placeholder="Pseudo" />
          </div>
          <div className="profil-edit-name">
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Nom" />
          </div>
          <div className="profil-edit-inofs">
            <input type="email" placeholder="Adresse e-mail" />
            <input type="password" placeholder="Mot de passe" />
          </div>
          <button
            className="profil-edit-validation"
            type="submit"
            onClick={() => setEditVisible(false)}
          >
            Valider modification
          </button>
        </div>
        <div className="profil-footer"></div>
      </form>
    </>
  );
};

export default UserEditProfil;
