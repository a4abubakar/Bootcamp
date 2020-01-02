import React, { Component } from 'react';
import './style.css'

export default class List extends Component {
    state = {
        item: "",
        list: JSON.parse(localStorage.getItem("list")).length ? JSON.parse(localStorage.getItem("list")) : [],
        edit: "",
        editedItem: "",
        editIndex: null
    }
    addItem() {
        const { item, list } = this.state;
        if (item !== "" && item !== " " && item.length !== 0) {
            list.push(item)
            this.setState({ list, item: "" })
            localStorage.setItem("list", JSON.stringify(this.state.list))
        }
    }
    editItem(index, value) {
        this.setState({ edit: value, editIndex: index })
    }
    delteItem(index, value) {
        const { list } = this.state
        list.map((v, i) => {
            if (index === i) {
                this.setState(list.splice(index, 1))
                this.setState({ editIndex: "", edit: "" })
                localStorage.setItem("list", JSON.stringify(this.state.list))
            }
        })
    }
    done() {
        const { edit, editIndex, list } = this.state
        // console.log(edit, editIndex, list)
        if (edit !== "") {
            list.map((v, i) => {
                // console.log(i)
                if (editIndex === i) {
                    this.setState(list.splice(editIndex, 1, edit))
                    this.setState({ edit: "", editIndex: "" })
                    localStorage.setItem("list", JSON.stringify(this.state.list))
                }
            })
        }
    }
    cancel() {
        this.setState({ edit: "", editIndex: "" })
    }
    deleteAll() {
        this.setState({ list: [] })
        localStorage.setItem("list", JSON.stringify([]))
    }
    render() {
        // console.log("list", this.state.list)
        return (
            <div>
                <div className='header'>
                    <p>Todo List</p>
                    {
                        this.state.edit.length ? <div><input type="text" onChange={(text) => { this.setState({ edit: text.target.value }) }} value={this.state.edit} /> &nbsp;<button className="addBtn" onClick={this.done.bind(this)}>Done</button>&nbsp;<button className="addBtn" onClick={this.cancel.bind(this)}>Cancel</button></div> :
                            <div><input type="text" placeholder="Enter a list item" onChange={(e) => { this.setState({ item: e.target.value }) }} value={this.state.item} /> &nbsp;
                            <button className="addBtn" onClick={this.addItem.bind(this)}>Add Item</button> &nbsp;<button className="addBtn" onClick={this.deleteAll.bind(this)}>Delete All</button></div>
                    }
                </div>
                {
                    <ol>
                        {
                            JSON.parse(localStorage.getItem("list")).length ? JSON.parse(localStorage.getItem("list")).map((v, i) => {
                                return <li key={i}>{v} &nbsp; <button className="edit" onClick={() => { this.editItem(i, v) }}>Edit</button> <button className="delete" onClick={() => { this.delteItem(i, v) }}>Delete</button> &nbsp; </li>
                            })
                                : this.state.list.map((v, i) => {
                                    return <li key={i}>{v} &nbsp; <button className="edit" onClick={() => { this.editItem(i, v) }}>Edit</button> <button className="delete" onClick={() => { this.delteItem(i, v) }}>Delete</button> &nbsp; </li>
                                })
                        }
                    </ol>
                }
            </div>
        )
    }
}