import React from 'react';
import axios from 'axios';

export default class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            time: ''
        };

        this.input = this.input.bind(this);
        this.add = this.add.bind(this);
    }

    input(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    add(e) {
        if (e.target.checkValidity()) {
            e.preventDefault();

            axios.post('/api/target', {
                description: this.state.description,
                time: this.state.time
            });

            this.props.history.push('/');
        }
    }

    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            border: '1px solid #ced4da',
            padding: '20px'
        };

        return (
            <form style={style}>

                <div className="form-group">
                    <label htmlFor="id1">Описание задачи</label>
                    <input
                        id="id1"
                        className="form-control"
                        name="description"
                        value={this.state.description}
                        onChange={this.input}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id2">Кол-во минут на выполнение</label>
                    <input
                        id="id2"
                        className="form-control"
                        name="time"
                        value={this.state.time}
                        onChange={this.input}
                        required
                        type="number"
                    />
                </div>

                <button onClick={this.add} className="btn btn-dark">Добавить</button>

            </form>
        );
    }
}