import { useState } from 'react';
import './reset.css';

function App() {
  const [dados, setDados] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [novoNome, setNovoNome] = useState('');

  function PegarDados(event) {
    setDados(event.target.value);
  }

  function AdicionarTarefa() {
    if (dados.trim() !== '') {
      setTarefas([...tarefas, { nome: dados, concluida: false }]);
      setDados('');
    }
  }

  function MarcarComoConcluida(index) {
    const novasTarefas = [...tarefas];
    novasTarefas[index] = { ...novasTarefas[index], concluida: !novasTarefas[index].concluida };
    setTarefas(novasTarefas);
  }

  function ExcluirTarefasMarcadas() {
    const tarefasNaoMarcadas = tarefas.filter((tarefa) => !tarefa.concluida);
    setTarefas(tarefasNaoMarcadas);
  }

  function IniciarEdicao(index) {
    setTarefaEmEdicao(index);
    setNovoNome(tarefas[index].nome);
  }

  function SalvarEdicao(index) {
    const novasTarefas = [...tarefas];
    novasTarefas[index] = { ...novasTarefas[index], nome: novoNome };
    setTarefas(novasTarefas);
    setTarefaEmEdicao(null);
  }

  function CancelarEdicao() {
    setTarefaEmEdicao(null);
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
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => MarcarComoConcluida(index)}
              />
              {tarefaEmEdicao === index ? (
                <>
                  <input
                    type="text"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                  />
                  <button onClick={() => SalvarEdicao(index)}>Salvar</button>
                  <button onClick={CancelarEdicao}>Cancelar</button>
                </>
              ) : (
                <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
                  {tarefa.nome}
                  <button onClick={() => IniciarEdicao(index)}>Editar</button>
                </span>
              )}
            </li>
          ))}
        </ul>
        <button onClick={ExcluirTarefasMarcadas}>Excluir</button>
      </div>
    </>
  );
}

export default App;
