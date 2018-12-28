import React from 'react';
import axios from 'axios';

export default class Targets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            targets: [],
            timer: null,
            id: null,
            type: null
        };
    }

    componentWillMount() {
        axios.get('/api/target').then((response) => {
            response.data.map((target) => {
                this.setState({
                    targets: [
                        ...this.state.targets,
                        {
                            id: target.id,
                            description: target.description,
                            time: target.time,
                            startTime: new Date(target.created_at * 1000),
                            finishTime: this.getFinishTime(
                                target.created_at * 1000, target.time
                            ),
                            status: this.getStatus(
                                target.completed,
                                this.getFinishTime(
                                    target.created_at * 1000, target.time
                                )
                            )
                        }
                    ]
                });
            });
        });

        const timer = setInterval(() => {
            this.state.targets.map((target, i) => {
                if (new Date() > target.finishTime && target.status !== 'Завершенная задача') {
                    this.state.targets[i].status = 'Просроченная задача';
                }

                this.forceUpdate();
            });
        }, 1000);

        this.setState({
            timer: timer
        });
    }

    getStatus(completed, finishTime) {
        if (completed) {
            return 'Завершенная задача';
        }

        if (new Date() > finishTime) {
            return 'Просроченная задача';
        }

        return 'Актуальная задача';
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    getFinishTime(milliseconds, minutes) {
        let date = new Date(milliseconds);
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }

    getDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() % 100;
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        if (year < 10) {
            year = '0' + year;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return hours + ':' + minutes + ' ' + day + '.' + month + '.' + year;
    }

    edit(id) {
        this.props.history.push('/edit/' + id);
    }

    delete(id) {
        axios.delete('/api/target/' + id);

        this.state.targets.map((target, i) => {
            if (target.id === id) {
                delete this.state.targets[i];
            }
        });

        this.forceUpdate();
    }

    complete(id) {
        axios.post('/api/complete', {
            id: id
        });

        this.state.targets.map((target, i) => {
            if (target.id === id) {
                this.state.targets[i].status = 'Завершенная задача';
            }
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Описание задачи</th>
                            <th>Время начало задачи</th>
                            <th>Время окончания задачи</th>
                            <th>Кол-во минут на выполнение</th>
                            <th>Статус задачи</th>
                            <th colSpan="3"/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.targets.map((target) => {
                            return (
                                <tr>
                                    <td>{target.description}</td>
                                    <td>{this.getDate(target.startTime)}</td>
                                    <td>{this.getDate(target.finishTime)}</td>
                                    <td>{target.time}</td>
                                    <td>{target.status}</td>
                                    <td>{
                                        target.status === 'Актуальная задача' ?
                                        <button onClick={() => this.edit(target.id)} className="btn btn-dark">
                                            Изменить
                                        </button> :
                                        ''
                                    }</td>
                                    <td>
                                        <button onClick={() => this.setState({ id: target.id, type: 0 })} className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">
                                            Удалить
                                        </button>
                                    </td>
                                    <td>{
                                        target.status === 'Актуальная задача' ?
                                        <button onClick={() => this.setState({ id: target.id, type: 1 })} className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">
                                            Завершить
                                        </button> :
                                        ''
                                    }</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="exampleModalCenterTitle">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    Вы уверены?
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-dark" data-dismiss="modal">
                                    Нет
                                </button>
                                <button onClick={
                                    () => this.state.type ? this.complete(this.state.id) : this.delete(this.state.id)
                                } className="btn btn-dark" data-dismiss="modal">
                                    Да
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}