import React, { useEffect, useState } from 'react';
import css from './WorkerDataForm.module.css';
import { useFormik } from 'formik';
import { getPositionsId, postWorkerData, getToken } from '../../servises/API';
import * as yup from 'yup';
import HelperText from '../../ReusableComponents/HelperText/HelperText';
import Button from '../../ReusableComponents/Button/Button';
let isLoadedPositionId = false;
let isLoadedToken = false;

let initialValues = {
  name: '',
  email: '',
  phone: '',
  position_id: null,
  photo: null,
};
const WorkerDataForm = () => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [positionIdList, setPositionIdList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (isLoadedPositionId) return;
    if (isLoadedToken) return;
    isLoadedPositionId = true;
    isLoadedToken = true;
    const getCurrentToken = async () => {
      const data = (await getToken()) || '';
      return data;
    };
    getCurrentToken()
      .then(data => {
        if (!data.success) return;
        setToken(data.token);
      })
      .catch(erorr => {
        console.log(erorr.message);
      })
      .finally(() => {
        isLoadedToken = false;
      });
    const getWorkers = async () => {
      const data = (await getPositionsId()) || [];
      return data;
    };
    getWorkers()
      .then(data => {
        if (!data.success) return;
        setPositionIdList(data.positions);
        setLoading(true);
      })
      .catch(erorr => {
        console.log(erorr.message);
      })
      .finally(() => {
        isLoadedPositionId = false;
        setLoading(false);
      });
  }, [token]);

  console.log(positionIdList);

  const handleImageChange = e => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      formik.setFieldValue('photo', selectedFile);
      setPhoto(selectedFile);
    } else {
      formik.setFieldValue('photo', null);
      setPhoto(null);
    }
  };
  const myEmailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  let workersDataSchma = yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(/^[a-zA-Zа-яА-ЯА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]+$/, {
        message: 'Spaces and pecial symbols are not allowed',
      })
      .min(2, 'Your name must be 1 character at least')
      .max(60, '16 characters max')
      .required('Type your name please'),
    email: yup
      .string()
      .matches(myEmailRegex, {
        message: 'Your email must be valid',
        name: 'email',
      })
      .min(2, 'Your email is too short')
      .max(100, 'Your email is too long')
      .lowercase()
      .required('Type your email please'),
    phone: yup
      .string()
      .trim()
      .matches(/^[+]{0,1}380([0-9]{9})$/, {
        message:
          'Special symbols are not allowed. Number should start with code of Ukraine +380',
      })
      .min(13, 'Your phone number must be 13 at least')
      .max(13, 'Your phone number must be 13 characters max')
      .required('Type your phone number please'),
    position_id: yup.string().required('Choose your position'),
    photo: yup
      .mixed()
      .nullable()
      .test('type', 'Only jpg/jpeg files are allowed', value => {
        return !value || (value && ['image/jpeg'].includes(value.type));
      })
      .test('size', 'The image weight must be less than 5 MB', value => {
        return !value || (value && value.size <= 5000000);
      })
      .required('Type add your photo please'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: workersDataSchma,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      postWorkerData(token, values);
      setSubmitting(false);
    },
  });
  const isValid = workersDataSchma.isValidSync(formik.values);
  if (typeof formik.values.position_id === 'string') {
    formik.setFieldValue('position_id', Number(formik.values.position_id));
  }
  console.log(formik.values);

  return (
    <div className="container">
      <form
        onSubmit={formik.handleSubmit}
        schema={workersDataSchma}
        className={css.workersDataform}
      >
        <div className={css.formIinputFormat}>
          <input
            autoComplete="name"
            className={css.workersDataInput}
            placeholder="Your name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && (
            <HelperText
              value={formik.values.name}
              errorText={formik.errors.name}
            />
          )}
        </div>

        <div className={css.formIinputFormat}>
          <input
            autoComplete="email"
            className={css.workersDataInput}
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <HelperText
              value={formik.values.email}
              errorText={formik.errors.email}
            />
          )}
        </div>

        <div className={css.formIinputFormat}>
          <input
            autoComplete="current-password"
            className={css.workersDataInput}
            placeholder="Phone"
            id="standard-required-register-pass"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.values.phone ? (
            <HelperText
              value={formik.values.phone}
              errorText={formik.errors.phone}
            />
          ) : (
            <HelperText textSucsess="+38 (XXX) XXX - XX - XX" />
          )}
        </div>

        <div className={css.radioGrupe}>
          <p className={css.radioGrupeTitle}>Select your position</p>
          <ul>
            {positionIdList.map(listItem => {
              const { id, name } = listItem;

              return (
                <li key={id}>
                  <label className={css.radioGrupeInput}>
                    <input
                      type="radio"
                      name="position_id"
                      value={id}
                      onChange={formik.handleChange}
                    />
                    {name}
                  </label>
                </li>
              );
            })}
          </ul>
          {formik.errors.position_id && formik.touched.position_id && (
            <HelperText
              value={formik.values.position_id}
              errorText={formik.errors.position_id}
            />
          )}
        </div>
        <div className={css.avatarChanger}>
          <input
            type="text"
            readOnly
            value={photo ? photo.name : 'Upload your photo'}
            className={css.mockInput}
          />
          <label htmlFor="newAvatartURL" className={css.avatarChangerLebel}>
            <div className={css.mockButton}>Upload</div>

            <div>
              <input
                type="file"
                name="newAvatartURL"
                onChange={e => {
                  handleImageChange(e);
                }}
                className={css.inputTypeFile}
                id="newAvatartURL"
                accept="image/*"
              />
              <small className={css.fileErorr}>{formik.errors.photo}</small>
            </div>
          </label>
        </div>
        <Button
          btnFormatting={css.workersDataFormBtn}
          type="submit"
          disabled={loading || !isValid}
          text="Sign Up"
        />
      </form>
    </div>
  );
};
export default WorkerDataForm;
