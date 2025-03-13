import { useState } from 'react';
import styles from './App.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

/*const initialState = {
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
							className={styles.passButtonOn}
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
		)
} */

//  React Hook Form и Yup.

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			'Некорректный адрес электронной почты. Проверьте формат (пример: user@mail.ru).',
		),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z]).{6,}$/,
			'Пароль должен содержать минимум 6 символов и хотя бы одну заглавную букву.',
		),
	copyPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

function App() {
	const [showPass, setShowPass] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			copyPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		console.log('Данные регистрации:', data);
		setSubmitError('');
		reset();
	};

	const passVisibility = () => {
		setShowPass(!showPass);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						{...register('email')}
						className={styles.input}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">Пароль:</label>
					<div className={styles.passwordInput}>
						<input
							type={showPass ? 'text' : 'password'}
							id="password"
							{...register('password')}
							className={styles.input}
						/>
						<button
							type="button"
							onClick={passVisibility}
							className={styles.passButtonOn}
						>
							{showPass ? 'Скрыть пароль' : 'Показать пароль'}
						</button>
					</div>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="copyPassword">Подтвердите пароль:</label>
					<div className={styles.passwordInput}>
						<input
							type={showPass ? 'text' : 'password'}
							id="copyPassword"
							{...register('copyPassword')}
							className={styles.input}
						/>
					</div>
					{errors.copyPassword && (
						<p className={styles.error}>{errors.copyPassword.message}</p>
					)}
				</div>
				<button type="submit" disabled={!isValid} className={styles.button}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
