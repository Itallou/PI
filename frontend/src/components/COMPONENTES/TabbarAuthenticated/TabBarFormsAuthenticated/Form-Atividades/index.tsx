'use client';

import { useState } from 'react';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

import OutlineButton from '@/components/COMPONENTES/OutlineButton';
import { Activity } from '@/lib/repository/activity/index.repository';
import axios from 'axios';

type CriarEventoProps = {
	handleNextClick: () => void;
};

export default function CriarAtividade({ handleNextClick }: CriarEventoProps) {
	const [title, setTitle] = useState('');
	const [descricao, setDescricao] = useState('');
	const [dia, setDia] = useState('');
	const [typeActivity, setTypeActivity] = useState('');
	const [guestName, setGuestName] = useState('');
	const [guestEmail, setGuestEmail] = useState('');
	const [timeActivity, setTimeActivity] = useState('');
	const [activities, setActivities] = useState<Activity[]>([]);

	const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleNextClick();
	};



	const handleAddOnTable = () => {
		setActivities((prev) => [
			...prev,
			{
				activityGuestEmail: guestEmail,
				activityDescription: descricao,
				activityTime: timeActivity,
				activityDate: dia,
				activityGuestName: guestName,
				activityType: typeActivity,
				activityTitle: title,
			},
		]);
		setTitle('');
		setDescricao('');
		setDia('');
		setTypeActivity('');
		setGuestName('');
		setGuestEmail('');
		setTimeActivity('');
	};

	const itemToRemove = (i: any) => {
		setActivities((prevActivities) => {
			const updatedArray = [...prevActivities];
			updatedArray.splice(i, 1);
			return updatedArray;
		});
	};

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/atividade', {
				titulo: title,
				descricao: descricao,
				dia: dia,
				horario: timeActivity,
			});
			console.log(response.data);
			handleAddOnTable();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mb-6 mt-52 flex justify-center">
			<div className="w-8/12">
				<h1
					className="text-center text-2xl font-bold text-black"
					style={{ color: '#ef0037' }}
				>
					Atividades
				</h1>
				<h2 className="text-center" style={{ color: '#000000' }}>
					Atividades presentes durante o evento
				</h2>
				<form className="mt-8 w-full">
					<div className="flex justify-center gap-5">
						<div className="w-full">
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="eventName">
									Título
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="activityTitle"
										id="activityTitle"
										placeholder="Titulo da atividade"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="descricao">
									Descrição
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<textarea
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										name="activityDescription"
										id="activityDescription"
										rows={6}
										value={descricao}
										onChange={(e) => setDescricao(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label
									className="mb-2 text-sm font-medium"
									htmlFor="dateInicio"
								>
									Dia da atividade
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="Date"
										name="dateActivity"
										id="dateActivity"
										value={dia}
										onChange={(e) => setDia(e.target.value)}
										required
									/>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="select">
									Selecionar Tipo de Atividade
								</label>

								<div className="mb-3 flex items-center">
									<div className="w-full rounded-md border border-gray-300 bg-white px-4 py-2">
										<select
											className="w-full rounded-md border-0 bg-white text-sm outline-none"
											name="selectType"
											id="selectType"
											value={typeActivity}
											onChange={(e) => setTypeActivity(e.target.value)}
											required
										>
											<option>Selecione</option>
											<option value="Palestra">Palestra</option>
											<option value="Pitch">Pitch</option>
										</select>
									</div>
									<div className="ml-3 cursor-pointer rounded-lg bg-[#EF0037] px-3 py-1">
										<a
											href="/dashboard/evento/criar-atividades"
											target="_blank"
											className="text-xl font-bold text-white"
										>
											+
										</a>
									</div>
								</div>
							</div>

							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="eventName">
									Nome do Convidado:
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="GuestName"
										id="GuestName"
										placeholder="Nome do convidado"
										value={guestName}
										onChange={(e) => setGuestName(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="eventName">
									Email do Convidado:
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="GuestEmail"
										id="GuestEmail"
										placeholder="Email do convidado"
										value={guestEmail}
										onChange={(e) => setGuestEmail(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="mb-5 flex flex-col">
								<label
									className="mb-2 text-sm font-medium"
									htmlFor="horaInicio"
								>
									Horário
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="time"
										name="timeActivity"
										id="timeActivity"
										value={timeActivity}
										onChange={(e) => setTimeActivity(e.target.value)}
										required
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						className="flex items-center justify-center gap-5"
						style={{ marginTop: '4rem' }}
					>
						<button
							className="mb-6 w-3/12 rounded-xl border-none p-2 text-center text-base font-medium text-white"
							style={{ backgroundColor: '#0391C9' }}
							type="button"
							onClick={handleSubmit}
							
						>
							Cadastrar Atividade
						</button>
					</div>
				</form>
				<div className="mt-8 flex items-center justify-center gap-5">
					<button
						className="mb-6 w-1/5 rounded-xl border-none p-2 text-center text-base font-medium text-white"
						style={{ backgroundColor: '#8A8A8A' }}
						type="submit"
					>
						Voltar
					</button>
					<button
						className="mb-6 w-1/5 rounded-xl border-none p-2 text-center text-base font-medium text-white"
						style={{ backgroundColor: '#4C1FA6' }}
						type="submit"
						onClick={handleNextButtonClick}
					>
						Avançar
					</button>
				</div>

				<div className="flex items-center justify-center gap-10">
					<table className="mt-12 w-full table-auto text-center">
						<thead style={{ backgroundColor: '#E4E4E4' }}>
							<tr className="h-14">
								<th scope="col">Título</th>
								<th scope="col" className="mr-10">
									Tipo
								</th>
								<th scope="col" className="mr-10">
									Nome convidado
								</th>
								<th scope="col" className="ml-10"></th>
							</tr>
						</thead>
						<tbody>
							{activities && (
								<>
									{activities.map((acitivity, index) => {
										return (
											<tr
												key={index}
												className="h-14"
												style={{
													backgroundColor: !(index % 2 === 0)
														? '#E4E4E4'
														: '#fff',
												}}
											>
												<td scope="row" className="">
													{acitivity.activityTitle}
												</td>
												<td className="">{acitivity.activityType}</td>
												<td className="">{acitivity.activityGuestName}</td>
												<td>
													<div className="flex items-center justify-center gap-4">
														<OutlineButton
															label="Editar"
															outlineColorHex="rgb(79, 70, 229)"
															textColorHex="rgb(79, 70, 229)"
															icon={<FaRegEdit />}
															customWidth="35%"
														/>
														<OutlineButton
															label="Excluir"
															outlineColorHex="#BF0000"
															textColorHex="#BF0000"
															icon={<FaRegTrashCan />}
															customWidth="35%"
															onClick={() => itemToRemove(index)}
														/>
													</div>
												</td>
											</tr>
										);
									})}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
