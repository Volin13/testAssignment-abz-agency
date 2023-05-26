import React, { useEffect, useState } from 'react';
import css from './WorkersSection.module.css';
import { getWorkersList } from '../../servises/API';
import WorkerCard from './WorkerCard';
import Button from '../../UI/UX/Button/Button';
let isLoadWorkersList = false;

const WorkersSection = () => {
  const [workersList, setWorkersList] = useState([]);
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const handleLoadMoreBtnClick = () => {
    setCount(count => count + 6);
  };
  useEffect(() => {
    if (isLoadWorkersList) return;
    isLoadWorkersList = true;

    const getWorkers = async () => {
      const data = (await getWorkersList(1, count)) || [];
      return data;
    };
    getWorkers()
      .then(data => {
        if (!data.success) return;
        setWorkersList(data);
        setLoading(true);
      })
      .catch(erorr => {
        console.log(erorr.message);
      })
      .finally(() => {
        isLoadWorkersList = false;
        setLoading(false);
      });
  }, [count]);
  return (
    <div className="container">
      {workersList?.success === true ? (
        <ul className={css.workersList}>
          {workersList?.users.map(listItem => {
            const { id, name, email, phone, position, photo } = listItem;
            return (
              <li key={id} className={css.item}>
                <WorkerCard
                  name={name}
                  email={email}
                  phone={phone}
                  position={position}
                  photo={photo}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{workersList?.message}</p>
      )}
      <Button
        text="Show more"
        type="button"
        btnFormatting={css.btn}
        disabled={loading || count >= 60}
        onClick={handleLoadMoreBtnClick}
        loading={loading}
      />
    </div>
  );
};

export default WorkersSection;
