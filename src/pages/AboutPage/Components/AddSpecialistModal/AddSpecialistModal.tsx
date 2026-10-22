import { useState, type ChangeEvent, type JSX } from 'react';
import modalStyle from './addSpecialist.module.scss';
import { useNavigate } from 'react-router-dom';
import type { ISpecialist } from '../../../../common/interfaces/ISpecialist';
import { toastInfo } from '../../../../toastr/info/toastr-options-info';
import { toastSuccess } from '../../../../toastr/success/toastr-options-success';

interface props {
  modalWindow: boolean;
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddSpecialistModal({ openModalWindow }: props): JSX.Element {
  const [newSpecialist, setSpecialistInfo] = useState<ISpecialist>({
    id: 0,
    name: '',
    surname: '',
    specialty: '',
    experience: '',
    description: '',
    imgUrl: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const clickToClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      openModalWindow(false);
      navigate('/aboutUs');
    }
  };

  const closeWindow = () => {
    openModalWindow(false);
    navigate('/aboutUs');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[а-яА-ЯіІїЇєЄґҐ'’-]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      if (name === 'name') setSpecialistInfo((prev) => ({ ...prev, name: value }));
      if (name === 'surname') setSpecialistInfo((prev) => ({ ...prev, surname: value }));
      if (name === 'specialty') setSpecialistInfo((prev) => ({ ...prev, specialty: value }));
      if (name === 'experience') setSpecialistInfo((prev) => ({ ...prev, experience: value }));
      if (name === 'description') setSpecialistInfo((prev) => ({ ...prev, description: value }));
      if (name === 'imgUrl') setSpecialistInfo((prev) => ({ ...prev, imgUrl: value }));
    }
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[0-8а-яА-ЯіІїЇєЄґҐ'’-]*$/.test(e.target.value)) {
      setSpecialistInfo((prev) => ({ ...prev, experience: e.target.value }));
    }
  };

  const handleImgUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecialistInfo((prev) => ({ ...prev, imgUrl: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (
      newSpecialist.name.length < 2 ||
      newSpecialist.surname.length < 3 ||
      newSpecialist.specialty.length < 5 ||
      newSpecialist.experience.length <= 0 ||
      newSpecialist.description.length < 10 ||
      newSpecialist.imgUrl.length <= 0
    ) {
      toastInfo('Введіть коректні дані.', 'Некоректні дані');
      return;
    }
    console.log(newSpecialist);
    toastSuccess('Дані збережено.', 'Дані успішно змінені.');
    closeWindow();
  };

  return (
    <div className={modalStyle.modal} onClick={clickToClose}>
      <div className={`${modalStyle.content} ${modalStyle.scrollStyled}`}>
        <button className={modalStyle.close} onClick={closeWindow}>
          &times;
        </button>
        <h2>Додавання нового спеціаліста</h2>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="name"
            placeholder="Iм'я спеціаліста"
            value={newSpecialist.name}
            onChange={handleNameChange}
            style={isSubmitted && newSpecialist.name.length < 2 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="surname"
            placeholder="Прізвище спеціаліста"
            value={newSpecialist.surname}
            onChange={handleNameChange}
            style={
              isSubmitted && newSpecialist.surname.length < 3 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="specialty"
            placeholder="Спеціальність"
            value={newSpecialist.specialty}
            onChange={handleNameChange}
            style={
              isSubmitted && newSpecialist.specialty.length < 5 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="experience"
            placeholder="Досвід роботи"
            value={newSpecialist.experience}
            onChange={handleExperienceChange}
            style={
              isSubmitted && newSpecialist.experience.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="description"
            placeholder="Трохи інформації про спеціаліста"
            value={newSpecialist.description}
            onChange={handleNameChange}
            style={
              isSubmitted && newSpecialist.description.length < 10 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="imgUrl"
            placeholder="Посилання на фото спеціаліста"
            value={newSpecialist.imgUrl}
            onChange={handleImgUrlChange}
            style={
              isSubmitted && newSpecialist.imgUrl.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <button type="button" onClick={handleSubmit} className={modalStyle.saveButton}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
