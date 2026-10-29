import { useState, type ChangeEvent, type JSX } from 'react';
import modalStyle from './addProcedure.module.scss';
import { useNavigate } from 'react-router-dom';
import { toastInfo } from '../../../toastr/info/toastr-options-info';
import { toastSuccess } from '../../../toastr/success/toastr-options-success';
import { toastError } from '../../../toastr/error/toastr-options-error';
import instance from '../../../api/request';
interface props {
  modalWindow: boolean;
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddProcedureWindow({ openModalWindow }: props): JSX.Element {
  const [newProcedure, setProcedureInfo] = useState({
    title: '',
    price: 100,
    duration: '',
    category: '',
    description: '',
    imgUrl: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const clickToClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      openModalWindow(false);
      navigate('/procedures');
    }
  };

  const closeWindow = () => {
    openModalWindow(false);
    navigate('/procedures');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[а-яА-ЯіІїЇєЄґҐ\s'’-]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      setProcedureInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    if (/^[0-8а-яА-ЯіІїЇєЄґҐ '’-]*$/.test(e.target.value)) {
      setProcedureInfo((prev) => ({ ...prev, description: e.target.value }));
    }
  };

  const handleImgUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProcedureInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (
      newProcedure.title.length < 2 ||
      newProcedure.price <= 0 ||
      newProcedure.duration.length <= 0 ||
      newProcedure.category.length <= 0 ||
      newProcedure.description.length <= 0 ||
      newProcedure.imgUrl.length <= 0
    ) {
      toastInfo('Введіть коректні дані.', 'Некоректні дані');
      return;
    }
    console.log(newProcedure);
    try {
      await instance.post('/api/procedures', newProcedure);
      toastSuccess('Дані збережено.', 'Процедуру створено.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error, 'Помилка завантаження даних:');
    }
    closeWindow();
  };

  return (
    <div className={modalStyle.modal} onClick={clickToClose}>
      <div className={`${modalStyle.content} ${modalStyle.scrollStyled}`}>
        <button className={modalStyle.close} onClick={closeWindow}>
          &times;
        </button>
        <h2>Додавання нової процедури</h2>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="title"
            placeholder="Назва процедури"
            value={newProcedure.title}
            onChange={handleTitleChange}
            style={isSubmitted && newProcedure.title.length < 2 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="number"
            name="price"
            placeholder="Ціна процедури"
            value={newProcedure.price}
            onChange={handleImgUrlChange}
            style={isSubmitted && newProcedure.price <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="duration"
            placeholder="Тривалість процедури"
            value={newProcedure.duration}
            onChange={handleDescChange}
            style={
              isSubmitted && newProcedure.duration.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="category"
            placeholder="Категорія процедури"
            value={newProcedure.category}
            onChange={handleDescChange}
            style={
              isSubmitted && newProcedure.category.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <textarea
            name="description"
            placeholder="Опис процедури"
            value={newProcedure.description}
            onChange={handleDescChange}
            style={
              isSubmitted && newProcedure.description.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <div className={modalStyle.inputContainer}>
          <input
            type="text"
            name="imgUrl"
            placeholder="Посилання на зображення процедури"
            value={newProcedure.imgUrl}
            onChange={handleImgUrlChange}
            style={isSubmitted && newProcedure.imgUrl.length <= 0 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <button type="button" onClick={handleSubmit} className={modalStyle.saveButton}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
