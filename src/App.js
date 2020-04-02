import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tarefa: '',
            lista: []
        };
    }
    componentDidMount() {
        window.addEventListener(
            'beforeunload',
            this.saveToLocal.bind(this)
        );
        this.updateFromLocal();
    }
    componentWillUnmount() {
        window.removeEventListener(
            'beforeunload',
            this.saveToLocal.bind(this)
        );
        this.saveToLocal();
    }
    updateFromLocal() {
        for (let k in this.state) {
            if (!localStorage.hasOwnProperty(k))
                continue;
            let val = localStorage.getItem(k);
            try {
                val = JSON.parse(val);
            } catch (e) {};
            this.setState({[k]: val});
        }
    }
    saveToLocal() {
        for (let k in this.state)
            localStorage.setItem(k, JSON.stringify(this.state[k]));
    }
    update(k, val) {
        this.setState({[k]: val});
    }
    add() {
        const tarefa = {
            id: 1 + Math.random(),
            val: this.state.tarefa.slice()
        };
        const lista = [...this.state.lista];
        lista.push(tarefa);
        this.setState({
            lista,
            tarefa: ''
        });
    }
    del(id) {
        const lista = [...this.state.lista];
        const novaLista = lista.filter(item => item.id !== id);
        this.setState({lista: novaLista});
    }
    render() {
        return (
<div id="to-do">
    <div>
        <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={this.state.tarefa}
            onChange={e => this.update("tarefa", e.target.value)}/>
        <button
            className="add"
            onClick={() => this.add()}
            disabled={!this.state.tarefa.length}>
            <span className="add">+</span>
        </button>
    </div>
    <ul>
        {this.state.lista.map(item => {
            return (
                <li key={item.id}>
                    <span>{item.val}</span>
                    <button onClick={() => this.del(item.id)}>
                        <span>&times;</span>
                    </button>
                </li>
            );
        })}
    </ul>
</div>
        );
    }
}
export default App;
