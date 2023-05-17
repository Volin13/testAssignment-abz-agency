import React from 'react';
import css from './WorkerCard.module.css';

const WorkerCard = ({ name, email, phone, position, photo }) => {
  const setDefaultAvatar = photo => {
    const falsePath =
      'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png';
    const defaultImgUrl =
      '/assets/images/WorkerCard/person-gesturing-no-svgrepo-com.svg';
    return photo === falsePath ? defaultImgUrl : photo;
  };

  return (
    <div className={css.workerCard}>
      <div className={css.workerCardImageThumb}>
        <img
          src={setDefaultAvatar(photo)}
          alt={name}
          className={css.workerCardImage}
        />
      </div>
      <h3 className={css.workerCardName}>{name}</h3>
      <p className={css.workerCardPosition}>{position}</p>
      <p className={css.workerCardEmail}>{email}</p>
      <p className={css.workerCardPhone}>{phone}</p>
    </div>
  );
};

export default WorkerCard;
