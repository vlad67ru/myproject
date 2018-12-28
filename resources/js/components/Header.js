import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Практика Лабовского Влада
                </Link>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link">
                            Список задач
                        </Link>
                        <Link to="/add" className="nav-item nav-link">
                            Добавить задачу
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}