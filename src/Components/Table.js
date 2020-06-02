import React, { Component } from 'react'
import Card from './Card'
import Button from './Button'
import '../Styling/Table.css'
import imdb from '../Data/imdb.json'

class Table extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.data = imdb;
        this.state = {
            actors: new Set(imdb.slice(0, 5))
        };

        this.generateRandomActors = this.generateRandomActors.bind(this);
        this.sortActorsBy = this.sortActorsBy.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick(e) {
        let actorName = e.target.parentElement.parentElement.children[1].innerText;
        let temp = [...this.state.actors].filter((actor) => actor.name !== actorName);

        this.setState((x) => ({
            actors: new Set(temp),
        }));
    }

    generateRandomActors() {
        let actorsNewLength = this.state.actors.size + 5;
        let temp = [...this.state.actors]

        while (temp.length < actorsNewLength) {
            let randomActor = imdb[Math.floor(Math.random() * imdb.length)];
            temp.push(randomActor);
        }

        this.setState((x) => ({
            actors: new Set(temp),
        }));
    }

    sortActorsBy(property) {
        const compare = (a, b) => a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        let sortedSet = [...this.state.actors].sort(compare);
        this.setState((x) => ({
            actors: new Set(sortedSet),
        }));
    }

    generateCards() {
        return (
            [...this.state.actors].map((x, i) => {
                return <Card
                    key={x.name}
                    picture={x.pictureUrl}
                    name={x.name}
                    popularity={x.popularity}
                    action={<Button key={i} className='delete' onClick={this.onDeleteClick} text={'Delete'} />} />
            })
        )
    }

    render() {
        return (
            <div className='Table'>
                <h1>IMDB ACTORS</h1>
                <div>
                    <Button key='generate' className='topBar' onClick={this.generateRandomActors} text='Generate random actors' />
                    <Button key='sortName' className='topBar' onClick={() => this.sortActorsBy('name')} text='Sort by name' />
                    <Button key='sortPopularity' className='topBar' onClick={() => this.sortActorsBy('popularity')} text='Sort by popularity' />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Popularity</th>
                            <th>Action</th>
                        </tr>
                        {this.generateCards()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table