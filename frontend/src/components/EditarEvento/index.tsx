'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

import AlertCard from '@/components/COMPONENTES/AlertCard';
import { Area } from '@/lib/repository/area/index.repository';
import { Comissao } from '@/lib/repository/comission/index.repository';
import { Event } from '@/lib/repository/event/index.repository';

export default function EditarEvento() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [descricao, setDescricao] = useState('');
	const [tipo, setTipo] = useState('');
	const [assuntoPrincipal, setAssuntoPrincipal] = useState('');
	const [cep, setCep] = useState('');
	const [local, setLocal] = useState('');
	const [dataInicio, setDataInicio] = useState('');
	const [dataFinal, setDataFinal] = useState('');
	const [horarioInicio, setHorarioInicio] = useState('');
	const [horarioFinal, setHorarioFinal] = useState('');
	const [comissaoId, setComissaoId] = useState('');

	const [showCard, setShowCard] = useState(false);

	const [publico, setPublico] = useState(false);
	const [privado, setPrivado] = useState(false);
	const [anais, setAnais] = useState(false);
	const [certificados, setCertificados] = useState(false);

	const checkboxEvento = ['Público', 'Privado'];
	const [checkboxes, setCheckboxes] = useState(checkboxEvento.map(() => false));
	const checkboxGerar = ['Anais', 'Certificados'];
	const [checkboxesGerar, setCheckboxesGerar] = useState(
		checkboxGerar.map(() => false)
	);
	const [areas, setAreas] = useState(['']);
	const [ass, setAss] = useState(['']);
	const handleAddArea = (
		setArea: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		const lastArea =
			setArea === setAreas ? areas[areas.length - 1] : ass[ass.length - 1];
		if (lastArea.trim() !== '') {
			setArea((prevAreas) => [...prevAreas, '']);
		}
	};
	const handleRemoveArea = (
		index: number,
		setArea: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		setArea((prevAreas) => prevAreas.filter((_, i) => i !== index));
	};
	const handleAreaChange = (
		index: number,
		value: string,
		setArea: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		const newAreas = [...(setArea === setAreas ? areas : ass)];
		newAreas[index] = value;
		setArea(newAreas);
	};

	const handleCheckboxChangeEvento = (index: any) => {
		setCheckboxes((prev) => {
			const newCheckboxes = [...prev];
			newCheckboxes[index] = !newCheckboxes[index];
			return newCheckboxes;
		});
	};
	const handleCheckboxChangeGerar = (index: any) => {
		setCheckboxesGerar((prev) => {
			const newCheckboxes = [...prev];
			newCheckboxes[index] = !newCheckboxes[index];
			return newCheckboxes;
		});
	};

	const [file, setFile] = useState<File | null>(null);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files && e.target.files[0];

		if (selectedFile) {
			setFile(selectedFile);
		}
	};
	const handleFileDelete = () => {
		setFile(null);
	};

	const checkboxPeriodo = ['Matutino', 'Vespertino', 'Noturno'];
	const [checkboxesPeriodos, setCheckboxesPeri] = useState(
		checkboxPeriodo.map(() => false)
	);
	const handleCheckboxChangePeriodo = (index: any) => {
		setCheckboxesPeri((prev) => {
			const newCheckboxes = [...prev];
			newCheckboxes[index] = !newCheckboxes[index];
			return newCheckboxes;
		});
	};

	useEffect(() => {
		const getInfos = async () => {
			try {
				setNome('');
				setEmail('');
				setDescricao('');
				setTipo('');
				setAssuntoPrincipal('');
				setCep('');
				setLocal('');
				setDataInicio('');
				setDataFinal('');
				setHorarioInicio('');
				setHorarioFinal('');
				setComissaoId('');
				const id = localStorage.getItem('eventId');
				const result = await axios.get(`http://localhost:5002/event/${id}`);
				const resultAreas = await axios.get(
					`http://localhost:5002/area-event/${id}`
				);
				if (result.data.event && resultAreas.data.areas) {
					const event: Event = result.data.event;
					setNome(event.nomeEvento);
					setEmail(event.emailEvento);
					setDescricao(event.descricao);
					setTipo(event.tipo);
					setAssuntoPrincipal(event.assuntoPrincipal);
					setCep(event.cep ?? cep);
					setLocal(event.local ?? local);
					setDataInicio(event.dataInicio ?? dataInicio);
					setDataFinal(event.dataFinal ?? dataFinal);
					setHorarioInicio(event.horarioInicio ?? horarioInicio);
					setHorarioFinal(event.horarioFim ?? horarioFinal);
					setComissaoId(event.comissaoId);
					if (event.privado) {
						handleCheckboxChangeEvento(1);
					} else {
						handleCheckboxChangeEvento(0);
					}

					if (event.anais) {
						handleCheckboxChangeGerar(0);
					}
					if (event.certificados) {
						handleCheckboxChangeGerar(1);
					}
					// const checkboxPeriodo = ['Matutino', 'Vespertino', 'Noturno'];
					if (event.periodo === checkboxPeriodo[0]) {
						handleCheckboxChangePeriodo(0);
					}
					if (event.periodo === checkboxPeriodo[1]) {
						handleCheckboxChangePeriodo(1);
					}
					if (event.periodo === checkboxPeriodo[2]) {
						handleCheckboxChangePeriodo(2);
					}
					const areasComming: Area[] = resultAreas.data.areas;
					// const areasValueLabel = areasComming.map((area) => {
					// 	const labelvalue = { value: area.id, label: area.nome };
					// 	return labelvalue;
					// });
					// console.log(areasValueLabel);
					setAreas(areasComming.map((area) => area.nome));
				}
			} catch (error) {
				console.log(error);
			}
		};
		getInfos();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const eventID = localStorage.getItem('eventId');
		// const eventID = '4cfc3ed4-bac2-4224-b5ef-6ac09a24890a';
		if (eventID) {
			const data: Event = {
				comissaoId: comissaoId,
				anais: checkboxesGerar[0],
				certificados: checkboxesGerar[1],
				assuntoPrincipal: assuntoPrincipal,
				descricao: descricao,
				emailEvento: email,
				nomeEvento: nome,
				privado: checkboxes[1],
				tipo,
				logo: file ? file.name : null,
				local: local,
				cep: cep,
				dataInicio: dataInicio,
				dataFinal: dataFinal,
				horarioInicio: horarioInicio,
				horarioFim: horarioFinal,
				periodo: checkboxPeriodo[0] || checkboxPeriodo[1] || checkboxPeriodo[2],
			};

			try {
				const result = await axios.put(
					`http://localhost:5002/event/${eventID}`,
					data
				);
				if (result.data.eventUpdated) {
					console.log(result);
					setShowCard(true);
					setTimeout(() => {
						setShowCard(false);
					}, 3000);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="container">
			<div className="w-[60vw]">
				<h1
					className="text-center text-2xl font-bold text-black"
					style={{ color: '#ef0037' }}
				>
					Edite seu evento!
				</h1>
				<AlertCard message="Evento atualizado com sucesso" show={showCard} />
				<form className="mt-8 w-full" onSubmit={handleSubmit}>
					<div className="flex justify-center gap-5">
						<div className="w-full">
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="eventName">
									Nome do Evento
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="eventName"
										id="feventName"
										placeholder="Nome do Evento"
										value={nome}
										onChange={(e) => setNome(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="descricao">
									Descrição do Evento
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<textarea
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										name="descricao"
										id="descricao"
										placeholder="Descrição do Evento"
										rows={4}
										value={descricao}
										onChange={(e) => setDescricao(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="select">
									Selecione
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<select
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										name="select"
										id="select"
										value={tipo}
										onChange={(e) => setTipo(e.target.value)}
										required
									>
										<option value="Presencial">Presencial</option>
										<option value="Hibrido">Híbrido</option>
										<option value="Remoto">Remoto</option>
									</select>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="assunto">
									Assunto Principal
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="assunto"
										id="assunto"
										placeholder="Assunto Principal do Evento"
										value={assuntoPrincipal}
										onChange={(e) => setAssuntoPrincipal(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label
									className="mb-2 text-sm font-medium"
									htmlFor="dateInicio"
								>
									Data de Início
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="Date"
										name="dateInicio"
										id="dateInicio"
										value={dataInicio}
										onChange={(e) => setDataInicio(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="dateFinal">
									Data de Finalização
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="Date"
										name="dateFinal"
										id="dateFinal"
										value={dataFinal}
										onChange={(e) => setDataFinal(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label
									className="mb-2 text-sm font-medium"
									htmlFor="horaInicio"
								>
									Horário de Início
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="time"
										name="horaInicio"
										id="horaInicio"
										value={horarioInicio}
										onChange={(e) => setHorarioInicio(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="horaFinal">
									Horário de Finalização
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="time"
										name="horaFinal"
										id="horaFinal"
										value={horarioFinal}
										onChange={(e) => setHorarioFinal(e.target.value)}
										required
									/>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="mb-5 flex flex-col">
								<label
									className="mb-2 text-sm font-medium"
									htmlFor="emailEvent"
								>
									Email do Evento
								</label>

								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="emailEvent"
										id="emailEvent"
										placeholder="Email do Evento"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="cep">
									CEP
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="cep"
										id="cep"
										placeholder="CEP do Evento"
										value={cep}
										onChange={(e) => setCep(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="local">
									Local
								</label>
								<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
									<input
										className="w-full rounded-md border-0 bg-white text-sm outline-none"
										type="text"
										name="local"
										id="local"
										placeholder="Local do Evento"
										value={local}
										onChange={(e) => setLocal(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="mb-0.5">
								<label className="mb-2 text-sm font-medium" htmlFor="evento">
									Evento
								</label>
								<div className="flex items-center gap-3 py-2.5">
									{checkboxEvento.map((name, index) => (
										<div key={index}>
											<div className="flex items-center">
												<input
													className="hidden"
													type="checkbox"
													name={`checkbox-${index}`}
													id={`checkbox-${index}`}
													checked={checkboxes[index]}
													onChange={() => handleCheckboxChangeEvento(index)}
												/>
												<label
													className="flex cursor-pointer items-center"
													style={
														checkboxes[index]
															? {
																	color: '#4B00E0',
															  }
															: {
																	color: '#000',
															  }
													}
													htmlFor={`checkbox-${index}`}
												>
													<div
														className="mr-2 flex h-3.5 w-3.5 items-center justify-center"
														style={
															checkboxes[index]
																? {
																		backgroundColor: '#4B00E0',
																		border: '1px solid #4B00E0',
																  }
																: {
																		backgroundColor: '#fff',
																		border: '1px solid #4B00E0',
																  }
														}
													>
														{checkboxes[index] && (
															<svg
																className="pointer-events-none h-2 w-3 fill-current text-white"
																viewBox="0 0 20 20"
															>
																<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
															</svg>
														)}
													</div>
													<span className="text-sm font-medium">{name}</span>
												</label>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="mb-5">
								<label className="mb-2 text-sm font-medium" htmlFor="gerar">
									Gerar
								</label>
								<div className="flex items-center gap-3 py-2.5">
									{checkboxGerar.map((name, index) => (
										<div key={index}>
											<div className="flex items-center">
												<input
													className="hidden"
													type="checkbox"
													name={`checkbox1-${index}`}
													id={`checkbox1-${index}`}
													checked={checkboxesGerar[index]}
													onChange={() => handleCheckboxChangeGerar(index)}
												/>
												<label
													className="flex cursor-pointer items-center"
													style={
														checkboxesGerar[index]
															? {
																	color: '#4B00E0',
															  }
															: {
																	color: '#000',
															  }
													}
													htmlFor={`checkbox1-${index}`}
												>
													<div
														className="mr-2 flex h-3.5 w-3.5 items-center justify-center"
														style={
															checkboxesGerar[index]
																? {
																		backgroundColor: '#4B00E0',
																		border: '1px solid #4B00E0',
																  }
																: {
																		backgroundColor: '#fff',
																		border: '1px solid #4B00E0',
																  }
														}
													>
														{checkboxesGerar[index] && (
															<svg
																className="pointer-events-none h-2 w-3 fill-current text-white"
																viewBox="0 0 20 20"
															>
																<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
															</svg>
														)}
													</div>
													<span className="text-sm font-medium">{name}</span>
												</label>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="mb-6 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="evento">
									Período
								</label>
								<div className="flex items-center gap-3 py-1">
									{checkboxPeriodo.map((name, index) => (
										<div key={index}>
											<div className="flex items-center">
												<input
													className="hidden"
													type="checkbox"
													name={`checkbox-${index}`}
													id={`checkbox-${index}`}
													checked={checkboxesPeriodos[index]}
													onChange={() => handleCheckboxChangePeriodo(index)}
												/>
												<label
													className="flex cursor-pointer items-center"
													style={
														checkboxesPeriodos[index]
															? {
																	color: '#4B00E0',
															  }
															: {
																	color: '#000',
															  }
													}
													htmlFor={`checkbox-${index}`}
												>
													<div
														className="mr-2 flex h-3.5 w-3.5 items-center justify-center"
														style={
															checkboxesPeriodos[index]
																? {
																		backgroundColor: '#4B00E0',
																		border: '1px solid #4B00E0',
																  }
																: {
																		backgroundColor: '#fff',
																		border: '1px solid #4B00E0',
																  }
														}
													>
														{checkboxesPeriodos[index] && (
															<svg
																className="pointer-events-none h-2 w-3 fill-current text-white"
																viewBox="0 0 20 20"
															>
																<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
															</svg>
														)}
													</div>
													<span className="text-sm font-medium">{name}</span>
												</label>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="mb-5 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="areas">
									Áreas de Conhecimento
								</label>
								<div>
									<div className="mb-3 flex items-center">
										<div className="w-full rounded-md border border-gray-300 bg-white px-4 py-2">
											<input
												className="w-full rounded-md border-0 bg-white text-sm outline-none"
												type="text"
												name="areas"
												value={areas[areas.length - 1]}
												onChange={(e) =>
													handleAreaChange(
														areas.length - 1,
														e.target.value,
														setAreas
													)
												}
												placeholder="Áreas de Conhecimento da Comissão"
												required
											/>
										</div>
										<div
											className="ml-3 cursor-pointer rounded-full px-2"
											onClick={() => handleAddArea(setAreas)}
											style={{ backgroundColor: '#4B00E0' }}
										>
											<p className="text-xl font-bold text-white">+</p>
										</div>
									</div>
									<div className="flex gap-2.5">
										{areas.map((area, index) => (
											<div
												key={index}
												className="flex items-center rounded-full border border-gray-300 bg-white px-2 py-0.5"
											>
												<div className="w-full">
													<input
														className="w-full rounded-md border-0 bg-white text-sm outline-none"
														type="text"
														name="areas"
														value={area}
														onChange={(e) =>
															handleAreaChange(index, e.target.value, setAreas)
														}
														readOnly
														required
													/>
												</div>
												<div
													className="ml-2 cursor-pointer rounded-full px-1"
													style={{ backgroundColor: '#ef0037' }}
													onClick={() => handleRemoveArea(index, setAreas)}
												>
													<FaTimes className="w-2 text-white" />
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="mb-6 flex flex-col">
								<label className="mb-2 text-sm font-medium" htmlFor="file">
									Anexar Logo
								</label>

								<div className="flex w-full items-center justify-center rounded-md border-0 bg-gray-200 px-4 py-5">
									<label htmlFor="fileInput" className="cursor-pointer">
										<FiUpload className="mx-2 h-5 w-5 text-black" />{' '}
									</label>
									<input
										type="file"
										className="w-max[60px]"
										id="fileInput"
										name="file"
										style={{ display: 'none' }}
										onChange={(e) => handleFileChange(e)}
										required
									/>
									<span className="text-sm">{file ? file.name : ''}</span>
									{file && (
										<button
											className="ml-2 mr-1 cursor-pointer rounded-full bg-red-500 px-1"
											onClick={handleFileDelete}
										>
											<FaTimes className="w-2 text-white" />
										</button>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-center gap-5">
						<button
							className="mb-6 w-1/5 rounded-xl border-none p-2 text-center text-base font-medium text-white"
							style={{ backgroundColor: '#EF0037' }}
							type="submit"
							// onClick={handleNextButtonClick}
						>
							EDITAR
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
