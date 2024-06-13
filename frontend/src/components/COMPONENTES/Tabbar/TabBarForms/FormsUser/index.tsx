'use client';

import { useState } from 'react';

import AlertCard from '@/components/COMPONENTES/AlertCard';
import CheckInput from '@/components/COMPONENTES/CheckInput';
import DefaultButton from '@/components/COMPONENTES/DefaultButton';
import NormalInput from '@/components/COMPONENTES/NormalInput';
import Title from '@/components/COMPONENTES/Title';
import axios from 'axios';

export default function CadastroUser() {
	const [name, setName] = useState('');
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');
	const [cargo, setCargo] = useState('');
	const [email, setEmail] = useState('');
	const [instituicao, setInst] = useState('');
	const [curso, setCurso] = useState('');

	const checkboxPeriodo = ['Matutino', 'Vespertino', 'Noturno'];
	const handleCheckboxChangeEvento = (index: any) => {
		//criar setCheckboxes periodo
		setCheckboxes((prev) => {
			const newCheckboxes = [...prev];
			newCheckboxes[index] = !newCheckboxes[index];
			return newCheckboxes;
		});
	};

	// funcao no evento:
	const checkboxNames = ['Organizador', 'Chair', 'Avaliador', 'Admin'];
	const [checkboxes, setCheckboxes] = useState(checkboxNames.map(() => false));
	const [areas, setAreas] = useState(['']);
	const [ass, setAss] = useState(['']);
	const [showCard, setShowCard] = useState(false);

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: '100%',
			height: 'auto',
			borderRadius: '0.375rem',
			border: '1',
			background: 'white',
			fontSize: '0.875rem',
		}),
	};

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/userProfile', {
				nome: name,
				email: email,
				senha: password,
				cpf: cpf,
				cargo: cargo,
			});
			console.log(response.data);
			
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-submenu">
			<div className="w-[60vw]">
				<AlertCard message="Aluno cadastrado com sucesso" show={showCard} />

				<Title
					title="Cadastro como usuário"
					subtitle="Cadastro como usuário - Aluno"
					colorHex="#4B00E0"
				/>

				<form className="card mt-8 w-full" onSubmit={handleSubmit}>
					<div className="flex flex-wrap items-center justify-center gap-5">
						<NormalInput
							id="fullName"
							label="Nome completo"
							placeholder="Nome do aluno"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<NormalInput
							id="email"
							label="E-mail"
							placeholder="emailuser@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
						/>
						<NormalInput
							id="password"
							label="Senha"
							placeholder="Senha do Usuário"
							type="password"
							required
							value={password}
						/>
						<NormalInput
							id="confirmPassword"
							label="Confirmar Senha"
							placeholder="Senha do Usuário"
							type="password"
							required
						/>
						<NormalInput
							id="cpf"
							label="CPF"
							placeholder="CPF do Usuário"
							value={cpf}
							onChange={(e) => setCpf(e.target.value)}
							required
							type="text"
						/>
						<NormalInput
							id="institution"
							label="Instituição Referente"
							placeholder="Instituição do Usuário"
							value={instituicao}
							onChange={(e) => setInst(e.target.value)}
							required
							type="text"
						/>

						<NormalInput
							id="curso"
							label="Curso"
							placeholder="Análise e Desenvolvimento de Sistemas"
							value={curso}
							onChange={(e) => setCurso(e.target.value)}
							required
						/>

						<div className="mb-5 flex w-[45%] items-center justify-around ">
							<label className="text-sm font-medium">
								Cadastrar mais Instituições
							</label>

							<button
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-red-500"
								type="button"
							>
								<p className="text-3xl text-white">+</p>
							</button>
						</div>

						<div className="mb-5 flex w-[45%] flex-col">
							<label className="mb-2 text-sm font-medium" htmlFor="periodo">
								Período de Estudo:
							</label>
							<div className="flex items-center gap-3 py-1">
								{checkboxPeriodo.map((period, index) => (
									<CheckInput
										disabled={false}
										id={`${period}-${index}`}
										label={period}
										selected={false}
										key={index}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="my-6">
						<p className="text-center text-xs font-normal text-slate-400">
							Já tem uma conta?
							<a
								className="cursor-pointer font-bold text-[#4B00E0] underline"
								href="/login"
							>
								Log in
							</a>
						</p>
					</div>
					<div className="flex items-center justify-center gap-5">
						<DefaultButton backgroundColorHex="#8A8A8A" label="Voltar" />
						<DefaultButton
							backgroundColorHex="#4B00E0"
							label="Cadastrar"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
