import React, { useState } from 'react';
import styles from './App.module.css';

const initialState = {
	email: '',
	password: '',
	copyPassword: '',
};

function App() {
	const [state, setState] = useState(initialState);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [copyPasswordError, setCopyPasswordError] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const { email, password, copyPassword } = state;
	const [showPass, setShowPass] = useState(false);

	const updateState = (fieldName, newValue) => {
		setState((prevState) => ({ ...prevState, [fieldName]: newValue }));
	};

	const resetState = () => {
		setState(initialState);
	};

	const handleChange = ({ target }) => {
		updateState(target.name, target.value);
		setSubmitError('');
		setIsFormValid(true);
	};

	const validateForm = () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
		let valid = true;
		setEmailError('');
		setPasswordError('');
		setCopyPasswordError('');

		if (!email) {
			setEmailError('Введите email');
			valid = false;
		} else if (!emailRegex.test(email)) {
			setEmailError(
				'Некорректный адрес электронной почты. Проверьте формат (пример: user@mail.ru).',
			);
			valid = false;
		}

		if (!password) {
			setPasswordError('Введите пароль');
			valid = false;
		} else if (!passwordRegex.test(password)) {
			setPasswordError(
				'Пароль должен содержать минимум 6 символов и хотя бы одну заглавную букву',
			);
			valid = false;
		}

		if (password !== copyPassword) {
			setCopyPasswordError('Пароли не совпадают');
			valid = false;
		}

		setIsFormValid(valid);
		return valid;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const isValid = validateForm();

		if (!isValid) {
			setSubmitError('Пожалуйста, заполните форму правильно.');
		} else {
			console.log('Данные регистрации:', state);
			setSubmitError('');
			resetState();
		}
	};

	const passVisibility = () => {
		setShowPass(!showPass);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
					{emailError && <p className={styles.error}>{emailError}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">Пароль:</label>
					<input
						type={showPass ? 'text' : 'password'}
						id="password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
					<button
						type="button"
						onClick={passVisibility}
						className={styles.passButonOn}
					>
						{showPass ? 'Скрыть пароль' : 'Показать пароль'}
					</button>
					{passwordError && <p className={styles.error}>{passwordError}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="copyPassword">Повторите пароль:</label>
					<input
						type="password"
						id="copyPassword"
						name="copyPassword"
						value={copyPassword}
						onChange={handleChange}
					/>
					{copyPasswordError && (
						<p className={styles.error}>{copyPasswordError}</p>
					)}
				</div>
				<button type="submit" disabled={!isFormValid} className={styles.button}>
					Зарегистрироваться
				</button>
				{submitError && <p className={styles.submitError}>{submitError}</p>}{' '}
			</form>
		</div>
	);
}

export default App;
