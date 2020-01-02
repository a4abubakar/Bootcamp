import React, { Component } from 'react';
import firebase from './Firebase'
import './style.css'

export default class List extends Component {
    state = {
        item: "",
        list: JSON.parse(localStorage.getItem("list")).length ? JSON.parse(localStorage.getItem("list")) : [],
        edit: "",
        editedItem: "",
        data: [],
        editIndex: null
    }
    componentDidMount() {
        firebase.database().ref("items/").on("value", snap => {
            if (snap.val() !== null) {
                let data = Object.values(snap.val())
                this.setState({ data })
            }
            else {
                this.setState({ data: [] })
            }
        })
    }
    addItem() {
        const { item, list } = this.state;
        if (item !== "" && item !== " " && item.length !== 0) {
            var key = firebase.database().ref("items").push().key
            const obj = { item, key }
            firebase.database().ref(`items/${key}`).set(obj)
            this.setState({ item: "" })
        }
    }
    editItem(index, value) {
        this.setState({ edit: value, editIndex: index })
        // console.log(this.state.edit, this.state.editIndex)
    }
    delteItem(index, value) {
        const { data } = this.state
        data.map((v, i) => {
            if (index === v.key) {
                firebase.database().ref(`items/${index}`).remove()
                this.setState({ editIndex: "", edit: "" })
            }
        })
    }
    done() {
        const { edit, editIndex, data } = this.state
        // console.log(edit, editIndex, data)
        if (edit !== "") {
            data.map((v, i) => {
                if (editIndex === v.key) {
                    // console.log(v.key, v.item)
                    const obj = { item: edit, key: v.key }
                    firebase.database().ref(`items/${editIndex}/`).set(obj)
                    this.setState({ edit: "", editIndex: "" })
                }
            })
        }
    }
    cancel() {
        this.setState({ edit: "", editIndex: "" })
    }
    deleteAll() {
        firebase.database().ref("items/").remove()
    }
    render() {
        // console.log(this.state.data.length)
        return (
            <div>
                <div className='header'>
                    <h1 style={{ margin: 5 }}>Todo List</h1>
                    {
                        this.state.edit.length ? <div><input type="text" onChange={(text) => { this.setState({ edit: text.target.value }) }} value={this.state.edit} /> &nbsp;<button className="addBtn" onClick={this.done.bind(this)}>Done</button> &nbsp;<button className="addBtn" onClick={this.cancel.bind(this)}>Cancel</button></div> :
                            <div><input type="text" placeholder="Enter a list item" onChange={(e) => { this.setState({ item: e.target.value }) }} value={this.state.item} /> &nbsp;
                            <button className="addBtn" onClick={this.addItem.bind(this)}>Add Item</button> &nbsp;<button className="addBtn" onClick={this.deleteAll.bind(this)}>Delete All</button></div>
                    }
                </div>
                {
                    <ul>
                        {
                            this.state.data.length ? this.state.data.map((v, i) => {
                                return <li key={i}>{v.item} &nbsp; <button className="edit" onClick={() => { this.editItem(v.key, v.item) }}>Edit</button> <button className="delete" onClick={() => { this.delteItem(v.key, v.item) }}>Delete</button> &nbsp; </li>
                            })
                                : this.state.data.map((v, i) => {
                                    return <li key={i}>{v} &nbsp; <button className="edit" onClick={() => { this.editItem(i, v) }}>Edit</button> <button className="delete" onClick={() => { this.delteItem(i, v) }}>Delete</button> &nbsp; </li>
                                })
                        }
                    </ul>
                }
            </div>
        )
    }
}