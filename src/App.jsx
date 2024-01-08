import { useState } from 'react';
import './reset.css';

function App() {
  const [dados, setDados] = useState('');
  const [tarefas, setTarefas] = useState([]);

  function PegarDados(event) {
    setDados(event.target.value);
  }

  function AdicionarTarefa() {
    setTarefas([...tarefas, { nome: dados, concluida: false }]);
    setDados('');
  }

  function Editar() {
    
  }

  function Excluir() {
    const excluirTarefas = tarefas.filter((tarefa) => !tarefa.concluida);
    setTarefas(excluirTarefas);
  }

  function CheckBox(check) {
    const novasTarefas = [...tarefas];
    novasTarefas[check].concluida = !novasTarefas[check].concluida;
    setTarefas(novasTarefas);
  }

  return (
    <>
      <h1>To Do List</h1>
      <input type="text" value={dados} onChange={PegarDados} />
      <button onClick={AdicionarTarefa}>Adicionar Tarefa</button>
      <div>
        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index}>
              <input type="checkbox" checked={tarefa.concluida} onChange={() => CheckBox(index)} />
              <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
                {tarefa.nome}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={Editar}>Editar</button>
        <button onClick={Excluir}>Excluir</button>
      </div>
    </>
  )
}

export default App
